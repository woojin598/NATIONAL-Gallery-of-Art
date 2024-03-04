import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    const location = useLocation();
    const isAboutPage = location.pathname === '/about';

    const footerClass = isAboutPage ? styles.fixedFooter : styles.footer;

    return (
        <footer className={footerClass}>
            <div className={styles.container}>
                <p>© 2023 National Gallery of Art. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
