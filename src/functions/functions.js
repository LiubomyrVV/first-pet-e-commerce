

import OperationObservable from '../Observable/OperationsObservable'
import { languageDateBase } from '../database/languageDateBase'
import { loginUser } from '../features/user/userSlice'

export const findWordFromLanguageDateBase = (word) => {
  const object = languageDateBase.parse(word)
  Object.values(object)
}

export const isObject = (element) =>
  typeof element === 'object' && element !== null

export const isNumber = (value) =>
  typeof Number(value) === 'number' && !isNaN(value)

export const changeFirstLetterToCapital = (element) =>
  element ? element[0].toUpperCase() + element.slice(1) : '0'

export const textCutter = (string, count) =>
  string.length >= count ? string.slice(0, count).trim() + '...' : string

export const searchProduct = (product, value) =>
  product.title.toLowerCase().replace(/\s/g, '').includes(value.toLowerCase().replace(/\s/g, ''))

export const isProductInList = (list, productId) =>
  list.find(product => product.id === productId) ? true : false




export const scrollUp = () => {
  window.addEventListener("load", () => {
    window.scrollTo(0, 0); // scroll to start position when website is loaded
  })
}

export const createSingleCallFunction = (callback) => {
  let called = false;

  return function (...args) {
    if (!called) {
      called = true;
      return callback.apply(this, args);
    }
  };
}
export const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

export const autoAuth = (dispatch) => {
  try {
    if (localStorage.getItem('user')) {
      const storedUser = JSON.parse(localStorage.getItem('user'))
      if (!storedUser || storedUser.currentUser.length === 0) return
      const { password, email } = storedUser.currentUser
      console.log(storedUser.currentUser)
      dispatch(loginUser({ "email": email, "password": password }))
    }
  } catch (err) {
    console.error(err)
  }
}

