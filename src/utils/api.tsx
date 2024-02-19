import { burgerPartyApiUrl } from './constants';
import { TIngredient } from "../utils/types";

function getResponse (res: Response) {
  return !res.ok ? Promise.reject(`Ошибка: ${res.status} ${res.statusText}`) : res.json();
} 

// получение массива ингредиентов
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

// создание заказа
export const createOrder = (burgerIngredients: Array<TIngredient>) => {
  return fetch(`${burgerPartyApiUrl}orders`, { 
    method: "POST",
    // @ts-ignore
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
export const register = (name: string, email: string, password: string) => {
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
export const login = (email: string, password: string) => {
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

function checkReponse (res: Response) {
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

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err: any) {
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

// выход пользователя из профиля
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

// запрос forgot-password
export const forgotPassword = (email: string) => {
  return fetch(`${burgerPartyApiUrl}password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then(getResponse)
    .then((res) => {
      return res;
    })
};

// запрос reset-password (смена пароля)
export const resetPassword = (password: string, token: string) => {
  return fetch(`${burgerPartyApiUrl}password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
  })
    .then(getResponse)
    .then((res) => {
      return res;
    })
};