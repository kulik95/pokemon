import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import typeReducer from '../components/type-selector/typeSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    type: typeReducer
  },
});
