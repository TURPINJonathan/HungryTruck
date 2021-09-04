// == Import npm
import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';

// == Import components which always display
import Nav from '../Nav';
import Footer from '../Footer';

// == Import others components
// import Map from '../Map';
import Main from '../Main';
import NewAccount from '../../containers/MyAccount/NewAccount';
import EditAccount from '../../containers/MyAccount/EditAccount';
import LegalMentions from '../Footer/LegalMentions';
import Search from '../../containers/Search';
import AddSlot from '../../containers/MyFoodTruck/NewTime';
import WhoAreWe from '../WhoAreWe';
import NotFound from '../NotFound';
import ZoomFT from '../../containers/ZoomFT';
import LogIn from '../../containers/MyAccount/LogIn';
import MyAccount from '../../containers/MyAccount';
import MyFoodTruck from '../../containers/MyAccount/MyFoodTrucks';
import NewFoodTruck from '../../containers/MyFoodTruck/NewFoodTruck';
import Faq from '../../containers/Footer/FAQ';
import Contact from '../../containers/Contact';

// == Import
import './styles.scss';

// == Composant
const HungryTruck = ({
  saveUser,
  trucksPro,
  flashAddTruck,
  flashAddEvent,
  flashDelEvent,
  flashDelTruck,
  changeShowFlash,
}) => {
  function showError(message) {
    toast.error(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  }
  function showSuccess(message) {
    toast.success(message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  }
  if (flashAddTruck === 'redirect') {
    changeShowFlash('success', 'addTruck');
    return <Redirect to="/my-account/my-foodtruck" />;
  }
  if (flashAddTruck === 'error') {
    showError('Tous les champs sont obligatoire.');
    changeShowFlash(null, 'addTruck');
  }
  if (flashAddEvent === 'redirect') {
    changeShowFlash('success', 'addEvent');
    return <Redirect to="/my-account/my-foodtruck" />;
  }
  if (flashAddEvent === 'error') {
    showError('Tous les champs sont obligatoire.');
    changeShowFlash(null, 'addEvent');
  }
  if (flashDelEvent === 'error') {
    showError('Une erreur c\'est produite, veuillez réessayer.');
    changeShowFlash(null, 'delEvent');
  }
  if (flashDelTruck === 'error') {
    showError('Une erreur c\'est produite, veuillez réessayer.');
    changeShowFlash(null, 'delTruck');
  }
  const [delAccount, setDelAccount] = useState(false);
  const [addFoodTruck, setAddFoodTruck] = useState(false);
  const [foodtruckDetails, setFoodtruckDetails] = useState(false);
  if (localStorage.getItem('token') !== null) {
    saveUser();
  }
  useEffect(() => {
    if (flashAddTruck === 'success') {
      showSuccess('Le food truck a bien été ajouté.');
      changeShowFlash(null, 'addTruck');
    }
    if (flashAddEvent === 'success') {
      showSuccess('L\'événement a bien été ajouté au food truck.');
      changeShowFlash(null, 'addEvent');
    }
  });
  useEffect(() => {
    if (flashDelEvent === 'success') {
      changeShowFlash(null, 'delEvent');
      showSuccess('L\'événement a bien été supprimé au food truck.');
    }
    if (flashDelTruck === 'success') {
      changeShowFlash(null, 'delTruck');
      showSuccess('Le food truck a bien été supprimé.');
    }
  }, [flashDelEvent, flashDelTruck]);

  return (
    <div className="hungrytruck">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/my-account/my-foodtruck/new/add" exact>
          <AddSlot />
        </Route>
        <Route path="/login" exact>
          <LogIn />
        </Route>
        <Route path="/new-account" exact>
          <NewAccount />
        </Route>
        <Route path="/legal" exact>
          <LegalMentions />
        </Route>
        <Route path="/search" exact>
          <Search />
        </Route>
        <Route path="/:previous/food-truck/:slug" exact>
          <ZoomFT />
        </Route>
        <Route path="/food-truck/:slug" exact>
          <ZoomFT />
        </Route>
        <Route path="/who-are-we" exact>
          <WhoAreWe />
        </Route>
        <Route path="/my-account" exact>
          <MyAccount
            delAccount={delAccount}
            setDelAccount={setDelAccount}
          />
        </Route>
        <Route path="/my-account/edit" exact>
          <EditAccount />
        </Route>
        <Route path="/my-account/my-foodtruck" exact>
          <MyFoodTruck
            foodTruckDetails={foodtruckDetails}
            setAddFoodTruckDetails={setFoodtruckDetails}
          />
        </Route>
        <Route path="/my-account/my-foodtruck/new" exact>
          <NewFoodTruck
            addFoodTruck={addFoodTruck}
            setAddFoodTruck={setAddFoodTruck}
          />
        </Route>
        <Route path="/faq" exact>
          <Faq />
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

HungryTruck.propTypes = {
  saveUser: PropTypes.func.isRequired,
};

// == Export
export default HungryTruck;
