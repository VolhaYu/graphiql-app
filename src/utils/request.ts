const url = 'https://rickandmortyapi.com/graphql';

export const makeRequest = async (
  query: string | undefined,
  headers: { [key: string]: string | number },
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  const addedHeaders = {
    'Content-type': 'application/json',
    ...headers,
  };

  return fetch(url, {
    method: 'POST',
    headers: addedHeaders,
    body: JSON.stringify({ query }),
  })
    .then((res) => {
      if (!res.ok) {
        setErrorMessage(`Request error: ${res.status}`);
      }
      return res.json();
    })
    .then((res) => JSON.stringify(res, null, 2));
};

export default makeRequest;
