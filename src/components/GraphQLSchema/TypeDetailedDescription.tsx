/* eslint-disable no-nested-ternary */

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { colon, exclamationPoint, leftSquareBracket, rightSquareBracket } from '../../constants';
import { useAppSelector } from '../../store/hooks/redux';
import Loader from '../loader/Loader';
import { ReactComponent as FieldsIcon } from '../../assets/fieldsIcon.svg';

function TypeDetailedDescription() {
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

  const { fields } = field;

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
        <h3 className="graphiql_schema__header_h3">{field.name}</h3>
      </div>

      <div className="graphiql_schema__content">
        <h4 className="graphiql_schema__header_h4">
          <FieldsIcon />
          Fields
        </h4>

        {fields.map((fieldItem) => (
          <div className="graphiql_schema__fields-item-detailed" key={fieldItem.name}>
            <div className="graphiql_schema__fields-item-detailed__field-btns-box">
              <button
                type="button"
                className="graphiql_schema__fields-item-detailed__argument-name-btn__type-detailed-description"
                onClick={() => navigate(`type-arg-scalar/${fieldItem.name}`)}
              >
                {fieldItem.name}
              </button>

              <span>{colon}</span>

              <button
                type="button"
                className="graphiql_schema__fields-item-detailed__argument-type-name-btn__type-detailed-description"
                onClick={() =>
                  navigate(
                    `${
                      fieldItem.type.name
                        ? fieldItem.type.name
                        : fieldItem.type.ofType.name
                        ? fieldItem.type.ofType.name
                        : fieldItem.type.ofType.ofType.name
                    }`
                  )
                }
              >
                {fieldItem.type.name
                  ? fieldItem.type.name
                  : fieldItem.type.ofType.name && fieldItem.type.kind === 'LIST'
                  ? leftSquareBracket + fieldItem.type.ofType.name + rightSquareBracket
                  : fieldItem.type.ofType.name
                  ? fieldItem.type.ofType.name
                  : leftSquareBracket +
                    fieldItem.type.ofType.ofType.name +
                    rightSquareBracket +
                    exclamationPoint}
              </button>
            </div>

            <p className="graphiql_schema__fields-item-detailed__field-description__type-detailed-description">
              {fieldItem.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default TypeDetailedDescription;
