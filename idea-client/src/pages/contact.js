import React from 'react';
import { NavBar } from '../components/NavBar';
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import Can from "../components/Can";

const ContactPage = () => {

  return (
    <AuthConsumer>
    {({user}) => (
      <Can
          role={user.role}
          perform="dashboard-page:visit"
          yes={() => (
  <React.Fragment>
    <NavBar /><br></br>
    <h2>Contact Us</h2>
    <p> </p>
        <div className="row">
          <div className="col-lg-6">
            <div className="recent">
              <h5>Send us a message</h5>
            </div>

            {/* <form action="" method="post" role="form" className="contactForm"> */}
              <form>
              <div className="form-group">
                <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                <div className="validation"></div>
              </div>
              <div className="form-group">
                <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                <div className="validation"></div>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                <div className="validation"></div>
              </div>
              <div className="form-group">
                <textarea className="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                <div className="validation"></div>
              </div>

              <div className="text-center"><button type="submit" className="btn btn-primary btn-lg">Send Message</button></div>
            </form>
          </div>

          <div className="col-lg-6">
            <div className="recent">
              <h5>Get in touch with us</h5>
            </div>
            <div className="">
              <p>Final Year Project 2
                / Luqman Hakim</p>

              <h5>Address:</h5>
              <p>University of Malaya</p>
              <h5>Telephone:</h5>
              <p>+60143695120</p>
            </div>
          </div>
        </div>

    {/* <Link to="/"><img src ={logo} alt="Logo" /></Link>
    <h4>Developer </h4>
    <p> </p>
    <p>Luqman Hakim - luqmanhakimomar98@gmail.com</p>
    <p>Danial Harith - danialharithzx@gmail.com</p>
    <a
      classNameName="UM-link"
      href="https://www.um.edu.my"
      target="_blank"
      rel="noopener noreferrer"
    >
      University Of Malaya
    </a> */}
  </React.Fragment>
                  )}
                  no={() => <Redirect to="/" />}
              />
          )}
  </AuthConsumer>
)
}
export default ContactPage;