import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks/redux';
import { SchemaFields } from '../../store/reducers/schemaValueSlice';
import Field from './Field';
import { ReactComponent as FieldsIcon } from '../../assets/fieldsIcon.svg';

function Query() {
  const schemaValue = useAppSelector((state) => state.schemaValueSlice.value);
  const fields = schemaValue[0].fields.map((field) => field);
  const navigate = useNavigate();

  return (
    <>
      <div className="graphiql_schema__header">
        <button
          type="button"
          className="graphiql_schema__breadCrumbs-btn"
          onClick={() => navigate(-1)}
        >
          {'< Docs'}
        </button>
        <h3 className="graphiql_schema__header_h3">Query</h3>
      </div>
      <div className="graphiql_schema__content">
        <h4 className="graphiql_schema__header_h4">
          <FieldsIcon />
          Fields
        </h4>

        {fields.map((field: SchemaFields) => (
          <Field field={field} key={field.name} />
        ))}
      </div>
    </>
  );
}

export default Query;
