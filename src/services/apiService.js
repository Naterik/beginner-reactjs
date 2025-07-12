import axios from '.././utils/axiosCustomize';
const postCreateUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append('email', email);
  data.append('password', password);
  data.append('username', username);
  data.append('role', role);
  data.append('userImage', image);

  let res = axios.post(`api/v1/participant`, data);
  return res;
};

const getAllUser = () => {
  return axios.get('api/v1/participant/all');
};

const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append('id', id);
  data.append('username', username);
  data.append('role', role);
  data.append('userImage', image);
  return axios.put('api/v1/participant', data);
};

const deleteUser = id => {
  return axios.delete('api/v1/participant', { data: { id: id } });
};
const paginateUser = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

//auth
const loginUser = (email, password) => {
  return axios.post('api/v1/login', { email, password, delay: 2000 });
};
const registerUser = (username, email, password) => {
  return axios.post('api/v1/register', { username, email, password });
};

const logoutUser = (email, refresh_token) => {
  return axios.post('api/v1/logout', { email, refresh_token });
};

//quiz
const getQuizByUser = () => {
  return axios.get('api/v1/quiz-by-participant');
};
const getQuizDetail = id => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const submitAnswer = data => {
  return axios.post('api/v1/quiz-submit', { ...data });
};

//manage-quiz
const postCreateQuiz = (name, description, difficulty, image) => {
  const data = new FormData();
  data.append('name', name);
  data.append('description', description);
  data.append('difficulty', difficulty);
  data.append('quizImage', image);

  let res = axios.post(`api/v1/quiz`, data);
  return res;
};

const getAllQuiz = data => {
  return axios.get('api/v1/quiz/all', { ...data });
};

const putQuiz = (id, name, description, difficulty, image) => {
  const data = new FormData();
  data.append('id', id);
  data.append('name', name);
  data.append('description', description);
  data.append('difficulty', difficulty);
  data.append('quizImage', image);
  return axios.put('api/v1/quiz', data);
};

const deleteQuiz = id => {
  return axios.delete(`api/v1/quiz/${id}`);
};

const postAssignQuizToUser = (quizId, userId) => {
  return axios.post('api/v1/quiz-assign-to-user', {
    quizId,
    userId,
  });
};

const getQuizWithQuestionAnswer = id => {
  return axios.get(`api/v1/quiz-with-qa/${id}`);
};

const postUpsertQuizWithQA = data => {
  return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
};

//question
const postCreateQuestion = (id, description, image) => {
  const data = new FormData();
  data.append('quiz_id', id);
  data.append('description', description);
  data.append('questionImage', image);
  return axios.post('api/v1/question', data);
};

//answer
const postCreateAnswer = (question_id, description, correct_answer) => {
  return axios.post('api/v1/answer', { question_id, description, correct_answer });
};

const getDashboardOverview = () => {
  return axios.get('api/v1/overview');
};

//header
const postUpdateProfile = (username, userImage) => {
  const data = new FormData();
  data.append('username', username);
  data.append('userImage', userImage);
  return axios.post('api/v1/profile', data);
};

const postChangePassword = (current_password, new_password) => {
  return axios.post('api/v1/change-password', { current_password, new_password });
};

const getHistory = () => {
  return axios.get('api/v1/history');
};
export {
  postCreateUser,
  getAllUser,
  putUpdateUser,
  deleteUser,
  paginateUser,
  loginUser,
  logoutUser,
  registerUser,
  getQuizByUser,
  getQuizDetail,
  submitAnswer,
  postCreateQuiz,
  getAllQuiz,
  putQuiz,
  deleteQuiz,
  postCreateQuestion,
  postCreateAnswer,
  postAssignQuizToUser,
  getQuizWithQuestionAnswer,
  postUpsertQuizWithQA,
  getDashboardOverview,
  postUpdateProfile,
  postChangePassword,
  getHistory,
};
