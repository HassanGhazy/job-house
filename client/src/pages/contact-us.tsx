import emailjs from 'emailjs-com';
import { useState } from "react";
import success from './global-widget/my-swal'
(function () {
    const link = document.createElement("link");
    link.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css";
    link.rel = "stylesheet";
    document.body.appendChild(link);
})();
const ContactUs = () => {
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleChangeMessage = (event: any) => {
        setMessage(event.target.value);
    }

    const handleChangeName = (event: any) => {
        setName(event.target.value);
    }

    const handleChangeEmail = (event: any) => {
        setEmail(event.target.value)
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        sendFeedback({ message: message, from_name: name, reply_to: email });
        setMessage("");
        setName("");
        setEmail("");
    }

    const sendFeedback = (variables: any) => {
        emailjs.send(
            process.env.REACT_APP_EMAIL_ID!, process.env.REACT_APP_EMAIL_TEMPLATE_ID!,
            variables, process.env.REACT_APP_EMAIL_USER_ID
        ).then(res => {
            success();
        })
            .catch(err => alert('Oh well, you failed. Here some thoughts on the error that occured:\n' + err))
    }

    return (<section id="contact" className="parallax-section">


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
                            <div style={{margin: 10}} className="col-md-6 col-sm-6">
                                <input value={name} type="text" onChange={handleChangeName} className="form-control" name="from_name" placeholder="Name" required />
                            </div>
                            <div style={{margin: 10}} className="col-md-6 col-sm-6">
                                <input value={email} type="email" onChange={handleChangeEmail} className="form-control" name="email" placeholder="Email" required />
                            </div>
                            <div style={{margin: 10}} className="col-md-12 col-sm-6">
                                <textarea value={message} onChange={handleChangeMessage} className="form-control" rows={5} name="message" placeholder="Message" required></textarea>
                            </div>
                            <div style={{margin: 10}} className="col-md-offset-8 col-md-4 col-sm-offset-6 col-sm-6">

                                <input style={{ marginBottom: "130px" }} type="button" id="submit" value="Send Message" className="form-control" onClick={handleSubmit} />
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
                        <p><i className="fa fa-comment"></i> <a href="mailto:abdallahaboabdo5@gmail.com">abdallahaboabdo5@gmail.com</a></p>
                        <p><i className="fa fa-comment"></i> <a href="mailto:mohammedAl-habbash@gmail.com">mohammedAl-habbash@gmail.com</a></p>

                    </div>
                </div>

            </div>
        </div>
    </section>
    );



}
export default ContactUs;