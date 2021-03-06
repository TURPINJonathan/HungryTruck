// == Import npm
import React from 'react';
import emailjs from 'emailjs-com';

// == Import
import './contact.scss';

// == Composant
const Contact = ({ mail, message, contactUs }) => {
  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm('hungrytruckfood', 'template_06ginqm', e.target, 'user_jkTO4yOQ5IAOMyH6GqmOM')
      .then((response) => {
        console.log(response.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset();
  }

  return (
    <section id="contact">
      <h2 id="contact-title">Contactez-nous</h2>
      <article>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendEmail(e);
          }}
        >
          <p>Vous souhaitez nous adresser un message ?</p>
          <label htmlFor="mail">
            Veuillez renseigner votre adresse mail :
            <input
              id="contact-mail--input"
              type="text"
              name="mail"
              placeholder="exemple : john@deuf.fr"
              value={mail}
              onChange={(e) => {
                contactUs(e.target.value, 'mail');
              }}
            />
          </label>
          <label htmlFor="message">
            Quel message souhaitez vous nous adresser ?
            <textarea
              id="contact-textarea"
              name="message"
              type="text"
              placeholder="Ecrivez votre message ici"
              minLength="20"
              value={message}
              onChange={(e) => {
                contactUs(e.target.value, 'message');
              }}
            />
          </label>
          <div id="contact-form-submit">
            <button id="contact-form--button" type="submit">
              Envoyer mon message
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

// == Export
export default Contact;
