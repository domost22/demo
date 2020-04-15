import React from 'react';

export const languages = {
    en: 'en',
    hr: 'hr',
};

export const LanguageContext = React.createContext({
    language: languages.en,
    toggleLanguage: () => {},
});