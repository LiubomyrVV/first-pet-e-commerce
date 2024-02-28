import Aside from '../../components/Aside/Aside'
import Carousel from '../../components/Carousel/Carousel'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Poster from '../../components/Poster/Poster'
import CurrentProductCart from '../../components/CurrentProductCart/CurrentProductCart'
import styles from './home.module.scss'

import { useEffect } from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'

import { getCategories } from '../../features/categories/categoriesSlice'
import { getProducts } from '../../features/products/productsSlice'
import { useLocation, useParams } from 'react-router-dom'
import { autoAuth, changeFirstLetterToCapital } from '../../functions/functions'
import { ROUTES } from '../../utils/routes'
import { useResize } from '../../hooks/useResize'



function HomeScreen() {
  const dispatch = useDispatch()

  useEffect(() => {
    autoAuth(dispatch)
  }, [dispatch])


  const { pathname } = useLocation()
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [dispatch])


  const { categoryId } = useParams()

  const products = useSelector(({ products }) => products)

  const categories = useSelector(({ categories }) => categories)

  const { width } = useResize()


  const { isBurgerActive } = useSelector(({ user }) => user)

  useEffect(() => {
    console.log(isBurgerActive)
  }, [isBurgerActive])

  if (!categories.isLoaded) return

  let currentCategory = categories.list[categoryId ? categoryId : 0]


  return (
    <div style={{
      overflow: isBurgerActive ? 'hidden' : null,
      height: isBurgerActive ? '100vh' : null
    }}>
      <Header />
      {width > 765 ?
        <div className={styles.wrapper}>
          <Aside />
          <CurrentProductCart />
        </div>
        :
        <>
          <CurrentProductCart />
          <Aside />
        </>

      }


      <div className={styles.listWrapper}>
        {pathname === ROUTES.HOME

          ? <Carousel
            title={'Bestselling Products'}
            products={products.list.filter(el => el.rating.rate >= 4)}
          />

          : <Carousel
            title={changeFirstLetterToCapital(currentCategory)}
            products={products.list.filter(el => el.category === currentCategory)}
          />

        }

        <Poster />
        <Carousel
          title={'less than 100$'}
          products={products.list.filter(el => el.price <= 100)}
        />
        <Poster posterId={1} />
        {categoryId ?
          <Carousel
            title={'Bestselling Products'}
            products={products.list.filter(el => el.rating.rate >= 4)} />
          : null
        }
      </div>
      <Footer />
    </div>
  )
}

HomeScreen.propTypes = {
  products: PropTypes.array,
}
export default HomeScreen
