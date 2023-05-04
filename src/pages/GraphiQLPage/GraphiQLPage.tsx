import React, { useEffect } from 'react';
import './GraphiQLPage.css';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

const url = 'https://rickandmortyapi.com/graphql';

const GraphiQlPage = () => {
  const makeRequest = async (query: string) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ query }),
    }).then((res) => res.json());
  };

  useEffect(() => {
    makeRequest(`{
      characters {
        results {
          id
          name
        }
      }
    }`).then(console.log);
  }, []);

  const options: monaco.editor.IStandaloneEditorConstructionOptions = {
    scrollbar: {
      vertical: 'hidden',
    },
    minimap: {
      enabled: false,
    },
    overviewRulerBorder: false,
    overviewRulerLanes: 0,
  };

  return (
    <>
      <h1>GraphiQl Page</h1>
      <div className="graphiql">
        <div className="graphiql_editor">
          <div className="graphiql_editor__header">
            <p>Operation:</p>
            <button>send</button>
          </div>
          <div className="graphiql_editor__field">
            <Editor
              options={options}
              height="100%"
              defaultLanguage="graphql"
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
        <div className="graphiql_response">
          <div className="graphiql_response__header">
            <p>Response:</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GraphiQlPage;
