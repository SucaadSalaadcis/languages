import React, { useEffect } from "react";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import LanguageDetector from 'i18next-browser-languagedetector';

import HttpApi from 'i18next-http-backend';

import cookies from "js-cookie";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "en",
    detection: {
      // order and from where user language should be detected
      order: ['cookie', 'htmlTag', 'localStorage', 'sessionStorage', 'navigator', 'path', 'subdomain'],
      caches: ['cookie'], // save the language in the browser
    },
    backend: {
      loadPath: '/locale/{{lng}}/translation.json',
    }
  });

function App() {
  const { t } = useTranslation();

  const lng = cookies.get('i18next') || 'en';


  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng])

  return (
    <>
      <h2>{t('Welcome to React')}</h2>
      <button style={{ background: "red", color: "white", width: "80px", fontSize: '20px', height: '40px', border: 'none', marginRight: '20px' }}
        onClick={() => {
          i18n.changeLanguage("ar");
        }}
      >ar</button>
      <button style={{ background: "green", color: "white", width: "80px", fontSize: '20px', height: '40px', border: 'none' }}
        onClick={() => {
          i18n.changeLanguage("en");
        }}
      >en</button>
    </>
  )
}
export default App