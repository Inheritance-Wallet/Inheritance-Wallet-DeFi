import React from 'react';


const Footer = () => {
    return (
        <div className="row primary">
            <div className="column about">
                <h3>Inheritance Wallet</h3>
                <p>Don't let death fool you!</p>
                <div className="social">
                    <i className="fa-brands fa-facebook-square"></i>
                    <i className="fa-brands fa-instagram-square"></i>
                    <i className="fa-brands fa-twitter-square"></i>
                    <i className="fa-brands fa-youtube-square"></i>
                    <i className="fa-brands fa-whatsapp-square"></i>
                </div>
            </div>
            <div className="column links">
                <h3>Some Links</h3>
                <ul>
                    <li><a href="#cookies-policy">Cookies Policy</a></li>
                    <li><a href="#terms-of-services">Terms Of Service</a></li>
                    <li><a href="#support">Support</a></li>
                </ul>
            </div>
            <div className="column links">
                <h3>Contact Us!</h3>
                <ul>
                    <li><a href="#faq">F.A.Q</a></li>
                    <li><a href="#cookies-policy">Contact</a></li>
                </ul>
            </div>
            <div className="column subscribe">
                <h3>Newsletter</h3>
                <div>
                    <input type="email" placeholder="Your email here" className='Email' />
                    <button>Subscribe</button>
                </div>
            </div>
            <p>Copyright &copy; 2023 Inheritance Wallet</p>
        </div>
    );
}

export default Footer;