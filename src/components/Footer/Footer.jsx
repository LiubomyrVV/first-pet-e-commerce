import { useResize } from '../../hooks/useResize'
import styles from './footer.module.scss'

const Footer = () => {
  const { width } = useResize()
  return (
    <footer className={styles.container}>
      <div className={styles.logo}>
        <h1><span className='purple'>V</span>Shop</h1>
      </div>
      {width > 452 ? <h2 className={styles.title}>developed by liubomyr {`<3`}</h2> : null}

      <ul className={styles.socials}>
        <li><i id={styles.instagram} className="bi bi-instagram"></i></li>
        <li><i id={styles.facebook} className="bi bi-facebook"></i></li>
        <li><i id={styles.youtube} className="bi bi-youtube"></i></li>
      </ul>
    </footer>
  )
}

export default Footer