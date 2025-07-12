import axios from 'axios';
import nProgress from 'nprogress';
import axiosRetry from 'axios-retry';
import { store } from '../redux/store';

nProgress.configure({
  showSpinner: false,
  trickleSpeed: 50,
});

const instance = axios.create({
  baseURL: 'http://localhost:8081/',
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    nProgress.start();
    const access_token = store?.getState()?.user?.account?.access_token;
    config.headers['Authorization'] = 'Bearer ' + access_token;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    nProgress.done();

    axiosRetry(axios, {
      retries: 3, // number of retries
      retryDelay: retryCount => {
        console.log(`retry attempt: ${retryCount}`);
        return retryCount * 2000; // time interval between retries
      },
      retryCondition: error => {
        // if retry condition is not specified, by default idempotent requests are retried
        return error.response.status === 503;
      },
    });

    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response.data ? error.response.data : Promise.reject(error);
  }
);

export default instance;
