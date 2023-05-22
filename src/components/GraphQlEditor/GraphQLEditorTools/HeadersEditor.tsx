import React from 'react';
import { Editor } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { setHeadersValue } from '../../../store/reducers/headersValueSlice';

function HeadersEditor() {
  const headersValue = useAppSelector((state) => state.headersValueSlice.value);
  const dispatch = useAppDispatch();
  const handleEditorChange = (value: string | undefined) => {
    dispatch(setHeadersValue(value));
  };
  const options: monaco.editor.IStandaloneEditorConstructionOptions = {
    minimap: {
      enabled: false,
    },
    overviewRulerBorder: false,
    overviewRulerLanes: 0,
  };
  return (
    <Editor
      options={options}
      theme="myTheme"
      height="100%"
      defaultLanguage="graphql"
      onChange={handleEditorChange}
      value={headersValue}
    />
  );
}

export default HeadersEditor;
