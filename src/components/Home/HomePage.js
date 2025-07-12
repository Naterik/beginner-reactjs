import videoHomePage from '../../assets/video-homepage.mp4';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation, Trans } from 'react-i18next';
const HomePage = props => {
  const { t, i18n } = useTranslation();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const navigate = useNavigate();
  return (
    <>
      <div className="homepage-container">
        <video autoPlay muted loop>
          <source src={videoHomePage} type="video/mp4" />
        </video>
        <div className="homepage-content">
          <div className="title-1">{t('homepage.title1')}</div>

          <div className="title-2">{t('homepage.title2')}</div>

          {!isAuthenticated ? (
            <button className=" btn-homepage" onClick={() => navigate('/login')}>
              {t('homepage.button_start')}
            </button>
          ) : (
            <button className=" btn-homepage" onClick={() => navigate('/user')}>
              {t('homepage.button_do')}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
