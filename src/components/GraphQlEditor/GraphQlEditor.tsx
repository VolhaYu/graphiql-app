import React from 'react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { setQueryValue } from '../../store/reducers/queryValueSlice';
import { setResponseValue } from '../../store/reducers/responseValueSlice';
import { makeRequest } from '../../utils/request';
import { ReactComponent as SendButton } from '../../assets/sendIcon.svg';

function GraphQLEditor() {
  const options: monaco.editor.IStandaloneEditorConstructionOptions = {
    minimap: {
      enabled: false,
    },
    overviewRulerBorder: false,
    overviewRulerLanes: 0,
  };

  const queryValue = useAppSelector((state) => state.queryValueSlice.value);
  const dispatch = useAppDispatch();

  const handleEditorChange = (value: string | undefined) => {
    dispatch(setQueryValue(value));
  };
  return (
    <div className="graphiql_editor">
      <div className="graphiql_editor__header">
        <p>Operation:</p>
        <button onClick={async () => dispatch(setResponseValue(await makeRequest(queryValue)))}>
          <SendButton />
        </button>
      </div>
      <div className="graphiql_editor__field">
        <Editor
          options={options}
          theme="myTheme"
          height="100%"
          defaultLanguage="graphql"
          onChange={handleEditorChange}
          value={queryValue}
          defaultValue="query allCharacters {
    characters {
      results {
        id
        name
      }
    }
  }"
        />
      </div>
    </div>
  );
}

export default GraphQLEditor;
