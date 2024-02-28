
import styles from './cpc.module.scss'
import PropTypes from 'prop-types'

import { useGetProductQuery } from '../../features/api/apiSlice'
import { isProductInList, textCutter } from '../../functions/functions'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, addItemToFavorites, removeItemFromFavorites } from '../../features/user/userSlice'
import Loading from '../Utility/LoadingComponent/LoadingComponent'

import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import OperationsObservable from '../../Observable/OperationsObservable'
import { TYPES } from './constant'
import { useResize } from '../../hooks/useResize'







function ProductCart({ currentProductId, toastify }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { width } = useResize()

  useEffect(() => {
    OperationsObservable.subscribe(toastify)

    return () => {
      OperationsObservable.unsubscribe(toastify)
    }
  }, [])

  const [isInFavoritesList, setIsInFavoritesList] = useState(false)
  const { favorites } = useSelector(({ user }) => user)

  const { isLogged } = useSelector(({ user }) => user)
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery(currentProductId)
  useEffect(() => {
    if (!isLoading && !isFetching && !isSuccess) navigate.push(ROUTES.HOME)
    /* eslint-disable-next-line*/
  }, [isLoading, isFetching, isSuccess])

  useEffect(() => {
    setIsInFavoritesList(isProductInList(favorites, currentProductId))
  }, [favorites, currentProductId])

  if (!data) return <Loading />
  const { title, image, description, rating } = data

  if (!rating) return
  const { rate, count } = rating

  const addToCart = () => {
    if (!isLogged) {
      OperationsObservable.notify("Log In!", TYPES.ERR);
      return
    }

    OperationsObservable.notify("Added to Cart!", TYPES.ADD);
    dispatch(addItemToCart(data))
  }
  const toggleFavorite = isActive => {

    if (!isLogged) {
      OperationsObservable.notify("Log In!", TYPES.ERR);
      return
    }

    if (!isActive) {
      dispatch(addItemToFavorites(data))
      OperationsObservable.notify("Added to Favorites!", TYPES.ADD);
    }
    else {
      dispatch(removeItemFromFavorites(data))
      OperationsObservable.notify("Removed from Favorites!", TYPES.REMOVE);
    }
  }


  return (
    <>
      <ToastContainer
        autoClose={1000}
        pauseOnHover
      />
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <div className={styles.imageCart}>
            <img src={image} />
            <div className={styles.rating}>rate: {rate} count: {count}</div>
          </div>
          <div className={styles.productDescription}>
            <h3 className={styles.title}>{textCutter(title, width <= 526 ? 50 : 300 )}</h3>
            <div className={styles.description}>{textCutter(description, width <= 526 ? 200 : 400)}</div>
          </div>
          <div className={styles.actions}>
            <button onClick={() => toggleFavorite(isInFavoritesList)} className={styles.favorites}><i className={
              isInFavoritesList ? `bi bi-heart-fill` : `bi bi-heart`
            }></i></button>
            <button onClick={addToCart} className={styles.buy}> <div className={styles.addToCart}>ADD TO CART</div></button>
          </div>
        </div>
      </div>
    </>
  )
}

ProductCart.propTypes = {
  currentProductId: PropTypes.number,
  toastify: PropTypes.func,
}

export default ProductCart