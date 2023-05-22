import React from 'react';
import { Editor } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { setVariablesValue } from '../../../store/reducers/variablesValueSlice';

function VariablesEditor() {
  const variablesValue = useAppSelector((state) => state.variablesValueSlice.value);
  const dispatch = useAppDispatch();
  const handleEditorChange = (value: string | undefined) => {
    dispatch(setVariablesValue(value));
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
      value={variablesValue}
    />
  );
}

export default VariablesEditor;
