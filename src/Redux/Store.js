
import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './Session'; // Ensure 'Session.js' exists in 'src/Redux/'
 // Ensure correct path to your slice file

const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
});

export default store;
