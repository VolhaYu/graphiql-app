/* eslint-disable no-nested-ternary */
import React, { Suspense, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';

function SchemaBtn() {
  const [isClickSchema, setClickSchema] = useState(false);

  const navigate = useNavigate();
  const locationGraphiql = useLocation().pathname.endsWith('graphiql/');

  function handleClickSchemaBtn() {
    setClickSchema(true);
    return locationGraphiql ? navigate('docs') : navigate('/graphiql/');
  }

  return (
    <>
      <button
        type="button"
        className="graphiql_schema__schema-btn"
        onClick={() => handleClickSchemaBtn()}
      >
        SCHEMA
      </button>
      {isClickSchema && (
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        />
      )}
    </>
  );
}
export default SchemaBtn;
