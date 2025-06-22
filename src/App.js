import './App.scss';
import Header from './components/Header/Header';
import { Link } from "react-router-dom";
const App = () => {
  return (
    <div className="app-container">
      <Header />
      <button><Link to="/user">Go go User</Link></button>
      <button><Link to="/admin">Go go Admin</Link></button>
    </div>
  );
}

export default App;
