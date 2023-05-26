/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserAuth from '../pages/UserAuth/UserAuth';
import NotFound from '../pages/NotFound';
import WelcomePage from '../pages/WelcomePage';
import GraphiQlPage from '../pages/GraphiQLPage/GraphiQLPage';
import { setSchemaValue } from '../store/reducers/schemaValueSlice';
import { useAppDispatch } from '../store/hooks/redux';
import getSchema from './GraphQLSchema/GetShema';
import Docs from './GraphQLSchema/Docs';
import Query from './GraphQLSchema/Query';
import FieldDescription from './GraphQLSchema/FieldDescription';
import TypeDetailedDescription from './GraphQLSchema/TypeDetailedDescription';
import ArgumentScalar from './GraphQLSchema/ArgumentScalar';
import ArgumentInputObject from './GraphQLSchema/ArgumentInputObject';

function PagesRouter() {
  const dispatch = useAppDispatch();

  const fetchData = useCallback(async () => {
    const data = await getSchema();
    dispatch(setSchemaValue(data));
  }, []);

  useEffect(() => {
    fetchData().catch(Error);
  }, [fetchData]);

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/auth" element={<UserAuth />} />
      <Route path="/graphiql" element={<GraphiQlPage />}>
        <Route path="docs" element={<Docs />} />
        <Route path="docs/query" element={<Query />} />
        <Route path="docs/query/field/:name" element={<FieldDescription />} />
        <Route path="docs/query/type/:typeName" element={<TypeDetailedDescription />}>
          <Route
            path="docs/query/type/:typeName/type-arg-scalar/:argScalar"
            element={<ArgumentScalar />}
          />
        </Route>
        <Route path="docs/query/arg-scalar/:argScalar" element={<ArgumentScalar />} />

        <Route
          path="docs/query/arg-input-object/:argInputObject"
          element={<ArgumentInputObject />}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default PagesRouter;
