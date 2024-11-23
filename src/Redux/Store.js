import { configureStore } from '@reduxjs/toolkit'
import {Session} from "./Session"
export const store = configureStore({
  reducer: { session: Session},
})