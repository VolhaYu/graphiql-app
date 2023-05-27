import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks/redux';
import Loader from '../loader/Loader';
import { ReactComponent as FieldsIcon } from '../../assets/fieldsIcon.svg';
import { colon } from '../../constants';

function ArgumentInputObject() {
  const { argInputObject: argInputObjectParams } = useParams();

  const navigate = useNavigate();

  const schemaValue = useAppSelector((state) => state.schemaValueSlice.value);
  if (!schemaValue.length) {
    return <Loader />;
  }

  const field = schemaValue.find((schemaItem) => schemaItem.name === argInputObjectParams);

  if (!field) {
    return <Loader />;
  }

  const { inputFields } = field;

  return (
    <>
      <div className="graphiql_schema__header" key={field.name}>
        <button
          type="button"
          className="graphiql_schema__breadCrumbs-btn"
          onClick={() => navigate(-1)}
        >
          {'< Go Back'}
        </button>

        <h3 className="graphiql_schema__header_h3">{field.name}</h3>
      </div>

      <div className="graphiql_schema__content">
        <h4 className="graphiql_schema__header_h4">
          <FieldsIcon />
          Fields
        </h4>

        {inputFields.map((inputField) => (
          <div className="graphiql_schema__fields-item-detailed" key={inputField.name}>
            <div className="graphiql_schema__fields-item-detailed__field-btns-box">
              <button
                type="button"
                className="graphiql_schema__fields-item-detailed__argument-name-btn__type-detailed-description"
                onClick={() => navigate(`arg-descr/${inputField.name}`)}
              >
                {inputField.name}
              </button>

              <span>{colon}</span>

              <button
                type="button"
                className="graphiql_schema__fields-item-detailed__argument-type-name-btn__type-detailed-description"
                onClick={() => navigate(`${inputField.type.name}`)}
              >
                {inputField.type.name}
              </button>
            </div>
          </div>
        ))}
        <p className="graphiql_schema__argument-type-description">{field.description}</p>
      </div>
    </>
  );
}

export default ArgumentInputObject;
