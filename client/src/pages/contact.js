import React from 'react';
// import{ init } from 'emailjs-com';
import emailjs from 'emailjs-com';
import conf from '../private/email';
// import '../style/contact.css';
class Contact extends React.Component {
    constructor(props) {
      super(props);
      this.state = { message: '', name: '', email: '' };
      this.handleChangeMessage = this.handleChangeMessage.bind(this);
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    render() {
      return (  <section id="contact" className="parallax-section">
    
        
        <div className="container">
            <div className="row">

                <div className="col-md-12 col-sm-12">
                
                    <div className="wow fadeInUp section-title" data-wow-delay="0.2s">
                        <h2>Get in touch</h2>
                        <p>Let us know what you have.</p>
                    </div>
                </div>

                <div className="col-md-7 col-sm-10">
                
                    <div className="wow fadeInUp" data-wow-delay="0.4s">
                        <form id="contact-form" >
                            <div className="col-md-6 col-sm-6">
                                <input value={this.state.from_name} type="text" onChange={this.handleChangeName}  className="form-control" name="from_name" placeholder="Name" required/>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <input value={this.state.email} type="email" onChange={this.handleChangeEmail} className="form-control" name="email" placeholder="Email" required/>
                            </div>
                            <div className="col-md-12 col-sm-6">
                                <textarea value={this.state.message} onChange={this.handleChangeMessage} className="form-control" rows="5" name="message" placeholder="Message" required></textarea>
                            </div>
                            <div className="col-md-offset-8 col-md-4 col-sm-offset-6 col-sm-6">
                               
                                <input style={{marginBottom: "130px"}} type="button" id="submit" value="Send Message" className="form-control" onClick={this.handleSubmit} />
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-md-5 col-sm-8">
                
                    <div className="wow fadeInUp contact-info" data-wow-delay="0.4s">
                        <div className="section-title">
                            <h2>Contact Info</h2>
                            <p>It's easy to contact us! You can just add your name, email and message for any support, billing, business development, or sales questions.</p>
                        </div>

                        <p><i className="fa fa-map-marker"></i>Street 22000, Gaza City, Palestine</p>
                        <p><i className="fa fa-comment"></i> <a href="mailto:hassansammoer@gmail.com">hassansammoer@gmail.com</a></p>

                    </div>
                </div>

            </div>
        </div>
    </section> 
      )
    }
  
    handleChangeMessage(event) {
      this.setState({message: event.target.value})
    }
  
    handleChangeName(event) {
        this.setState({name: event.target.value})
    }
      
    handleChangeEmail(event) {
        this.setState({email: event.target.value})
    }
 
    handleSubmit (event) {
        event.preventDefault();
        const templateId = conf.templateId;
    
        this.sendFeedback(templateId, {message: this.state.message, from_name: this.state.name, reply_to: this.state.email})
      }
    
      sendFeedback (templateId, variables) {
        emailjs.send(
            conf.email, templateId,
          variables,conf.userId
          ).then(res => {
            alert('Email successfully sent!',res)
          })
          .catch(err => alert('Oh well, you failed. Here some thoughts on the error that occured:', err))
      }
  }
  export default Contact;