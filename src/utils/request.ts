import i18next from 'i18next';
import { setResponseStatus } from '../store/reducers/responseStatusSlice';
import { AppDispatch } from '../store/store';

const url = 'https://rickandmortyapi.com/graphql';

export const makeRequest = async (
  query: string | undefined,
  headers: { [key: string]: string | number },
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  dispatch: AppDispatch
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
        setErrorMessage(`${i18next.t('description.request-error')}: ${res.status}`);
      } else if (res.ok) {
        dispatch(setResponseStatus(true));
      }
      return res.json();
    })
    .then((res) => JSON.stringify(res, null, 2));
};

export default makeRequest;
