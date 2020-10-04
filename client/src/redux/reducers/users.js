import {
  GET_USERS,
  DELETE_USER,
  USER_ERROR,
  ADD_USER,
  TOGGLE_ACTIVE_STATUS,
} from '../actionTypes';

const initialState = {
  users: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS: {
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    }
    case ADD_USER: {
      return {
        ...state,
        users: [action.payload, ...state.users],
        loading: false,
      };
    }
    case DELETE_USER: {
      const { id } = action.payload;
      return {
        ...state,
        users: state.users.filter((user) => user._id !== id),
        loading: false,
      };
    }
    case USER_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    case TOGGLE_ACTIVE_STATUS: {
      const { id } = action.payload;
      const idx = state.users.findIndex((user) => user._id === id);
      if (idx === -1) {
        return { ...state };
      }
      let updatedUsers = [...state.users];
      updatedUsers[idx] = {
        ...updatedUsers[idx],
        active: !updatedUsers[idx].active,
      };
      return {
        ...state,
        users: updatedUsers,
        loading: false,
      };
    }
    default:
      return state;
  }
}
