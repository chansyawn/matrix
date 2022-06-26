import { Select, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ColorModeConfig = () => {
  const { t } = useTranslation();
  const [isSystem, setIsSystem] = useState(
    localStorage.getItem('chakra-ui-color-mode') === undefined,
  );

  const { colorMode, setColorMode } = useColorMode();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'system') {
      localStorage.removeItem('chakra-ui-color-mode');
      setIsSystem(true);
    } else {
      setColorMode(value);
      setIsSystem(false);
    }
  };

  return (
    <Select value={isSystem ? 'system' : colorMode} onChange={handleChange}>
      <option value="system">💻 {t`color.system`} </option>
      <option value="light">☀️ {t`color.light`}</option>
      <option value="dark">🌑 {t`color.dark`}</option>
    </Select>
  );
};

export default ColorModeConfig;
