import { Select, useColorMode } from '@chakra-ui/react';
import { useState } from 'react';

const ColorModeConfig = () => {
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
      <option value="system">💻 system </option>
      <option value="light">☀️ light</option>
      <option value="dark">🌑 dark</option>
    </Select>
  );
};

export default ColorModeConfig;
