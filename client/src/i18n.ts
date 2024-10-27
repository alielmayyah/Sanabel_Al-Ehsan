import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './languages/ar';
import en from './languages/en';

// Get the saved language and dir from localStorage or use 'ar' and 'rtl' as defaults
const savedLanguage = localStorage.getItem('language') || 'ar';
const savedDir = localStorage.getItem('dir') || 'ltr';

// Set the dir attribute when initializing the app
document.documentElement.setAttribute('dir', savedDir);

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    ar: ar,  // Load Arabic translations
    en: en,  // Load English translations
  },
  lng: savedLanguage,  // Default to saved language or Arabic
  fallbackLng: 'ar',  // Fallback language if translation is not found
  interpolation: {
    escapeValue: false,  // React already escapes values
  },
});

export default i18n;
