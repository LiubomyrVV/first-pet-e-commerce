
import { Link } from 'react-router-dom'
import { textCutter } from '../../functions/functions'
import styles from './spc.module.scss'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Loading from '../Utility/LoadingComponent/LoadingComponent'
import { useResize } from '../../hooks/useResize'
import { screen } from '../../functions/Screen'

const SingleProductCart = ({ category, id, imageURL, price, title }) => {
    const categories = useSelector(({ categories }) => categories)
    const currentCategoryId = categories.list.indexOf(category)
    const { width } = useResize()

    const findCurrentSize = (width) =>
        width <= 464 ? 210 : (width <= 490 ? 170 :
            (width <= 551 ? 190 : (width <= 1314 ? 200 : 200)))
    return (
        <div className={styles.wrapper}
            style={{ height: `${Math.floor(findCurrentSize(width) * 1.45)}px` }}>
            {!categories ? <Loading /> :
                <>
                    <Link
                        to={`/categories/${currentCategoryId}/${id}`}
                        onClick={() => {
                            screen.scrollUp()
                        }}
                    ><img src={imageURL} alt={title} title={title}
                        style={{
                            width: `${findCurrentSize(width)}px`,
                            height: `${findCurrentSize(width)}px`,
                        }}
                        /></Link>
                    <h4> {textCutter(title, width >= 1433 ? 30 : 14)}</h4>
                    <div className={styles.price}> {`${price}$`} </div>
                </>
            }


        </div>
    )
}

SingleProductCart.propTypes = {
    id: PropTypes.number,
    price: PropTypes.number,

    imageURL: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
}

export default SingleProductCart