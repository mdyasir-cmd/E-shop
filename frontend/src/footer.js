import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">
          {/* About Us */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="mb-4">About Us</h5>
            <p className="text-muted">
              We are a leading e-commerce platform offering a wide range of products at competitive prices. Our mission is to provide our customers with the best online shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/shop" className="text-white-50">Shop</Link>
              </li>
              <li>
                <Link to="/about" className="text-white-50">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white-50">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-white-50">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="mb-4">Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://facebook.com" className="text-white-50">
                  <i className="fab fa-facebook-f me-2"></i>Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-white-50">
                  <i className="fab fa-twitter me-2"></i>Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-white-50">
                  <i className="fab fa-instagram me-2"></i>Instagram
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" className="text-white-50">
                  <i className="fab fa-linkedin me-2"></i>LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="mb-4">Contact Us</h5>
            <ul className="list-unstyled text-white-50">
              <li>
                <i className="fas fa-map-marker-alt me-2"></i>123 E-Shop St, City, Country
              </li>
              <li>
                <i className="fas fa-phone me-2"></i>+123 456 7890
              </li>
              <li>
                <i className="fas fa-envelope me-2"></i>support@eshop.com
              </li>
            </ul>
          </div>
        </div>
        <hr className="mb-4" />
        <div className="row">
          <div className="col text-center">
            <p className="mb-0">© 2024 E-Shop. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
