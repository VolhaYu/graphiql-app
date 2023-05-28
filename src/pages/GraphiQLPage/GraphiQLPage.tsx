import React from 'react';
import './GraphiQLPage.scss';
import { useAppSelector } from '../../store/hooks/redux';
import GraphQLEditor from '../../components/GraphQLEditor/GraphQlEditor';
import GraphQLResponse from '../../components/GraphQLResponse/GraphQLResponse';
import GraphQLSchema from '../../components/GraphQLSchema/GraphQLSchema';

function GraphiQlPage() {
  const responseStatus = useAppSelector((state) => state.responseStatusSlice.ok);

  return (
    <main>
      <div className="graphiql">
        <GraphQLEditor />
        <GraphQLResponse />
        {responseStatus ? <GraphQLSchema /> : null}
      </div>
    </main>
  );
}

export default GraphiQlPage;
