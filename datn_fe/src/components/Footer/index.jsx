import React from 'react';
import './index.css';
import fb from '../../assets/images/fbimg.png';
import twitter from '../../assets/images/twitterimg.png';
import linkedin from '../../assets/images/linkedinimg.png';
import insta from '../../assets/images/instaimg.png';

const Footer = () => {
    return (
        <div className="footer">
            <div className="sb__footer section__padding">
                <div className="sb__footer-links">
                    <div className="sb__footer-links_div">
                        <h4>For Business</h4>
                        <a href="/employer">
                            <p>Employer</p>
                        </a>
                        <a href="/healthplan">
                            <p>Health Plan</p>
                        </a>
                        <a href="/individual">
                            <p>Individual</p>
                        </a>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Resources</h4>
                        <a href="/resources">
                            <p>Resource Center</p>
                        </a>
                        <a href="/resources">
                            <p>Testimonials</p>
                        </a>
                        <a href="/resources">
                            <p>STV</p>
                        </a>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Partners</h4>
                        <a href="/swingtech">
                            <p>Swing Tech</p>
                        </a>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Company</h4>
                        <a href="/about">
                            <p>About</p>
                        </a>
                        <a href="/press">
                            <p>Press</p>
                        </a>
                        <a href="/career">
                            <p>Career</p>
                        </a>
                        <a href="/contact">
                            <p>Contact</p>
                        </a>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Coming soon on</h4>
                        <div className="socialmedia">
                            <p><img src={fb} alt="Facebook" /></p>  {/* Sửa alt */}
                            <p><img src={twitter} alt="Twitter" /></p>
                            <p><img src={linkedin} alt="LinkedIn" /></p>
                            <p><img src={insta} alt="Instagram" /></p>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="sb__footer-below">
                    <div className="sb__footer-copyright">
                        <p>
                            @{new Date().getFullYear()} CodeInn. All rights reserved.
                        </p>
                    </div>
                    <div className="sb__footer-below-links">
                        <a href="/terms">
                            <div><p>Terms & Conditions</p></div>
                        </a>
                        <a href="/privacy">
                            <div><p>Privacy</p></div>
                        </a>
                        <a href="/security">
                            <div><p>Security</p></div>
                        </a>
                        <a href="/cookie">
                            <div><p>Cookie Declaration</p></div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
