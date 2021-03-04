import { NavLink } from 'react-router-dom';
import { ROUTES } from '../consts/index.js';
import styles from '../css/nav.module.css'

const Nav = () => {
    return (
        <>
            <nav>
                <ul className={`${styles.unstyledList} ${styles.navList}`}>
                    <li>
                        <NavLink className='nav-link' to={ROUTES.PRESETS}>presets</NavLink>
                    </li>
                    <li>
                        <NavLink className='nav-link' to={ROUTES.ADVANCED}>advanced</NavLink>
                    </li>
                    <li>
                        <NavLink className={styles.navLink} exact strict to={ROUTES.HOME}>
                            <header className={styles.header}>
                                <span>how much</span>
                                <span className={styles.headerAccent}>caff<br/>eine</span>
                                <span>is in my blood</span>
                            </header>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className='nav-link' to={ROUTES.ABOUT}>about</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}

// bind right cmd to a new kind of button so it doesn't overrule cmd

export default Nav;