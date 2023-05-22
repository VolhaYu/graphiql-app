/* eslint-disable no-param-reassign */
import React from 'react';
import { ReactComponent as ArrowUp } from '../../../assets/arrowUp.svg';
import { ReactComponent as ArrowDown } from '../../../assets/arrowDown.svg';
import { ITabs } from '../../../types';

interface IHeader {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  tabs: ITabs[];
  setTabs: React.Dispatch<React.SetStateAction<ITabs[]>>;
}

function Header({ active, setActive, tabs, setTabs }: IHeader) {
  return (
    <div className="graphiql_editor__header">
      <div className="graphiql_editor__tools__tabs">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.selected ? 'selected' : ''}
            onClick={(e) => {
              for (let i = 0; i < tabs.length; i += 1) {
                tabs[i].selected = tabs[i].name === e.currentTarget.textContent;
              }
              setTabs([...tabs]);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
      <button type="button" onClick={() => (active ? setActive('') : setActive('_active'))}>
        {active ? <ArrowDown /> : <ArrowUp />}
      </button>
    </div>
  );
}

export default Header;
