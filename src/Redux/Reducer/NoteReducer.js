let initial_state = [];

export const NoteReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "ADD_NOTE": {
      let finalVal = [...state, action.payload];
      return finalVal;
    }
    case "DEL_NOTE": {
      let del = state.splice(action.payload, 1);
      return state;
    }
    default:
      return state;
  }
};
