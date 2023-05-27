import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks/redux';

function GraphQLResponse() {
  const responseValue = useAppSelector((state) => state.responseValueSlice.value);
  const { t } = useTranslation();

  return (
    <div className="graphiql_response">
      <div className="graphiql_response__header">
        <p>{t('description.Response')}</p>
      </div>
      <div className="graphiql_response__field">
        <pre>{`${responseValue}`}</pre>
      </div>
    </div>
  );
}

export default GraphQLResponse;
