import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { PLATZI_BASE_URL } from "../../database/api"
import { ROUTES } from "../../utils/routes"
import { screen } from "../../functions/Screen"






export const createUser = createAsyncThunk(
  'users/createUser',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${PLATZI_BASE_URL}/users`, payload)
      return res.data
    } catch (err) {
      console.error(err)
      return thunkAPI.rejectWithValue(err)
    }
  }
)

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${PLATZI_BASE_URL}/auth/login`, payload);
      const login = await axios(`${PLATZI_BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
        },
      });

      return login.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const checkEmail = createAsyncThunk(
  "users/checkEmail",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${PLATZI_BASE_URL}/users/is-available`, payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
const addCurrentUser = (state, { payload }) => {
  state.currentUser = payload;
  state.isLogged = true;
  if (localStorage.getItem('user')) {
    const user = JSON.parse(localStorage.getItem('user'))
    state.cart = user.cart
    state.favorites = user.favorites
  }
  localStorage.setItem('user', JSON.stringify(state))
}


const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: [],
    cart: [],
    favorites: [],
    // filtered: [],
    // related: [],
    isLoading: false,
    isLogged: false,
    isFormVisible: false,
    isEmailAvailable: false,
    isBurgerActive: false,
  },
  reducers: {
    enableBurger: state => {
      state.isBurgerActive = true
      screen.disableScroll
    },
    disableBurger: state => {
      state.isBurgerActive = false
      screen.enableScroll
    },


    showForm: state => {
      state.isFormVisible = true
    },

    hideForm: state => {
      state.isFormVisible = false
    },

    clearUser: state => {
      state.currentUser = []
      state.cart = []
      state.favorites = []
      state.isLoading = false
      state.isLogged = false
      state.isEmailAvailable = false,
        localStorage.setItem('user', JSON.stringify(state))
    },

    clearCart: (state, { payload }) => {
      if (payload === ROUTES.CART) {
        state.cart = []
        localStorage.setItem('user', JSON.stringify({ ...state, cart: state.cart }))
      } else {
        state.favorites = []
        localStorage.setItem('user', JSON.stringify({ ...state, favorites: state.favorites }))
      }
    },

    deleteItem: (state, { payload }) => {
      if (payload.pathname === ROUTES.CART) {
        let newCart = state.cart.filter(el => el.id !== payload.id)
        state.cart = newCart
        localStorage.setItem('user', JSON.stringify({ ...state, cart: state.cart }))
      } else {
        let newFavorites = state.favorites.filter(el => el.id !== payload.id)
        state.favorites = newFavorites
        localStorage.setItem('user', JSON.stringify({ ...state, favorites: state.favorites }))
      }
    },

    removeItemFromFavorites: (state, { payload }) => {
      const newFavorites = state.favorites.filter(({ id }) => id !== payload.id)
      state.favorites = newFavorites
      localStorage.setItem('user', JSON.stringify({ ...state, favorites: newFavorites }))
    },

    addItemToFavorites: (state, { payload }) => {
      let newFavorites = [...state.favorites]

      const found = state.favorites.find(({ id }) => id === payload.id)
      if (!found) newFavorites.push(payload)
      state.favorites = newFavorites;

      const user = JSON.parse(localStorage.getItem('user'))
      localStorage.setItem('user', JSON.stringify({ ...user, favorites: newFavorites }))
    },

    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart]
      const found = state.cart.find(({ id }) => id === payload.id)
      if (found) {

        newCart = newCart.map(item => {
          console.table({
            'item.id': item.id,
            'payload.id': payload.id,
          })
          return item.id === payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        })
      } else {
        newCart.push({ ...payload, quantity: 1 })
      }
      state.cart = newCart;
      if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'))
        localStorage.setItem('user', JSON.stringify({ ...user, cart: newCart }))
      }
    },

    removeSingleItemFromCart: (state, { payload }) => {
      let newCart = [...state.cart]
      const found = state.cart.find(({ id }) => id === payload.id)

      if (found) {
        newCart = newCart.map(item => {
          return item.id === payload.id && item.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
        })
        newCart = newCart.filter(item => {
          if (item.quantity > 0) return item
          else return
        })
      }


      state.cart = newCart;
      if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'))
        localStorage.setItem('user', JSON.stringify({ ...user, cart: newCart }))
      }
    },


    removeItemFromCart: (state, { payload }) => {
      const newCart = state.cart.filter(({ id }) => id !== payload)
      state.cart = newCart
      localStorage.setItem('user', JSON.stringify({ ...state, cart: newCart }))
    },


    clearWarningMessage: state => {
      state.isEmailAvailable = true
      localStorage.setItem('user', JSON.stringify({ ...state, isEmailAvailable: true }))
    },
  },
  /* eslint-disable-next-line */
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, addCurrentUser);
    builder.addCase(loginUser.fulfilled, addCurrentUser);
    // builder.addCase(updateUser.fulfilled, addCurrentUser);
    builder.addCase(checkEmail.fulfilled, (state, { payload }) => {
      console.log(payload)
      state.isEmailAvailable = payload.isAvailable
    })

  }

})

export const {
  addItemToCart, removeItemFromCart,
  removeItemFromFavorites, addItemToFavorites,
  removeSingleItemFromCart,
  deleteItem, clearCart,
  clearUser,
  showForm, hideForm,
  clearWarningMessage,
  setCurrentCategory,
  disableBurger, enableBurger

} = userSlice.actions
export default userSlice.reducer