import ConfigCard from '@modules/layout/ConfigCard';
import SearchConfigCard from '@modules/search/SearchConfigCard';

const SettingPanel = () => {
  return (
    <>
      <ConfigCard title="🔍 Search">
        <SearchConfigCard />
      </ConfigCard>
    </>
  );
};

export default SettingPanel;
