import React from 'react';
import styles from './Main.module.css';


function Main() {
  return (
    <div className={`${styles.mainContainer} ${styles['background-image']}`}>
      <div className={styles["background-one"]}>
        <div className={styles["link-container"]}>
          <a className={styles["link-one"]}>Explore</a>
        </div>
      </div>
      <div className={`${styles["background-two"]} ${styles["link-container"]}`}>
        <a className={styles["link-two"]}>Artistic</a>
      </div>
      <div className={`${styles["background-three"]} ${styles["link-container"]}`}>
        <a className={styles["link-three"]}>Journeys</a>
      </div>
    </div>
  );
}

export default Main;
