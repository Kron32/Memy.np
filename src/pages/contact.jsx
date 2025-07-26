import React from 'react';
import '../style/contact.css';
import image from "../jpg/Aashika.jpg";
import image1 from "../jpg/Kapil.jpg";
import image2 from "../jpg/Kailash.jpg";



export default function Contact() {
  const teamMembers = [
    {
      name: "Kapil Sharma",
      email: "ks3691987@gmail.com",
      phone: "9828040784",
      image: image1,
    },
    {
      name: "Aashika Giri",
      email: "giriaashika92@gmail.com",
      phone: "9765407172",
      image: image,
    },
    {
      name: "Kailash Shrestha",
      email: "kailashstha100@gmail.com",
      phone: "9741768194",
      image: image2,
    },
  ];

  return (
    <div className="contact-wrapper">
      <h2>Contact Us</h2>
      <p className="contact-intro">
        Have questions or feedback? We'd love to hear from you!
      </p>

      <div className="contact-main">
        {/* Contact Form */}
        <div className="contact-form">
          <label>Name*</label>
          <input type="text" placeholder="Your full name" />

          <label>Email*</label>
          <input type="email" placeholder="you@example.com" />

          <label>Message*</label>
          <textarea placeholder="Write your message here" />

          <button className="send-button">Send Message</button>
        </div>

        {/* Team Section */}
        <div className="contact-team">
          <h3>Our Team</h3>
          <div className="team-members">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <img src={member.image} alt={member.name} />
                <h4>{member.name}</h4>
                <p><strong>Email:</strong> {member.email}</p>
                <p><strong>Phone:</strong> {member.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

