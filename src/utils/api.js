import { burgerPartyApiUrl } from '../utils/constants';

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }
  return res.json();
} 

export const getIngredients = () => {
  return fetch(`${burgerPartyApiUrl}ingredients`, {
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

export const createOrder = (burgerIngredients) => {
  return fetch(`${burgerPartyApiUrl}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: burgerIngredients.map((el) => el._id),
    }),
  })
  .then(getResponse)
  .then((res) => {
    return res;
  })
}
