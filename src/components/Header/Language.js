import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';
const Language = () => {
  const { t, i18n } = useTranslation();
  const handleChangeLanguage = language => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <NavDropdown className="languages" title={i18n.language === 'vi' ? 'Việt nam' : 'English'}>
        <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Việt nam</NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>English</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
