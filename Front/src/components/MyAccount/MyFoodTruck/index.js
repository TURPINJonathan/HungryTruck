// == Import npm
import React from 'react';
import { Trash2 } from 'react-feather';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Loader from 'react-loader-spinner';

// == Import
import './myfoodtruck.scss';

// == Composant
const MyFoodTruck = ({
  myTrucks,
  avatar,
  truckdel,
  timedel,
  loadDelEvent,
  loadDelTruck,
  changeIsLoading,
}) => (
  <section className="section-myFoodTruck">
    <h2 className="myFoodTruck-title">Mes FoodTrucks</h2>
    <img
      className="myFoodTruck-picture"
      src={avatar}
      alt="mon foodtruck hungrytruck"
    />
    <div className="myFoodTruck">
      <div className="myFoodTruck-array">
        <table>
          <thead>
            <tr>
              <th>Nom du food truck</th>
              <th>Type de plat</th>
              <th>Horaires</th>
              <th colSpan="1">Actions</th>
            </tr>
          </thead>
          {myTrucks.map((item) => (
            <tbody key={item.id}>
              <tr>
                <td>{item.name}</td>
                <td id="type_food">
                  {item.sell_type_food.map((type) => (
                    <p key={type.name}>{type.name} </p>
                  ))}
                </td>
                <td>
                  <Popup
                    trigger={(
                      <button
                        type="button"
                        className="button-linkto--details"
                      >
                        voir détails
                      </button>
                    )}
                    modal
                    nested
                  >
                    {(close) => (
                      <section className="viewslots-section">
                        <h2 className="viewslots-title">Horraire du food truck</h2>
                        <div className="myFoodTruck-array">
                          <table>
                            <thead>
                              <tr>
                                <th>Jours</th>
                                <th>Créneaux</th>
                                <th>Lieux</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            {item.events.map((rdv) => (
                              <tbody key={rdv.id}>
                                <tr>
                                  <td>{rdv.day}</td>
                                  <td>{rdv.hours} - {rdv.hours_end}</td>
                                  <td>{rdv.adresse}, {rdv.cp} {rdv.city}</td>
                                  <td>
                                    {loadDelEvent
                                    && (
                                      <Loader
                                        type="Puff"
                                        color="#e69512"
                                        height={30}
                                        width={30}
                                        id="loaderLogIn"
                                      />
                                    )}
                                    {!loadDelEvent
                                    && (
                                      <Trash2
                                        color="#e61212"
                                        onClick={() => {
                                          changeIsLoading(true, 'delEvent');
                                          timedel(rdv.id);
                                        }}
                                      />
                                    )}

                                  </td>
                                </tr>
                              </tbody>
                            ))}
                          </table>
                        </div>
                        <div className="buttons">
                          <Link
                            to="/my-account/my-foodtruck"
                          >
                            <button
                              type="button"
                              className="cancel"
                              onClick={(() => {
                                close();
                              })}
                            >Retour
                            </button>
                          </Link>
                          <Link
                            to="/my-account/my-foodtruck/new/add"
                          >
                            <button type="button" className="modify">Ajouter un créneau</button>
                          </Link>
                        </div>
                      </section>
                    )}
                  </Popup>
                </td>
                <td>
                  {loadDelTruck
                  && (
                    <Loader
                      type="Puff"
                      color="#e69512"
                      height={25}
                      width={25}
                      id="loaderLogIn"
                    />
                  )}
                  {!loadDelTruck
                  && (
                    <Trash2
                      color="#e61212"
                      onClick={() => {
                        changeIsLoading(true, 'delTruck');
                        truckdel(item.id);
                      }}
                    />
                  )}

                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="myFoodTruck-buttons">
        <Link to="/my-account/my-foodtruck/new" className="button-Link">
          <button type="button" className="button-add">
            Ajouter un foodtruck
          </button>
        </Link>
        <Link to="/my-account" className="button-Link">
          <button type="button" className="button-linkto">
            Retourner sur mon compte
          </button>
        </Link>
        <Link to="/my-account/my-foodtruck/new/add" className="button-Link">
          <button
            type="button"
            className="button-linkto"
          >
            Ajouter un créneau
          </button>
        </Link>
        <Link to="/" className="button-Link">
          <button type="button" className="button-linkto">
            Retour au menu principal
          </button>
        </Link>
      </div>
    </div>

  </section>
);

MyFoodTruck.propTypes = {

};

// == Export
export default MyFoodTruck;
