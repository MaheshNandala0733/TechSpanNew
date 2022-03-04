import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const getInfo = createAsyncThunk('space/spaceInfo',
  async (args, {rejectWithValues})=> {
    try {
      const {data} = await axios.get(`https://api.spacexdata.com/v3/launches`);
      return data
      // console.log(data, "dataaaaaaaaaa")
      // .slice(0, 5);
    } catch(error) {
      rejectWithValues(error)
    }
  }
);

const spaceInfo= createSlice({
  name: 'space',
  initialState: {
    spaceDataObj: [],
    loading: false,
    isSuccess: false
  },
  reducers: {
    
  },
  extraReducers: {
    [getInfo.pending]: (state, {payload})=>{
      state.loading = true
    },
    [getInfo.fulfilled]: (state, {payload})=>{
      state.loading = false;
      state.spaceDataObj = payload;
      state.isSuccess =true;
    },
    [getInfo.rejected]: (state, {payload})=>{
      state.loading = false;
      state.isSuccess =false;
    }
}
});
export const { getSpaceData } = spaceInfo.actions
export default spaceInfo;