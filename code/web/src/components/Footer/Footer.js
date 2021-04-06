import React from 'react'

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';


import './style.css'

const Footer = () => {
    return (
        <div>
            <div class="footer__container">
                <div class="footer__links">
                    <div class="footer__link--wrapper">
                        <div class="footer__links--items">
                            <h2>About Us</h2>
                            <a href="/">How it works</a>
                            <a href="/">Testimonials</a>
                            <a href="/">Terms of Service</a>
                            <a href="/">Careers</a>
                        </div>
                        <div class="footer__links--items">
                            <h2>Contact Us</h2>
                            <a href="/">Admin Messenger</a>
                            <a href="/">Phone</a>
                            <a href="/">Email</a>
                            <a href="/">More Info</a>
                            <a href="/">Careers</a>
                        </div>
                    </div>
                </div>
                <div class="social__media">
                    <div class="social__media--wrap">
                        <div class="footer__logo">
                            <a href="/" id="footer__logo"><i class="fas faa-gem"></i>TASKIT</a>
                        </div>
                        <p class="website__right"> © TASKIT 2021. All rights reserved</p>
                        <div class="social__icons">
                            <a href="/" class="social__icon--link" target = "_blank">
                                <FacebookIcon fontSize="large"/>
                            </a>
                            <a href="/" class="social__icon--link" target = "_blank">
                                <TwitterIcon fontSize="large"/>
                            </a>
                            <a href="/" class="social__icon--link" target = "_blank">
                                <InstagramIcon fontSize="large"/>
                            </a>
                            <a href="/" class="social__icon--link" target = "_blank">
                                <LinkedInIcon fontSize="large"/>
                            </a>
                            <a href="/" class="social__icon--link" target = "_blank">
                                <GitHubIcon fontSize="large"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
