import axios from 'axios';
import { ADD_FOODTRUCK, loadNewFoodTruck } from '../actions/newFoodTruck';
import URL from '../data/ip';

const addFoodTruckMiddleware = (store) => (next) => (action) => {
  // console.log('on a intercepté une action dans le middleware: ', action);

  switch (action.type) {
    case ADD_FOODTRUCK: {
      console.log('je vais envoyé le foodtruck en bdd');
      const {
        name,
        facebook,
        instagram,
        twitter,
        phone,
        picture,
        overview,
        type1,
        type2,
        type3,
      } = store.getState().newFT;

      const foods = [
        type1,
        type2,
        type3,
      ];

      axios.post(
        `${URL}/api/foodtruck/create`,
        {
          name: name,
          facebook: facebook,
          instagram: instagram,
          twitter: twitter,
          overview: overview,
          picture: picture,
          num_tel: phone,
          sell_type_food: foods,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
        .then((response) => {
          console.log(response);
          //store.dispatch(loadNewFoodTruck());
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log('envoyé');
        });
      break;
    }
    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default addFoodTruckMiddleware;
