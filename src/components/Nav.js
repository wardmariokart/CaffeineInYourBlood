import { NavLink } from 'react-router-dom';
import { ROUTES } from '../consts/index.js';
import styles from '../css/nav.module.css'

const Nav = () => {
    return (
        <>
            <nav>
                <ul className={`${styles.unstyledList} ${styles.navList}`}>
                    <li>
                        <NavLink className={styles.primaryLink}  exact strict to={ROUTES.HOME}>
                            <h1 className={styles.header}>
                                <span className={styles.headerTitle}>how much</span>
                                <span className={styles.headerAccent}>caff<br/>eine</span>
                                <span className={styles.headerTitle}>is in my blood</span>
                            </h1>
                        </NavLink>
                    </li>
                    <div className={styles.navSecondary}>
                        <li>
                            <NavLink className={styles.secondaryLink} activeClassName={styles.active} to={ROUTES.PRESETS}>presets</NavLink>
                        </li>

                        <li>
                            <NavLink className={styles.secondaryLink} activeClassName={styles.active} to={ROUTES.ABOUT}>about</NavLink>
                        </li>
                    </div>

                </ul>
            </nav>
        </>
    );
}

// bind right cmd to a new kind of button so it doesn't overrule cmd

export default Nav;