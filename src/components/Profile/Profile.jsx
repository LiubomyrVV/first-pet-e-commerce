import { useResize } from '../../hooks/useResize';
import styles from './profile.module.scss';

const Profile = () => {
  const { width } = useResize()
  if (width <= 848) return

  return (
    <div className={styles.wrapper}>
      Welcome Home
    </div>
  )
}

export default Profile