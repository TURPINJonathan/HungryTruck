// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

// == Import
import './search.scss';

// == Composant
const Search = ({
  search,
  searchField,
  handleSubmit,
  trucks,
}) => {
  let filterSearch;

  console.log(search);
  if (search.lenght === 0) {
    filterSearch = trucks;
  }
  else {
    filterSearch = trucks.filter((item) => {
      const lowerSearch = search.toLowerCase();
      const lowerTrucks = item.name.toLowerCase();

      return lowerTrucks.includes(lowerSearch);
    });
  }

  console.log(filterSearch);

  return (
    <>
      <h3 className="search-title">
        Recherche
      </h3>
      <div className="search">

        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label className="search-form--label" htmlFor="search">
            <div className="search-form-inputSubmit">
              <input
                type="text"
                name="search"
                className="search-form--input"
                placeholder="Veuillez saisir votre rechercher"
                value={search}
                onChange={(evt) => {
                  searchField(evt.target.value, 'search');
                }}
              />
              <input type="submit" className="search-form--submit" value="Manger !" />
            </div>

          </label>
        </form>
        <section className="search-results">
          <p className="search-results--title">Résultat(s) de votre recherche :</p>

          {filterSearch.map((item) => (
            <Link
              to={`/food-truck/${item.id}`}
              key={item.id}
            >
              <article className="search-results--result">
                <img src={item.picture} className="result-logo" alt={`logo de ${item.name}`} />
                <div className="result-details">
                  <p className="result-title">
                    {item.name}
                  </p>
                  <div className="result-type">
                    {item.sell_type_food.map((type) => (
                      <p key={type.name}>{type.name}</p>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}

        </section>
      </div>
    </>
  );
};

Search.propTypes = {
  search: PropTypes.string.isRequired,
  searchField: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  trucks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      num_tel: PropTypes.number.isRequired,
      overview: PropTypes.string.isRequired,
      instagram: PropTypes.string.isRequired,
      twitter: PropTypes.string.isRequired,
      facebook: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        pseudo: PropTypes.string.isRequired,
        siret: PropTypes.number.isRequired,
      }).isRequired,
      sell_type_food: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      ).isRequired,
      createdAt: PropTypes.string.isRequired,
      events: PropTypes.arrayOf(), // TODO shape
      picture: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

// == Export
export default Search;
