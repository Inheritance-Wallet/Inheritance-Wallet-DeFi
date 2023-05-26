import React, { useState } from "react";
import Head from "next/head";
import Footer from "./api/Footer";
import useWeb3 from "@/hooks/useWeb3";

const Chainlink = () => {
  const { wallet } = useWeb3();

  const walletConnect = () => {
    wallet.connect();
  };

  const CustomHead = () => (
    <Head>
      <title>Chainlink 2023</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.7.4-rc.1/web3.min.js"></script>
      <link rel="stylesheet" href="styles.css" />
      <script src="app.js"></script>
    </Head>
  );

  const CustomFooter = () => (
    <Footer>
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
            <li>
              <a href="#cookies-policy">Cookies Policy</a>
            </li>
            <li>
              <a href="#terms-of-services">Terms Of Service</a>
            </li>
            <li>
              <a href="#support">Support</a>
            </li>
          </ul>
        </div>
        <div className="column links">
          <h3>Contact Us!</h3>
          <ul>
            <li>
              <a href="#faq">F.A.Q</a>
            </li>
            <li>
              <a href="#cookies-policy">Contact</a>
            </li>
          </ul>
        </div>
        <div className="column subscribe">
          <h3>Newsletter</h3>
          <div>
            <input
              type="email"
              placeholder="Your email here"
              className="Email"
            />
            <button className="SubscribeButton" id="subscribeButton" type="submit">Subscribe</button>
          </div>
        </div>
        <p>Copyright &copy; 2023 Inheritance Wallet</p>
      </div>
    </Footer>
  );

  return (
    <div>
      <CustomHead />
      <div className="header">
        <a className="logo">Inheritance Wallet</a>
        <div className="header-right">
          <a href="index.html" className="home">
            Home
          </a>
          <a href="contact.html" className="contact">
            Contact
          </a>
          <a className="active"> Contact Wallet </a>
          <div>
            {!wallet.address ? <div></div> : <div>{wallet.address}</div>}
          </div>
        </div>
      </div>
      <hr />
      <div className="title-container">
        <div className="title-wrapper">
          <h1 className="title dont">Don't</h1>
          <h1 className="title let">Let Your</h1>
          <h1 className="title wallet">Assets</h1>
          <h1 className="title die">Die</h1>
          <div>
            <button className="withdraw-button"> Withdraw </button>
            <button className="deposit-button"> Deposit </button>
            <button className="main-button"> Choose Guardian </button>
          </div>
        </div>
        <img src="images/blockchain1.png" alt="" className="svgImag" />
      </div>
      <div>
        <article>
          <h1 className="slogan">
            Guarantee Your Inheritance Now.
            <span className="sloganThink"> Think</span>
            <span className="sloganDie"> Die</span> Later.
          </h1>
          <p className="slogan2">
          <img src="images/blockchain1.png" alt="" className="svgImag3" />

            Our aim is protecting your crypto assets even when you die. We all
            gonna make it and when we make it, we not gonna lose it.
          </p>
          <p className="slogan3">
            Choose the people who will take your crypto assets, don't let death
            <span className="sloganThink"> fool you.</span>
            <span className="sloganDie"> take over all you had.</span>
          </p>
        </article>
      </div>
      <br />
      <br />
      <img src="images/blockchain1.png" alt="blockchain bg" className="svgImag2" />
      <hr></hr>
      <CustomFooter />
      <hr />
    </div>
    
  );
};
export default Chainlink;
