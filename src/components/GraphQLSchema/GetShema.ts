/* eslint-disable no-underscore-dangle */
import { getIntrospectionQuery } from 'graphql';

const url = 'https://rickandmortyapi.com/graphql';

const getSchema = async () => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query: getIntrospectionQuery() }),
  })
    .then((res) => res.json())
    .then((res) => res.data.__schema.types);
};

export default getSchema;
