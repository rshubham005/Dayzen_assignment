let initial_state = localStorage.getItem("notes_array")
  ? JSON.parse(localStorage.getItem("notes_array"))
  : [];

console.log("reducer", initial_state);
export const NoteReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "ADD_NOTE": {
      let finalVal = [...state, action.payload];
      console.log("payload", action.payload);
      localStorage.setItem("notes_array", JSON.stringify(finalVal));
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
