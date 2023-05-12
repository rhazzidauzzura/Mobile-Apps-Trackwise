import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import id from './language/id.json'
import en from './language/en.json'
i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: en
    },
    id: {
      translation: id
    },
  },
});

export default i18n;