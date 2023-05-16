import React, { useEffect } from 'react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { setQueryValue, setQueryBodyValue } from '../../store/reducers/queryValueSlice';
import { setResponseValue } from '../../store/reducers/responseValueSlice';
import { makeRequest } from '../../utils/request';
import { ReactComponent as SendButton } from '../../assets/sendIcon.svg';
import GraphQLEditorTools from './GraphQLEditorTools/GraphQLEditorTools';

function GraphQLEditor() {
  const options: monaco.editor.IStandaloneEditorConstructionOptions = {
    minimap: {
      enabled: false,
    },
    overviewRulerBorder: false,
    overviewRulerLanes: 0,
  };
  const parsedValue = useAppSelector((state) => state.variablesValueSlice.parsedValue);
  const queryValue = useAppSelector((state) => state.queryValueSlice.value);
  const queryBodyValue = useAppSelector((state) => state.queryValueSlice.queryBody);
  const dispatch = useAppDispatch();

  const bracketItem = (str: string | undefined) => {
    let argumentsArray: string[] = [];
    if (str) {
      const startIndex = str.indexOf('(') + 1;
      const endIndex = str.indexOf(')');
      const extractedSubstring = str.substring(startIndex, endIndex);
      const regex = /\$(.*?):/g;
      const matches = extractedSubstring.match(regex);
      if (matches) {
        argumentsArray = matches.map((item) => item.substring(1, item.length - 1));
      }
    }
    return argumentsArray;
  };

  const figureBracketItem = (str: string | undefined) => {
    let queryBody = '';
    if (str) {
      const startIndex = str.indexOf('{');
      const endIndex = str.lastIndexOf('}') + 1;
      queryBody = str.substring(startIndex, endIndex);
    }
    return queryBody;
  };

  const changeVariables = (str: string | undefined) => {
    if (str) {
      const argumentsArray = bracketItem(str);
      let queryBody = figureBracketItem(str);

      if (argumentsArray.length && queryBody) {
        for (let i = 0; i < argumentsArray.length; i += 1) {
          if (parsedValue[argumentsArray[i]]) {
            const regexPattern = new RegExp(`\\$${argumentsArray[i]}`, 'g');
            queryBody = queryBody.replace(regexPattern, String(parsedValue[argumentsArray[i]]));
          }
        }
      }
      dispatch(setQueryBodyValue(queryBody));
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    dispatch(setQueryValue(value));
  };

  useEffect(() => {
    changeVariables(queryValue);
  }, [queryValue, parsedValue]);

  return (
    <div className="graphiql_editor">
      <div className="graphiql_editor__header">
        <p>Operation:</p>
        <button
          type="button"
          onClick={async () =>
            dispatch(setResponseValue(await makeRequest(queryBodyValue || queryValue)))
          }
        >
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
      <GraphQLEditorTools />
    </div>
  );
}

export default GraphQLEditor;
