import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as RootTypesIcon } from '../../assets/rootTypesIcon.svg';

function Docs() {
  return (
    <>
      <h2 className="graphiql_schema__header">Docs</h2>

      <div className="graphiql_schema__content">
        <p> A GraphQL schema provides a root type for each kind of operation.</p>
        <div className="graphiql_schema__root-types">
          <div className="graphiql_schema__root-types-list">
            <div className="graphiql_schema__root-types-list-title">
              <RootTypesIcon />
              Root Types
            </div>
            <p className="graphiql_schema__root-type">
              query:
              <Link className="graphiql_schema__root-type-btn" to="query">
                Query
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Docs;
