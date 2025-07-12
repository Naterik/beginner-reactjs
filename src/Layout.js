import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/DashBoard';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import App from './App';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Auth/Register';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Quiz/ManageQuiz';
import ManageQuestions from './components/Admin/Question/ManageQuestions';
import PrivateRoute from './routes/PrivateRoute';
import { Suspense } from 'react';
const Layout = () => {
  const NotFound = () => {
    return <div className="container mt-4 alert alert-danger fs-1">Not found the page</div>;
  };
  return (
    <Suspense fallback="...is loading">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <ListQuiz />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />
        <Route
          path="admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="manage-user" element={<ManageUser />} />
          <Route path="manage-quiz" element={<ManageQuiz />} />
          <Route path="manage-question" element={<ManageQuestions />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Suspense>
  );
};

export default Layout;
