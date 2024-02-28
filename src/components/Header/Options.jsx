import { Link } from "react-router-dom"
import { ROUTES } from "../../utils/routes"
import styles from './header.module.scss'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disableBurger } from "../../features/user/userSlice";
import PropTypes from 'prop-types'
import { useResize } from "../../hooks/useResize";


const Options = ({ isVisible = false }) => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()
  const { cart } = user

  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(cart.reduce((acc, current) => {
      console.log(acc.quantity, current.quantity)
      return acc + current.quantity
    }
      , 0))
  }, [cart])

  const handleOnOptions = () => {
    dispatch(disableBurger())
  }
  const { width } = useResize()
  return (
    <div className={styles.options} style={{
      opacity: isVisible || width > 805 ? '1' : '0'
    }}>
      <Link to={ROUTES.FAVORITES} onClick={handleOnOptions} className={styles.favorites}><i className={`bi bi-heart ${styles.icon}`}></i></Link>
      <Link to={ROUTES.CART} onClick={handleOnOptions} className={styles.store}>
        <i className={`bi bi-bag ${styles.icon}`}></i>
        <div className={styles.storeCount}>{count}</div>
      </Link>
    </div>
  )
}
Options.propTypes = {
  isVisible: PropTypes.bool,
}
export default Options