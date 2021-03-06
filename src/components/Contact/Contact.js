import React from 'react'
import './Contact.css'

const Contact = () => (
    <div name="ContactSection" className="ContactGroup">
        <div>
            <p className="brand-title">Get In Touch</p>
        </div>
        <div className="contact-container">
            <form name="contact_colin" className="form" method="POST" netlify-honeypot="bot-field" data-netlify="true">
                <input type="hidden" name="form-name" value="contact_colin" />
                <div className="detail-wrapper">
                    <p className="text-field text1">
                        <input type="text" name="name" placeholder="Name" id="name" required/>
                    </p>
                    <p className="text-field text2">
                        <input type="email" name="email" placeholder="Email" id="email" required/>
                    </p>
                </div>
                <p className="full">
                    <textarea name="message" rows="5" placeholder="Message" id="message"></textarea>
                </p>
                <p className="full">
                    <button type="submit">Submit</button>
                </p>
            </form>

            <div className="contact-section">
                <p className="descr">Looking forward to hearing from you!</p>
                <p className="email">nguyencolin95@gmail.com</p>
                <div className="alert">Your message has been sent</div>
            </div>
        </div>
    </div>
)

export default Contact