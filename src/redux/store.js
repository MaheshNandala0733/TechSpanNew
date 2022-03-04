import { configureStore } from "@reduxjs/toolkit"
import spaceInfo  from "./spaceInfo"

export default configureStore({
  reducer: spaceInfo.reducer
})