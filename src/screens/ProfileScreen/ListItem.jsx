import styles from './profile.module.scss'
import PropTypes from 'prop-types'

import { textCutter } from '../../functions/functions'

import { addItemToCart, deleteItem, removeSingleItemFromCart } from '../../features/user/userSlice'
import { useResize } from '../../hooks/useResize'

export const ListItem = ({ product, currentTotalPrice, dispatch, key }) => {

  const { image, title, quantity, price, id } = product
  const increase = (data) => {
    dispatch(addItemToCart(data))
  }
  const decrease = (data) => {
    dispatch(removeSingleItemFromCart(data))
  }
  const remove = (pathname, id) => {
    dispatch(deleteItem({ pathname, id }))
  }
  const { width } = useResize()

  return (
    <li key={key}>
      <img src={image} width='48px' height='48px'></img>
      {width >= 400 ? <div>{textCutter(title, 30)}</div> : null}
      {width >= 300 ? <div>{quantity} items</div> : null}
      {width >= 500 ? <div>price: {price} </div> : null}

      <div>total: {currentTotalPrice}$ </div>
      <div className={styles.itemButtons}>
        <div className={styles.plus} onClick={() => increase(el)}><i className="bi bi-plus"></i></div>
        <div className={styles.minus} onClick={() => decrease(el)}><i className="bi bi-dash"></i></div>
        <div className={styles.delete} onClick={() => remove(pathname, id)}><i className="bi bi-trash3"></i></div>
      </div>
    </li>
  )
}
ListItem.propTypes = {
  product: PropTypes.object,
  currentTotalPrice: PropTypes.number,
  dispatch: PropTypes.func,
}