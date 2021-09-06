import { connect } from 'react-redux';
import HungryTruck from 'src/components/HungryTruck';
import { saveUser } from '../../actions/logIn';
import { changeShowFlash } from '../../actions/tools';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  // nom de la prop à remplir: élément à récupérer dans le state

  // Formualire de création d'un user
  flashAddTruck: state.tools.flashAddTruck,
  flashAddEvent: state.tools.flashAddEvent,
  flashDelEvent: state.tools.flashDelEvent,
  flashDelTruck: state.tools.flashDelTruck,
  flashSaveEditUser: state.tools.flashSaveEditUser,
  flashCreateUser: state.tools.flashCreateUser,
  flashContact: state.tools.flashContact,
  flashLogIn: state.tools.flashLogIn,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher des actions vers le store (mettre à jour le state)
const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: fonction qui dispatch l'action
  saveUser: () => {
    const action = saveUser();
    dispatch(action);
  },
  changeShowFlash: (newValue, identifier) => {
    const action = changeShowFlash(newValue, identifier);
    dispatch(action);
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(HungryTruck);
