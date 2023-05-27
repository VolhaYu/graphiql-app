/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks/redux';
import { exclamationPoint, leftSquareBracket, rightSquareBracket } from '../../constants';
import { ReactComponent as TypeIcon } from '../../assets/typeIcon.svg';
import Loader from '../loader/Loader';

function ArgumentNameDescription() {
  const { argNameDescrScalar: argNameDescrScalarParams } = useParams();
  const { typeName: typeNameDetailedParams } = useParams();

  const navigate = useNavigate();

  const schemaValue = useAppSelector((state) => state.schemaValueSlice.value);
  if (!schemaValue.length) {
    return <Loader />;
  }

  const field = schemaValue.find((fieldItem) => fieldItem.name === typeNameDetailedParams);
  if (!field) {
    return <Loader />;
  }

  const fieldsArgsNames = field.fields;
  if (!fieldsArgsNames.length) {
    return <Loader />;
  }
  const fieldsArgName = fieldsArgsNames.find(
    (fieldsArgItem) => fieldsArgItem.name === argNameDescrScalarParams
  );
  if (!fieldsArgName) {
    return <Loader />;
  }

  const { name, description, type } = fieldsArgName;

  const typeName =
    type.kind === 'NON_NULL'
      ? leftSquareBracket + type.ofType.ofType.name + rightSquareBracket + exclamationPoint
      : type.kind === 'LIST'
      ? leftSquareBracket + type.ofType.name + rightSquareBracket
      : type.name;

  return (
    <>
      <div className="graphiql_schema__header">
        <button
          type="button"
          className="graphiql_schema__breadCrumbs-btn"
          onClick={() => navigate(-1)}
        >
          {'< Go Back'}
        </button>
        <h3 className="graphiql_schema__header_h3">{argNameDescrScalarParams}</h3>
      </div>

      <div className="graphiql_schema__content">
        <div className="graphiql_schema__fields-item" key={name}>
          <p className="graphiql_schema__fields-item_field-description" key={name}>
            {description}
          </p>
          <div className="graphiql_schema__fields-item__type-name-title__field-description">
            <TypeIcon />
            Type
          </div>
          <button
            type="button"
            className="graphiql_schema__fields-item__type-name-btn"
            onClick={() =>
              navigate(
                `${
                  type.kind === 'OBJECT'
                    ? `type-descr/${typeName}`
                    : type.kind === 'NON_NULL'
                    ? `type-descr/${type.ofType.ofType.name}`
                    : type.kind === 'LIST'
                    ? `type-descr/${type.ofType.name}`
                    : `${typeName}`
                }`
              )
            }
          >
            {typeName}
          </button>
        </div>
      </div>
    </>
  );
}

export default ArgumentNameDescription;
