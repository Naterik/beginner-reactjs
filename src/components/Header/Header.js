import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';
import { logoutUser } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation } from 'react-i18next';
const Header = () => {
  const user = useSelector(state => state.user.account);
  const { t } = useTranslation();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };
  const handleSignUp = () => {
    navigate('/register');
  };

  const handleLogout = async () => {
    const res = await logoutUser(user.email, user.refresh_token);
    if (res && res.EC === 0) {
      dispatch(userLogout());
      navigate('/login');
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink to="/" className="navbar-brand">
            {t('header.title')}
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                {t('header.home')}
              </NavLink>
              <NavLink to="/users" className="nav-link">
                {t('header.user')}
              </NavLink>
              <NavLink to="/admin" className="nav-link">
                {t('header.admin')}
              </NavLink>
            </Nav>
            <Nav>
              {!isAuthenticated ? (
                <div className="header-button">
                  <Language />
                  <button
                    className="btn btn-login"
                    onClick={() => {
                      handleLogin();
                    }}
                  >
                    {t('header.button_login')}
                  </button>
                  <button className="btn btn-signup" onClick={handleSignUp}>
                    {t('header.button_signup')}
                  </button>
                </div>
              ) : (
                <>
                  <NavDropdown title={user.email}>
                    <NavDropdown.Item>{t('header.setting')}</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleLogout()}>
                      {t('header.logout')}
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Language />
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
