// == Import npm
import { Redirect } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import MapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

// == Import
import './newAccount.scss';

// == Composant
const NewAccount = ({
  nickname,
  email,
  password,
  passwordConfirm,
  siret,
  pictureUser,
  updateAddress,
  createPro,
  changeField,
  changeToggle,
  handleSubmit,
  tokenIsOk,
  findFood,
  foods,
  errorInscription,
  errorInscriptionText,
  handleError,
  loadCreateUser,
  changeIsLoading,
}) => {
  let title = 'Créer votre compte Utilisateur';
  let buttonCreateName = 'Créer mon compte Utilisateur';
  if (createPro) {
    title = 'Créer votre compte Pro';
    buttonCreateName = 'Créer mon compte Pro';
  }
  const MAPBOX_TOKEN = 'pk.eyJ1Ijoia2V5Z2VuOSIsImEiOiJja3NrNWh6MGQwczZnMnBsNHhqYnRtMDUxIn0.dq2MMs1vSwGk8nMIj9NTxQ';
  const [viewport, setViewport] = useState({
    latitude: 45.5,
    longitude: 2,
    zoom: 5.4,
  });
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    [],
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [],
  );

  useEffect(() => {
    findFood();
  }, []);

  let goodPictureUser = 'https://cdn.shopify.com/s/files/1/0563/4061/1245/files/4451366_meme-man-harold-thumbs-up-png-download_png_647a504f-091e-452f-aaad-20f6591c2821_600x600@2x.jpg?v=1619114473';
  if (pictureUser.length > 0) {
    console.log(pictureUser.length);
    goodPictureUser = pictureUser;
  }

  return (
    <main className="newaccount">
      <h1 className="newaccount-title">{title}</h1>
      <form
        className="newaccount-form"
        onSubmit={(evt) => {
          evt.preventDefault();
          if (password === passwordConfirm) {
            handleSubmit();
            changeIsLoading(true, 'createUser');
          }
          else {
            handleError('password');
          }
        }}
      >
        <div className="form-left">
          <img className="avatar" src={goodPictureUser} alt="Avatar" />
          <label className="form-label--avatar" htmlFor="avatar">Lien de votre image de profil*
            <input
              type="text"
              className="avatar-input"
              name="avatar"
              placeholder="https://kelapplication.com/image.png"
              value={pictureUser}
              onChange={(evt) => {
                changeField(evt.target.value, 'pictureUser');
              }}
            />
          </label>
        </div>
        <div className="form-right">
          { errorInscription
          && (
          <div className="show-error">
            <p className="show-error--text">{errorInscriptionText}</p>
          </div>
          )}
          <label className="field-label-pro" htmlFor="pro">Vous êtes professionnel
            <label className="switch">
              <input
                type="checkbox"
                name="pro"
                checked={createPro}
                onChange={() => {
                  changeToggle(!createPro, 'togglePro');
                }}
              />
              <span className="slider rounded" />
            </label>
          </label>
          <h2>Vos informations personnelles</h2>
          <p className="fields-legend"><span>* Champ obligatoire</span></p>
          <div className="all-fields">
            <div className="fields">
              <div className="fields-left">
                <div className="field">
                  <label className="field-label" htmlFor="email">Saisissez votre Email *
                    <div>
                      <input
                        className="field-input"
                        type="text"
                        name="email"
                        id="field-input--email"
                        placeholder="john.doeuf@gmail.com"
                        value={email}
                        onChange={(evt) => {
                          changeField(evt.target.value, 'email');
                        }}
                      />
                    </div>
                  </label>
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="pseudo">Saisissez votre Pseudo *
                    <div>
                      <input
                        className="field-input"
                        type="text"
                        name="pseudo"
                        id="field-input--pseudo"
                        placeholder="Poule"
                        value={nickname}
                        onChange={(evt) => {
                          changeField(evt.target.value, 'nickname');
                        }}
                      />
                    </div>
                  </label>
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="password">Saisissez votre mot de passe *
                    <div>
                      <input
                        className="field-input"
                        type="password"
                        name="password"
                        id="field-input--password"
                        value={password}
                        onChange={(evt) => {
                          changeField(evt.target.value, 'password');
                        }}
                      />
                    </div>
                  </label>
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="password-confirmation">Confirmez votre mot de passe *
                    <div>
                      <input
                        className="field-input"
                        type="password"
                        name="password-confirmation"
                        value={passwordConfirm}
                        onChange={(evt) => {
                          changeField(evt.target.value, 'passwordConfirm');
                        }}
                      />
                    </div>
                  </label>
                </div>
                { createPro
                && (
                <div className="field">
                  <label className="field-label" htmlFor="siret">Saisissez votre n° de SIRET *
                    <div>
                      <input
                        className="field-input"
                        type="text"
                        name="siret"
                        placeholder="12345678900012"
                        value={siret}
                        onChange={(evt) => {
                          changeField(evt.target.value, 'siret');
                        }}
                      />
                    </div>
                  </label>
                </div>
                )}
              </div>
              <div className="fields-right">
                <div className="field">
                  <div className="field-label map-label" htmlFor="adresse">
                    <p className="map-label">Saisissez votre adresse *</p>
                    <div className="display-map">
                      <MapGL
                        ref={mapRef}
                        {...viewport}
                        width="400px"
                        height="350px"
                        onViewportChange={handleViewportChange}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                      >
                        <Geocoder
                          mapRef={mapRef}
                          onViewportChange={handleGeocoderViewportChange}
                          mapboxApiAccessToken={MAPBOX_TOKEN}
                          countries="fr"
                          placeholder="Votre adresse"
                          onResult={(e) => {
                            updateAddress(
                              e.result.place_name,
                              e.result.center[0],
                              e.result.center[1],
                            );
                          }}
                        />
                      </MapGL>
                    </div>
                  </div>
                </div>
                <div />
              </div>
              <div className="fields-food">
                <h2>Choissez vos nourritures favorites</h2>
                <fieldset className="field-check">
                  {foods.map((item) => (
                    <label key={item.name} className="field-label" htmlFor={item.name}>{item.name}
                      <label className="switch">
                        <input
                          type="checkbox"
                          name={item.name}
                          checked={item.isCheck}
                          onChange={() => {
                            changeToggle(!item.isCheck, `${item.name}`);
                          }}
                        />
                        <span className="slider rounded" />
                      </label>
                    </label>
                  ))}
                </fieldset>
              </div>
            </div>
          </div>
          {loadCreateUser
          && (
            <Loader
              type="Puff"
              color="#e69512"
              height={50}
              width={50}
              className="loaderEdit"
            />
          )}
          {!loadCreateUser
          && (
            <button className="submit-form" type="submit" value="Submit">{buttonCreateName}</button>
          )}

        </div>
      </form>
    </main>
  );
};

NewAccount.propTypes = {
  nickname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  siret: PropTypes.string.isRequired,
  pictureUser: PropTypes.string.isRequired,
  createPro: PropTypes.bool.isRequired,
  changeField: PropTypes.func.isRequired,
  changeToggle: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  tokenIsOk: PropTypes.bool.isRequired,
  findFood: PropTypes.func.isRequired,
  updateAddress: PropTypes.func.isRequired,
  errorInscription: PropTypes.bool.isRequired,
  errorInscriptionText: PropTypes.string.isRequired,
  handleError: PropTypes.func.isRequired,
  foods: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      isCheck: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};

// == Export
export default NewAccount;
