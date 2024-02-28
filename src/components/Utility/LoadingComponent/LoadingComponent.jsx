import styles from './loading.module.scss'

function Loading() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.loader}></span>


    </div>
  )
}

export default Loading