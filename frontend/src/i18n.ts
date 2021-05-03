import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import formatDate from "shared/functions/formatDate";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (value) {
          if (format === "datetime") {
            return formatDate(new Date(value), "Pp", lng);
          }
          if (format === "date") {
            return formatDate(new Date(value), "P", lng);
          }
          if (format === "time") {
            return formatDate(new Date(value), "p", lng);
          }
        }
        return value;
      },
    },
  });

export default i18n;
