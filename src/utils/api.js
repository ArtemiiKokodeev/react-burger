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
      authorization: localStorage.getItem('accessToken')
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

// регистрация пользователя
export const register = (name, email, password) => {
  return fetch(`${burgerPartyApiUrl}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then(getResponse)
    .then((res) => {
      return res;
    })
};

// авторизация пользователя
export const login = (email, password) => {
  return fetch(`${burgerPartyApiUrl}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(getResponse)
    .then((data) => {
      return data;
    })
};

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
  return fetch(`${burgerPartyApiUrl}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkReponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const logout = () => {
  return fetch(`${burgerPartyApiUrl}auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkReponse);
};