import { useState } from "react";
import Image from "next/image";
import styles from "./navbar.module.css";
import {
  Heart,
  Logo,
  Nav_logo,
  Profile,
  Search,
  Shoping_bag,
} from "../../images/navbar";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.topBarItem}>
            <Image src={Nav_logo} alt="Icon 1" width={20} height={20} />
            <p>Lorem ipsum dolor</p>
          </div>
          <div className={styles.topBarItem}>
            <Image src={Nav_logo} alt="Icon 2" width={20} height={20} />
            <p>Lorem ipsum dolor</p>
          </div>
          <div className={styles.topBarItem}>
            <Image src={Nav_logo} alt="Icon 3" width={20} height={20} />
            <p>Lorem ipsum dolor</p>
          </div>
        </div>
      </div>

      <div className={styles.logoContainer}>
        {/* Hamburger Menu for Mobile */}
        <div
          className={styles.hamburger}
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div
            className={
              isMobileMenuOpen ? `${styles.bar} ${styles.open}` : styles.bar
            }
          ></div>
          <div
            className={
              isMobileMenuOpen ? `${styles.bar} ${styles.open}` : styles.bar
            }
          ></div>
          <div
            className={
              isMobileMenuOpen ? `${styles.bar} ${styles.open}` : styles.bar
            }
          ></div>
        </div>
        <span className={styles.icon}>
          <Image src={Logo} alt="User" width={24} height={24} />
        </span>
        <div className={styles.logo}>
          <h1>LOGO</h1>
        </div>
        <div className={styles.navIcons}>
          <span className={styles.icon}>
            <Image src={Search} alt="Search" width={24} height={24} />
          </span>
          <span className={styles.icon}>
            <Image src={Heart} alt="Favorite" width={24} height={24} />
          </span>
          <span className={styles.icon}>
            <Image src={Shoping_bag} alt="Cart" width={24} height={24} />
          </span>
          <span className={styles.icon}>
            <Image src={Profile} alt="User" width={24} height={24} />
          </span>
          <span className={styles.icon}>ENG ▼</span>
        </div>
      </div>
      {/* Main Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.container}>
          {/*  Menu */}
          <ul
            className={`${styles.navMenu} ${
              isMobileMenuOpen ? styles.active : ""
            }`}
          >
            <li>Shop</li>
            <li>Skills</li>
            <li>Stories</li>
            <li>About</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </nav>
    </>
  );
}
