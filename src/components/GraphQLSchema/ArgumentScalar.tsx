import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks/redux';
import { SchemaTypes } from '../../store/reducers/schemaValueSlice';
import Loader from '../loader/Loader';

function ArgumentScalar() {
  const { argScalar: argScalarParams } = useParams();

  const navigate = useNavigate();

  const schemaValue = useAppSelector((state) => state.schemaValueSlice.value);
  if (!schemaValue.length) {
    return <Loader />;
  }

  const schemaField = schemaValue.find(
    (schemaItem: SchemaTypes) => schemaItem.name === argScalarParams
  );

  if (!schemaField) {
    return <Loader />;
  }

  return (
    <>
      <div className="graphiql_schema__header" key={schemaField.name}>
        <button
          type="button"
          className="graphiql_schema__breadCrumbs-btn"
          onClick={() => navigate(-1)}
        >
          {'< Go Back'}
        </button>
        <h3 className="graphiql_schema__header_h3">{schemaField.name}</h3>
      </div>
      <div className="graphiql_schema__content">
        <p className="graphiql_schema__argument-type-description">{schemaField.description}</p>
      </div>
    </>
  );
}

export default ArgumentScalar;
