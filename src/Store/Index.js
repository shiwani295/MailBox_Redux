import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./AuthSlice";
import mailSliceReducer from "./Mail";
const Store = configureStore({
  reducer: {
    Auth: AuthSliceReducer,
    Mail: mailSliceReducer,
  },
});
export default Store;
