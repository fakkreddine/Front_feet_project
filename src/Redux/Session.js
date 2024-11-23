import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  value: null,
}

export const Session = createSlice({
  name: 'session',
  initialState,
  reducers: {
    
    addSession: (state, action) => {
      state.value += action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { addSession } = Session.actions

export default Session.reducer