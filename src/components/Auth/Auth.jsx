import { useState } from 'react';
import styles from './auth.module.scss'
import PropTypes from 'prop-types'

import { screen } from '../../functions/Screen';
import { checkEmail, clearWarningMessage, createUser, hideForm, loginUser } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_FORM, REGISTER_FORM } from './constant';
import { useResize } from '../../hooks/useResize';




function Auth() {

  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    avatar: "",
  })

  const { name, password, email, avatar } = values

  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const dispatch = useDispatch()


  const validatePassword = (value) => {
    if (value.length <= 6) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const { isEmailAvailable } = useSelector(({ user }) => user)
  const [showEmailError, setShowEmailError] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    dispatch(checkEmail({ "email": email }))

    setTimeout(() => console.log(isEmailAvailable), 0)
    if (emailRegex.test(email) && !isEmailAvailable) {
      setShowEmailError(true)
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };


  const handleSubmitRegister = (e) => {
    e.preventDefault()

    validatePassword(password)
    validateEmail(email)
    if (!isEmailAvailable) return
    const isNotEmpty = Object.values(values).every(val => val)
    if (!isNotEmpty) return
    if (!passwordError && !emailError) {
      dispatch(createUser(values))
      setValues({
        name: "",
        password: "",
        email: "",
        avatar: "",
      })
    }
  };
  const handleSubmitLogin = (e) => {

    e.preventDefault();
    validatePassword(password);
    validateEmail(email);

    if (!passwordError && !emailError) {
      dispatch(loginUser({ "email": email, "password": password, }))
      setValues({
        name: "",
        password: "",
        email: "",
        avatar: "",
      })
    }
  };
  const handleOnExit = (e) => {
    e.preventDefault()
    screen.enableScroll()
    dispatch(hideForm())
    dispatch(clearWarningMessage())
  }

  const [typeOfForm, setTypeOfForm] = useState(REGISTER_FORM)
  const { width } = useResize()
  return (

    <div className={styles.container}>
      {typeOfForm === LOGIN_FORM ?
        <form
          className={styles.wrapper}
          onSubmit={handleSubmitLogin}>
          <div className={styles.xMark} onClick={handleOnExit}><i className='bi bi-x'></i></div>
          <h2><span className='purple'>L</span>OGIN <span className='purple'>F</span>ORM</h2>
          <label>
            Email:
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              required
            />
          </label>
          <div className={styles.submit}>
            <button type="submit">Login</button>
            <div className={styles.toggleForm} onClick={() => setTypeOfForm(REGISTER_FORM)}>{`have an account?`}</div>
          </div>

        </form>
        :
        <form
          className={styles.wrapper}
          onSubmit={handleSubmitRegister}>
          <h2><span className='purple'>R</span>EGISTRATION</h2>

          <div className={styles.xMark} onClick={handleOnExit}><i className='bi bi-x'></i></div>
          {width > 514 ? <div className={styles.authContainer}>
            <label>
              Username:
              <input
                type="text"
                placeholder="Your Username"
                value={name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                required
              />
            </label>

            <label>
              Password:
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setValues({ ...values, password: e.target.value })}
                required
              />
            </label>
          </div>
            :
            <><label>
              Username:
              <input
                type="text"
                placeholder="Your Username"
                value={name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                required
              />
            </label>

              <label>
                Password:
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setValues({ ...values, password: e.target.value })}
                  required
                />
              </label></>}

          <label>
            Email:
            <input
              className={showEmailError ? styles.emailIsNotAvailable : null}
              onClick={() => { setShowEmailError(false) }
              }
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required
            />
          </label>

          <label>
            Avatar:
            <input
              type="url"
              placeholder="Write here your url..a"
              value={avatar}
              onChange={(e) => setValues({ ...values, avatar: e.target.value })}
              required
            />
          </label>
          {showEmailError ? <div
            className={styles.errorMessage}
          >
            {emailError}
          </div> : null}
          {width > 514 ?
            <div className={styles.submit}>
              <button type="submit">Register</button>
              <div className={styles.toggleForm} onClick={() => {
                dispatch(clearWarningMessage())
                setTypeOfForm(LOGIN_FORM)
              }}>already registered?
              </div>
            </div>
            :
            <>
              <button type="submit">Register</button>
              <div className={styles.submit}>

                <div className={styles.toggleForm} onClick={() => {
                  dispatch(clearWarningMessage())
                  setTypeOfForm(LOGIN_FORM)
                }}>already registered?
                </div>
              </div>
            </>
          }

        </form>}

    </div>

  )
}
Auth.propTypes = {
  isFormVisible: PropTypes.bool,
  isLogged: PropTypes.bool,

  setIsFormVisible: PropTypes.func,
}
export default Auth