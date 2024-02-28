import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import styles from './profile.module.scss'
import { useEffect, useState } from 'react'
import { autoAuth, textCutter } from '../../functions/functions'

import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import Profile from '../../components/Profile/Profile'
import Aside from '../../components/Profile/Aside'

import { useResize } from '../../hooks/useResize'
import { ListItem } from './listItem'

const ProfileScreen = () => {

  const dispatch = useDispatch()
  const { pathname } = useLocation()

  useEffect(() => {
    autoAuth(dispatch)
  }, [dispatch])

  useEffect(() => {
    const handleBeforeUnload = () => {
      dispatch()
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [])

  const user = useSelector(({ user }) => user)
  const { cart, favorites, currentUser } = user

  const [totalPrice, setTotalPrice] = useState(0)
  useEffect(() => {
    setTotalPrice(Math.round(cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)))
  }, [cart])


  const [isWarningVisible, setIsWarningVisible] = useState(false)

  function handleOnClearButton(e) {
    setIsWarningVisible(true)
    e.preventDefault()
  }

  const clearCart = (e) => {
    e.preventDefault()
    if (pathname === ROUTES.CART) {
      dispatch(clearCart(ROUTES.CART))
    } else dispatch(clearCart(ROUTES.FAVORITES))
  }


  const countTotalPrice = (list, id) => {
    const found = list.find(el => el.id === id)
    return found.quantity * found.price
  }
  const { width } = useResize()
  return (
    <>
      {
        isWarningVisible ?
          <div className={styles.warningContainer}>
            <div className={styles.warning}>
              <div className={styles.title}><span className='purple'>C</span>lear  <span className='purple'>C</span>art</div>
              <div>Do you want to clear your cart? </div>
              <div className={styles.warningButtons} >
                <button onClick={(e) => {
                  e.preventDefault()
                  setIsWarningVisible(false)
                }} className={styles.deviationBtn}>Cancel</button>
                <button onClick={clearCart} className={styles.confirmationBtn}>Clear</button>
              </div>

            </div>
          </div>
          : null
      }
      <Header />
      {width > 848 ?
        <div className={styles.wrapper}>
          <Aside currentUser={currentUser} />
          <main>
            {pathname === ROUTES.PROFILE ?
              <Profile /> :
              <>
                {pathname === ROUTES.CART ?
                  <h2 className={styles.category}> CART </h2>
                  :
                  <h2 className={styles.category}> FAVORITES </h2>}
                <div className={styles.container}>
                  <ul>
                    {pathname === ROUTES.CART ?
                      <>
                        <div className={styles.total}>Total: {totalPrice}$</div>
                        {cart.map(el => {
                          if (!cart) return

                          const currentTotalPrice = Math.round(countTotalPrice(cart, el.id));
                          return <ListItem
                            currentTotalPrice={currentTotalPrice}
                            dispatch={dispatch}
                            product={el}
                            key={el.key}
                          />

                        })}</> :
                      favorites.map((el) => {
                        return <li key={el.id}>
                          <img src={el.image} width='48px' height='48px'></img>
                          <div>{textCutter(el.title, 30)}</div>
                          <div>price: {el.price} </div>
                          <div className={styles.itemButtons}>
                            <div className={styles.delete} onClick={() => remove(pathname, el.id)}><i className="bi bi-trash3"></i></div>
                          </div>
                        </li>

                      })
                    }
                  </ul>
                  <div className={styles.buttons}>
                    {pathname === ROUTES.CART ?
                      <Link to={ROUTES.FAVORITES}><div className={styles.favoritesButton}>Favorites</div></Link>
                      :
                      <Link to={ROUTES.CART}><div className={styles.cartButton}>Cart</div></Link>
                    }
                    <div className={styles.buy}>Buy</div>
                    <div onClick={handleOnClearButton} className={styles.clear}>Clear</div>
                  </div>
                </div>

              </>}
          </main>
        </div> :
        <>
          <Aside currentUser={currentUser} />
          <main>
            {pathname === ROUTES.PROFILE ?
              <Profile /> :
              <>
                {pathname === ROUTES.CART ?
                  <h2 className={styles.category}> CART </h2>
                  :
                  <h2 className={styles.category}> FAVORITES </h2>}
                <div className={styles.container}>
                  <ul>
                    {pathname === ROUTES.CART ?
                      <>
                        <div className={styles.total}>Total: {totalPrice}$</div>
                        {cart.map(el => {
                          if (!cart) return

                          const currentTotalPrice = Math.round(countTotalPrice(cart, el.id));
                          return <ListItem
                            currentTotalPrice={currentTotalPrice}
                            dispatch={dispatch}
                            product={el}
                            key={el.key}
                          />

                        })}</> :
                      favorites.map((el) => {
                        return <li key={el.id}>
                          <img src={el.image} width='48px' height='48px'></img>
                          <div>{textCutter(el.title, 30)}</div>
                          <div>price: {el.price} </div>
                          <div className={styles.itemButtons}>
                            <div className={styles.delete} onClick={() => remove(pathname, el.id)}><i className="bi bi-trash3"></i></div>
                          </div>
                        </li>

                      })
                    }
                  </ul>
                  <div className={styles.buttons}>
                    {pathname === ROUTES.CART ?
                      <Link to={ROUTES.FAVORITES}><div className={styles.favoritesButton}>Favorites</div></Link>
                      :
                      <Link to={ROUTES.CART}><div className={styles.cartButton}>Cart</div></Link>
                    }
                    <div className={styles.buy}>Buy</div>
                    <div onClick={handleOnClearButton} className={styles.clear}>Clear</div>
                  </div>
                </div>

              </>}
          </main>
        </>

      }

      <Footer />

    </>

  )
}

export default ProfileScreen