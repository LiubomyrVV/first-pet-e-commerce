import styles from './poster.module.scss'
import PropTypes from 'prop-types'



function Poster({ posterId = 0 }) {
  return (
    <div style={{
      backgroundImage: `url(${(POSTERS[posterId])})`,
      backgroundPosition: `center`
    }} id={styles.container}>
      <div>POSTER {posterId}</div>

    </div>
  )
}
const POSTERS = {
  0: '/posters_0.jpg',
  1: '/posters_1.jpg',
  2: '/posters_2.jpg',
  3: '/posters_3.jpg',
}
Poster.propTypes = {
  posterId: PropTypes.number,
}

export default Poster