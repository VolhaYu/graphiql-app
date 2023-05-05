import React from 'react';
import { useAppSelector } from '../../store/hooks/redux';

function GraphQLResponse() {
  const responseValue = useAppSelector((state) => state.responseValueSlice.value);

  return (
    <div className="graphiql_response">
      <div className="graphiql_response__header">
        <p>Response:</p>
      </div>
      <div className="graphiql_response__field">
        <pre>{`${responseValue}`}</pre>
      </div>
    </div>
  );
}

export default GraphQLResponse;
