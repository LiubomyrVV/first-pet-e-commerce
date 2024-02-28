import { Link, NavLink } from 'react-router-dom'

import { useSelector } from 'react-redux'

import LoadingComponent from '../Utility/LoadingComponent/LoadingComponent'
import ErrorComponent from '../Utility/ErrorComponent/ErrorComponent'

import { changeFirstLetterToCapital, isObject } from '../../functions/functions'

import styles from './aside.module.scss'
import { ROUTES } from '../../utils/routes'



function Aside() {
  const { list } = useSelector(({ categories }) => categories)

  return (
    <>
      <div className={styles.container}>
        <h2>Categories</h2>
        <ul className={styles.categories}>
          {isObject(list) ?
            list[0] ? list.map((el, idx) => {
              el = changeFirstLetterToCapital(el)
              return <li key={idx} >
                <NavLink to={`/categories/${idx}`} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                  {el}
                </NavLink>
              </li>
            }) : <LoadingComponent /> : <ErrorComponent />}
        </ul>
        <div className={styles.footer}>
          <Link target='_blank' to={ROUTES.HELP}>Help</Link>
          <Link target='_blank' to={ROUTES.TERMS}>Therms & Conditions</Link>
        </div>
      </div>
    </>
  )
}

export default Aside