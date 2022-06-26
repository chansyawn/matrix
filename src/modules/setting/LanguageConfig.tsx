import { Select } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { SupportedLngs } from '@/i18n';

const lngs: {
  [key in keyof typeof SupportedLngs]: string;
} = {
  en: 'English',
  zh: '中文',
};

const LanguageConfig = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    i18n.changeLanguage(value);
  };

  return (
    <>
      <Select
        onChange={handleChange}
        value={i18n.resolvedLanguage}
        placeholder={i18n.resolvedLanguage ? undefined : 'auto'}
      >
        {Object.entries(lngs).map(([lng, nativeLng]) => (
          <option
            key={lng}
            value={SupportedLngs[lng as keyof typeof SupportedLngs]}
          >
            {nativeLng}
          </option>
        ))}
      </Select>
    </>
  );
};

export default LanguageConfig;
