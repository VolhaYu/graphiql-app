/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks/redux';
import { colon, exclamationPoint, leftSquareBracket, rightSquareBracket } from '../../constants';
import { ReactComponent as TypeIcon } from '../../assets/typeIcon.svg';
import { ReactComponent as ArgumentIcon } from '../../assets/argumentIcon.svg';
import Loader from '../loader/Loader';
import { SchemaFields } from '../../store/reducers/schemaValueSlice';

function FieldDescription() {
  const { name: fieldNameParams } = useParams();

  const navigate = useNavigate();

  const schemaValue = useAppSelector((state) => state.schemaValueSlice.value);
  if (!schemaValue.length) {
    return <Loader />;
  }
  const { fields } = schemaValue[0];
  const field = fields.find((fieldItem: SchemaFields) => fieldItem.name === fieldNameParams);
  if (!field) {
    return <Loader />;
  }

  const { name, description, args, type } = field;

  const argumentTypeName = args.map((argsNames) =>
    argsNames.type.name
      ? argsNames.type.name
      : argsNames.name === 'ids'
      ? leftSquareBracket +
        argsNames.type.ofType.ofType.ofType.name +
        rightSquareBracket +
        exclamationPoint
      : argsNames.name === 'id'
      ? argsNames.type.ofType.name + exclamationPoint
      : argsNames.type.ofType.name
      ? argsNames.type.ofType.name
      : argsNames.type.ofType.ofType.ofType.name
  );

  const typeName =
    type.kind === 'LIST' ? leftSquareBracket + type.ofType.name + rightSquareBracket : type.name;

  return (
    <>
      <div className="graphiql_schema__header">
        <button
          type="button"
          className="graphiql_schema__breadCrumbs-btn"
          onClick={() => navigate(-1)}
        >
          {'< Query'}
        </button>
        <h3 className="graphiql_schema__header_h3">{name}</h3>
      </div>

      <div className="graphiql_schema__content">
        <p className="graphiql_schema__fields-item_field-description">{description}</p>
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
                type.kind === 'LIST' ? `type-descr/${type.ofType.name}` : `type-descr/${typeName}`
              }`
            )
          }
        >
          {typeName}
        </button>

        <div className="graphiql_schema__fields-item__argument-name-title">
          <ArgumentIcon /> Arguments
        </div>
        {args.map((argsNames, index) => (
          <div className="graphiql_schema__fields-item__argument-name" key={index}>
            {argsNames.name}
            <span>{colon}</span>
            <button
              type="button"
              className="graphiql_schema__fields-item__argument-type-name-btn"
              key={index}
              onClick={() =>
                navigate(
                  argsNames.name === 'filter'
                    ? `arg-input-object/${
                        argsNames.type.name
                          ? argsNames.type.name
                          : argsNames.type.ofType.name
                          ? argsNames.type.ofType.name
                          : argsNames.type.ofType.ofType.ofType.name
                      }`
                    : `arg-scalar/${
                        argsNames.type.name
                          ? argsNames.type.name
                          : argsNames.type.ofType.name
                          ? argsNames.type.ofType.name
                          : argsNames.type.ofType.ofType.ofType.name
                      }`
                )
              }
            >
              {argsNames.type.name || argumentTypeName}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default FieldDescription;
