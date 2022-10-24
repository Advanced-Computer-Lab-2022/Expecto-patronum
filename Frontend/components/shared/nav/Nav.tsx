import React from "react";
import styles from "./Nav.module.scss";

type Props = {};

const Nav = (props: Props) => {
  return (
    <div className={styles.NavContainer}>
      <div className={styles.NavLeft}>Logo</div>
      <div className={styles.NavMid}>
        <ul className={styles.NavItems}>
          <li>Home</li>
          <li>Courses</li>
          <li>About Us</li>
        </ul>
      </div>
      <div className={styles.NavRight}>
        <p>Country</p>
        <button>Login</button>
        <button>Sign up</button>
      </div>
    </div>
  );
};

export default Nav;
