import PropTypes from 'prop-types'
import styles from './aside.module.scss'
import { isMobile, isTablet } from 'react-device-detect';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../features/user/userSlice';
import { screen } from '../../functions/Screen';



const Aside = ({ currentUser }) => {
  const { name = 'guest', email, role, avatar } = currentUser
  const [deviceType, setDeviceType] = useState('Desktop')
  const dispatch = useDispatch()

  const { isLogged } = useSelector(({ user }) => user)
  useEffect(() => {
    if (isMobile) setDeviceType('Mobile')
    else if (isTablet) setDeviceType('Tablet')

  }, [isMobile, isTablet])

  const [isWarningVisible, setIsWarningVisible] = useState(false)

  function handleOnLogout(e) {
    e.preventDefault()
    screen.disableScroll()
    setIsWarningVisible(true)
  }

  function logout() {
    dispatch(clearUser())
    setIsWarningVisible(false)
    screen.enableScroll()
  }



  return (
    <>
      {
        isWarningVisible ?
          <div className={styles.warningContainer}>

            <div className={styles.warning}>
              <h2> <span className='purple'>L</span>OGOUT</h2>
              <div className={styles.text}> Are you sure you want to log out?  </div>
              <div className={styles.warningButtons}>
                <button onClick={(e) => {
                  e.preventDefault()
                  screen.enableScroll()
                  setIsWarningVisible(false)
                }} className={styles.deviationBtn}

                >Cancel</button>
                <button onClick={logout} className={styles.confirmationBtn}>Log out</button>
              </div>

            </div>
          </div>

          : null
      }
      <aside>
        {isLogged ?
          <>

            <div className={styles.imageWrapper}>
              <img
                src={avatar}>
              </img>
            </div>
            <div className={styles.user}>
              <h3 className={styles.nick}>Nick: {name}</h3>
              <div className={styles.role}>Role: {role}</div>
              <div className={styles.device}>Device type: {deviceType}</div>
              <div className={styles.email}>Your email: {email}</div>
            </div>
            <button
              onClick={handleOnLogout}
              className={styles.logout}

            >Logout</button>
          </> : <div className={styles.login}>LOG IN!</div>}
      </aside>
    </>
  )
}
Aside.propTypes = {
  currentUser: PropTypes.object,
}

export default Aside