import { ingredientsApiUrl } from '../utils/constants';

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }
  return res.json();
} 

export const getIngredients = () => {
  return fetch(`${ingredientsApiUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(getResponse)
    .then((res) => {
      return res;
    })
};
