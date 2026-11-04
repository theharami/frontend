import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import "../style/contact.css";

export default function Contact() {
  return <div className="contact-page">
    <section className="contact-hero">
      <span className="eyebrow">WE'D LOVE TO MEET YOU</span>
      <h1>Let's make it<br/><em>personal.</em></h1>
      <p>Visit our boutique, ask us a question, or book a private jewellery viewing.</p>
      </section>
      
    <section className="contact-layout">
      <div className="contact-info">
        <div className="contact-info-item">
          <MapPin/><div><small>VISIT OUR BOUTIQUE</small>
          <b>Shree Mati jeweles, </b>
          <span>Sehore, Madhya Pradesh, India</span>
           </div>
      </div>

        <div className="contact-info-item">
          <Phone/>
          <div>
          <small>CALL OR WHATSAPP</small>
          <b>+91 9575045471</b>
          <span>Mon – Sat, 10:30 AM – 8:00 PM</span>
           </div>
      </div>

        <div className="contact-info-item">
          <Mail/>
          <div>
          <small>WRITE TO US</small>
          <b>hello@jewels.in</b>
          <span>We usually reply within one business day.</span>
           </div>
        </div>

        <div className="contact-info-item">
          <Clock/>
        <div><small>OPENING HOURS</small>
        <b>Monday – Saturday</b><span>10:30 AM – 8:00 PM · Sunday by appointment</span>
        </div>
      </div>
        <a className="contact-whatsapp"
         href="https://wa.me/9195755045471?text=Hello%20Élan%20Jewels%2C%20I%20would%20like%20to%20know%20more." 
         target="_blank" 
         rel="noreferrer">Chat with us on WhatsApp <ArrowUpRight size={17}/></a>
      </div>

      <div className="map-wrap">
        <iframe title="soubhagya shree jewellers" 
        src="https://www.google.com/maps?q=%jewellery%20shopC%20sehore%2C%20Madhya%20Pradesh&output=embed"
         loading="lazy" 
         referrerPolicy="no-referrer-when-downgrade"/>
         <div className="map-caption">FIND US IN SEHORE 
          <span> Madhya Pradesh</span></div></div>
    </section>

    <section className="contact-note">
    <h2>A little something <em>personal.</em></h2>
    <p>For custom orders, sizing support, or a special occasion, our team is happy to help you find just the right piece.</p>
    </section>
  </div>;
}
