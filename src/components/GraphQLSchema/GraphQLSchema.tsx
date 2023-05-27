import React from 'react';
import { Outlet } from 'react-router-dom';
import SchemaBtn from './SchemaBtn';
import { useAppSelector } from '../../store/hooks/redux';

import Loader from '../loader/Loader';

function GraphQLSchema() {
  const schemaValue = useAppSelector((state) => state.schemaValueSlice.value);

  if (!schemaValue.length) {
    return <Loader />;
  }

  return (
    <div className="graphiql_schema">
      <SchemaBtn />
      <Outlet />
    </div>
  );
}
export default GraphQLSchema;
