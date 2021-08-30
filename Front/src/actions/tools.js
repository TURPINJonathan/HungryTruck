// === action types
export const CHANGE_STATUS_ICON_USER = 'CHANGE_STATUS_ICON_USER';
export const LOADING_EDIT_USER = 'LOADING_EDIT_USER';
export const MODAL = 'MODAL';

// === action creators
export const changeStatusIconUser = () => ({
  type: CHANGE_STATUS_ICON_USER,
});

export const loadingEditUser = () => ({
  type: LOADING_EDIT_USER,
});

export const displayModal = () => ({
  type: MODAL,
});
