import SideBar from './Sidebar';
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../services/apiService';
import { userLogout } from '../../redux/action/userAction';
import { toast } from 'react-toastify';
import Language from '../Header/Language';
import { useTranslation } from 'react-i18next';

const Admin = props => {
  const { t } = useTranslation();
  const user = useSelector(state => state.user.account);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <FaBars
            size={25}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
          <div className="header-right ">
            <Language />
            <NavDropdown title={user.email}>
              <NavDropdown.Item>{t('header.setting')}</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleLogout()}>
                {t('header.logout')}
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>

        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};
export default Admin;
