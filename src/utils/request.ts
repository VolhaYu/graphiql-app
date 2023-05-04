const url = 'https://rickandmortyapi.com/graphql';

export const makeRequest = async (query: string | undefined) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((res) => JSON.stringify(res, null, 2));
};
