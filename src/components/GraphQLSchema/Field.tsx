/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SchemaFields } from '../../store/reducers/schemaValueSlice';

import {
  leftBrace,
  colon,
  rightBrace,
  leftSquareBracket,
  exclamationPoint,
  rightSquareBracket,
} from '../../constants';

export type FieldProps = {
  field: SchemaFields;
};

function Field({ field }: FieldProps) {
  const { name, description, args, type } = field;

  const navigate = useNavigate();

  const argumentTypeNameList = args.map((argsNames) =>
    argsNames.type.name
      ? argsNames.type.name
      : argsNames.type.ofType.name
      ? argsNames.type.ofType.name
      : argsNames.type.ofType.ofType.ofType.name
  );

  const argumentTypeName =
    argumentTypeNameList.includes('ID') && type.kind === 'OBJECT'
      ? `ID${exclamationPoint}`
      : argumentTypeNameList.includes('ID') && type.kind === 'LIST'
      ? `${leftSquareBracket}ID${exclamationPoint}${rightSquareBracket}${exclamationPoint}`
      : argumentTypeNameList;

  const typeName = type.kind === 'OBJECT' ? type.name : type.ofType.name;

  return (
    <div className="graphiql_schema__fields-item">
      <div className="graphiql_schema__fields-item__field-name-btn-box">
        <button
          key={field.name}
          type="button"
          className="graphiql_schema__fields-item__field-name-btn"
          onClick={() => navigate(`field/${field.name}`)}
        >
          {name}
        </button>
        <span>{leftBrace}</span>
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

      <div>
        <span>
          {rightBrace} {colon}
        </span>
        <button
          key={typeName}
          type="button"
          className="graphiql_schema__fields-item__type-name-btn"
          onClick={() => navigate(`type/${typeName}`)}
        >
          {typeName}
        </button>
      </div>

      <p className="graphiql_schema__fields-item__field-description">{description}</p>
    </div>
  );
}

export default Field;
