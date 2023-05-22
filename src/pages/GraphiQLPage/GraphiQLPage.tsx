import React from 'react';
import './GraphiQLPage.scss';
import GraphQLEditor from '../../components/GraphQLEditor/GraphQLEditor';
import GraphQLResponse from '../../components/GraphQLResponse/GraphQLResponse';

function GraphiQlPage() {
  return (
    <main>
      <div className="graphiql">
        <GraphQLEditor />
        <GraphQLResponse />
      </div>
    </main>
  );
}

export default GraphiQlPage;
