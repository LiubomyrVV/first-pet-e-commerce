import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProduct } from '../../functions/functions'
import { ROUTES } from '../../utils/routes'
import styles from './header.module.scss'


import { screen } from '../../functions/Screen'
import Auth from '../Auth/Auth'
import { hideForm, showForm } from '../../features/user/userSlice'
import { GUEST_AVATAR, GUEST_NAME } from './constant'
import { Burger } from './Burger'
import { useResize } from '../../hooks/useResize'
import SearchBar from './SearchBar'
import Options from './Options'


const Header = () => {
    const dispatch = useDispatch()

    const user = useSelector(({ user }) => user)

    const { currentUser } = user
    const { name, avatar } = currentUser

    const [values, setValues] = useState({
        name: GUEST_NAME,
        avatar: GUEST_AVATAR
    })

    useEffect(() => {
        if (name && avatar) {
            setValues({ name, avatar })
        } else return

    }, [currentUser])


    const { isFormVisible, isLogged } = useSelector(({ user }) => user)

    useEffect(() => {
        if (isLogged) return
        setValues({
            name: GUEST_NAME,
            avatar: GUEST_AVATAR
        })
    }, [isLogged])

    const handleOnAuth = (e) => {
        e.preventDefault()
        if (isLogged) return

        screen.disableScroll()
        dispatch(showForm())
    }

    useEffect(() => {
        dispatch(hideForm())
    }, [isLogged])

    const { width } = useResize()



    return (
        <>
            {isFormVisible ? <Auth /> : null}

            <header>

                <div className={styles.logo}>
                    <Link to={ROUTES.HOME} style={{ fontSize: '1.3rem' }}><span className='purple'>V</span>Shop</Link>
                </div>
                {
                    isLogged ?
                        <Link to={ROUTES.PROFILE} className={styles.login} >
                            <img src={values.avatar} alt="profile icon" className={styles.icon} />
                            <div className={styles.username}> {values.name}</div>
                        </Link>
                        :
                        <Link className={styles.login} onClick={handleOnAuth}>
                            <img src={values.avatar} alt="profile icon" className={styles.icon} />
                            <div className={styles.username}> {values.name}</div>
                        </Link>
                }
                {width > 805 ?
                    <>
                        <SearchBar />
                        <Options />
                    </>
                    : <Burger />
                }


            </header>
        </>
    )
}


export default Header