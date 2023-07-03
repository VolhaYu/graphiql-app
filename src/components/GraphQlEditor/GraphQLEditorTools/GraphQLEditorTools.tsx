import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import VariablesEditor from './VariablesEditor';
import HeadersEditor from './HeadersEditor';
import { ITabs } from '../../../types';
import '../../../i18n';

const tabs: ITabs[] = [
  {
    id: 1,
    name: 'description.Variables',
    selected: true,
    field: <VariablesEditor />,
  },
  {
    id: 2,
    name: 'description.Headers',
    selected: false,
    field: <HeadersEditor />,
  },
];

function GraphQLEditorTools() {
  const [active, setActive] = useState('');
  const [tabsCopy, setTabsCopy] = useState<ITabs[]>(tabs);
  const { t } = useTranslation();

  useEffect(() => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      name: t(tab.name),
    }));
    setTabsCopy(updatedTabs);
  }, [t]);
  return (
    <div className="graphiql_editor__tools">
      <Header active={active} setActive={setActive} tabs={tabsCopy} setTabs={setTabsCopy} />
      <div className={`graphiql_editor__tools__field${active}`}>
        {tabsCopy.find((item) => item.selected)?.field}
      </div>
    </div>
  );
}

export default GraphQLEditorTools;
