// == Import npm
import React from 'react';

// == Import
import './deleteAccount.scss';

// == Composant
const deleteAccount = () => (
  <section className="deleteaccount-section">
    <h2 className="deleteaccount-title">Suppression de compte</h2>
    <p>Pour supprimer votre compte HungryTruck,<br />veuillez renseigner votre mot de passe.</p>
    <form className="deleteaccount-form">
      <label className="deleteaccount-label" htmlFor="password">
        <input className="deleteaccount-input" type="password" name="password" placeholder="Votre mot de passe" />
      </label>
      <button type="submit" className="deleteaccount-form--submit">Supprimer mon compte HungryTruck</button>
    </form>
    <button type="button" className="deleteaccount-cancel">Retourner à mon compte</button>
  </section>
);

// == Export
export default deleteAccount;