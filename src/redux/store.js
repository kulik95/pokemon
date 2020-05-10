import { configureStore } from "@reduxjs/toolkit";
import typeReducer from "../components/type-selector/typeSlice";
import searchSlice from "../components/search/search-slice";
import detailsSlice from "../components/pokemon-details/details-slice";

export default configureStore({
  reducer: {
    type: typeReducer,
    search: searchSlice,
    details: detailsSlice,
  },
});
