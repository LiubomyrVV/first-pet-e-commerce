import { useLocation, useParams } from 'react-router-dom';
import ProductCart from './ProductCart';
import styles from './cpc.module.scss'
import ProductPoster from './ProductPoster';

import PropTypes from 'prop-types'
import { toast } from 'react-toastify';
import { TYPES } from './constant';
import { useResize } from '../../hooks/useResize';
import { ROUTES } from '../../utils/routes';

function CurrentProductCart() {
    const { productId } = useParams()
    const toastify = (data, type) => {

        if (type === TYPES.ERR) {
            toast.error(data)
            return
        }
        if (type === TYPES.ADD) toast.success(data)
        else toast.warning(data)
    }
    const { width } = useResize()
    const { pathname } = useLocation()

    return (
        <div
            className={styles.container}
            style={{
                height: pathname !== ROUTES.HOME && width <= 529 ? '450px' :
                    (pathname !== ROUTES.HOME && width <= 457 ? '500px' :
                        (pathname !== ROUTES.HOME && width <= 383 ? '550px' : null))
            }}
        >
            {productId
                ? <ProductCart toastify={toastify} currentProductId={parseInt(productId, 10)} />
                : <ProductPoster />}
        </div>
    )
}
CurrentProductCart.propTypes = {
    toastify: PropTypes.func,
}

export default CurrentProductCart