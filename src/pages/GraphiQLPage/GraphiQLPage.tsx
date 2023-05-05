import React from 'react';
import './GraphiQLPage.scss';
import GraphQlEditor from '../../components/GraphQLEditor/GraphQLEditor';
import GraphQLResponse from '../../components/GraphQLResponse/GraphQLResponse';

function GraphiQlPage() {
  return (
    <div className="graphiql">
      <GraphQlEditor />
      <GraphQLResponse />
    </div>
  );
}

export default GraphiQlPage;
