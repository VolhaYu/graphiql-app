import React from 'react';
import './GraphiQLPage.scss';
import GraphQLEditor from '../../components/GraphQlEditor/GraphQlEditor';
import GraphQLResponse from '../../components/GraphQLResponse/GraphQLResponse';
import GraphQLSchema from '../../components/GraphQLSchema/GraphQLSchema';

function GraphiQlPage() {
  return (
    <main>
      <div className="graphiql">
        <GraphQLEditor />
        <GraphQLResponse />
        <GraphQLSchema />
      </div>
    </main>
  );
}

export default GraphiQlPage;
