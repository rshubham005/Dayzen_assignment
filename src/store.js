import { configureStore } from "@reduxjs/toolkit";
import { NoteReducer } from "./Redux/Reducer/NoteReducer";
export default configureStore({
  reducer: {NoteReducer},
});
