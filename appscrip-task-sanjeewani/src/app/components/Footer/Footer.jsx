import React from "react";
import styles from "./Footer.module.css"; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-column']}>
        <h2>BE THE FIRST TO KNOW</h2>
        <p>Sign up for updates from mettä muse.</p>
        <div>
          <input
            type="email"
            placeholder="Enter your e-mail..."
            className={styles['footer-input']}
          />
          <button>SUBSCRIBE</button>
        </div>
      </div>

      <div className={styles['footer-column']}>
        <h2>CONTACT US</h2>
        <p>+44 221 133 5360</p>
        <p>customercare@mettamuse.com</p>
        <p>CURRENCY: USD</p>
      </div>

      <div className={styles['footer-column']}>
        <h2>QUICK LINKS</h2>
        <ul className={styles['footer-links']}>
          <li>Orders & Shipping</li>
          <li>Join/Login as a Seller</li>
          <li>Payment & Pricing</li>
          <li>Return & Refunds</li>
          <li>FAQs</li>
        </ul>
      </div>

      <div className={styles['footer-column']}>
        <h2>FOLLOW US</h2>
        <p>Social Icons Here</p>
        <img src="/path/to/payment-logos.png" alt="Payment Logos" />
      </div>
    </footer>
  );
};

export default Footer;
