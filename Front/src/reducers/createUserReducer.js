import { UPDATE_FIELD, CREATE_PRO } from '../actions/createUser';

const initialState = {
  nickname: '',
  email: '',
  password: '',
  passwordConfirm: '',
  address: '',
  cp: '',
  city: '',
  siret: '',
  pictureUser: '',
  createPro: false,
  logged: false,
  token: null,
};

function createUserReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_FIELD:
      switch (action.identifier) {
        case 'email':
          return {
            ...state,
            email: action.newValue,
          };
        case 'pictureUser':
          return {
            ...state,
            pictureUser: action.newValue,
          };
        case 'nickname':
          return {
            ...state,
            nickname: action.newValue,
          };
        case 'password':
          return {
            ...state,
            password: action.newValue,
          };
        case 'passwordConfirm':
          return {
            ...state,
            passwordConfirm: action.newValue,
          };
        case 'address':
          return {
            ...state,
            address: action.newValue,
          };
        case 'cp':
          return {
            ...state,
            cp: action.newValue,
          };
        case 'city':
          return {
            ...state,
            city: action.newValue,
          };
        case 'siret':
          return {
            ...state,
            siret: action.newValue,
          };
        default:
          return state;
      }
    case CREATE_PRO:
      return {
        ...state,
        createPro: action.newValue,
      };
    default:
      return state;
  }
}

export default createUserReducer;
