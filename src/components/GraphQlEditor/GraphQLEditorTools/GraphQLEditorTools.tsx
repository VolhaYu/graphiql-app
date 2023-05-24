import React, { useState } from 'react';
import i18next from 'i18next';
import Header from './Header';
import VariablesEditor from './VariablesEditor';
import HeadersEditor from './HeadersEditor';
import { ITabs } from '../../../types';
import '../../../i18n';

const tabs: ITabs[] = [
  {
    id: 1,
    name: i18next.t('description.Variables'),
    selected: true,
    field: <VariablesEditor />,
  },
  {
    id: 2,
    name: i18next.t('description.Headers'),
    selected: false,
    field: <HeadersEditor />,
  },
];
function GraphQLEditorTools() {
  const [active, setActive] = useState('');
  const [tabsCopy, setTabsCopy] = useState<ITabs[]>(tabs);
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
