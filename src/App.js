import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {getSpaceData} from './redux/spaceInfo';
import { getInfo } from './redux/spaceInfo'

function App() {
  useEffect(()=> {
    dispatch(getInfo());
  },[])
  const [rocketName, setrocketName] = useState("");
  const spaceObjData = useSelector(state=> state.spaceDataObj);
  const [searchData, updateSearchData] = useState([]);
  const [launchStatusValue, setLaunchStatusValue] = useState();
  const [isChecked, setIsChecked] = useState(false)
  const dispatch = useDispatch();
  useEffect(()=>{
    updateSearchData(spaceObjData)
  },[spaceObjData])

  /* searchRocketName function for Searching by rocket name*/
  function searchRocketName(event){
    event.preventDefault();
    setrocketName(event.target.value);
    if(event.target.value) {
      const rocketResults = spaceObjData.filter(sam => event.target.value === sam.rocket.rocket_name);
      updateSearchData(rocketResults);
    } else {
      updateSearchData(spaceObjData);
    }
  }
/* Filter data on using onFailure function by failure status*/
  function onFailure() {
    const onFailureFilter = searchData.filter(x=> x.launch_success == false)
    updateSearchData(onFailureFilter);
  }
/* Filter data on using onSuccess function by success status*/
  function onSuccess() {
    const onSuccessFilter = searchData.filter(x=> x.launch_success == true)
    updateSearchData(onSuccessFilter);
  }
  /* onClear function to clear all filters */
  function onClear() {
    updateSearchData(spaceObjData);
    setLaunchStatusValue("");
    setrocketName("");
    setIsChecked(false)
  }
  /* select success or failure status by using LaunchStatus function */
  function LaunchStatus(e) {
    e.preventDefault();
    setLaunchStatusValue(e.target.value);
    if(e.target.value=="success") {
      onSuccess()
    } else if(e.target.value=="failure"){
      onFailure()
    }
  }

  /* isUpcoming function used to filter data based on upcoming status  */
  const isUpcoming = () => {
    var onSuccessFilter = [];
    if(!isChecked) {
      onSuccessFilter = spaceObjData.filter(x=> x.upcoming == true);
      console.log(onSuccessFilter)
      updateSearchData(onSuccessFilter);
    } else {
      updateSearchData(spaceObjData);
    }
    setIsChecked(!isChecked)
  }
  return (
    <div className="App">
      <div class="heard-elements">
      <div class="input-field col s12 m-r-7">
      <input type="text" value={rocketName} onChange={searchRocketName} placeholder="Search Rocket Name" class="input-element"></input>
        <label class="m-l-5 m-r-2">Launch Status</label>
        <select onChange={e => LaunchStatus(e)} value={launchStatusValue} class="input-element">
          <option value="" disabled selected>Choose Status</option>
          <option value="success">Success</option>
          <option value="failure">Failure</option>
        </select>
        <label>
        <label class="m-l-5 m-r-1">Is Upcoming</label>
        <input type="checkbox" id="checkbox" class="check-element"  checked={isChecked} onChange={isUpcoming} />
      </label>
      </div>
        <button onClick={onClear}>Clear</button>
      </div>
      <div class="cards-list">
        {searchData.length>0 && searchData.map(obj => (
        <div className='to-cards' key={obj.mission_name}>
          <div><b>Mission Name: </b>{obj.mission_name}</div>
          <div><b>Flight Number: </b>{obj.flight_number}</div>
          <div><b>Details: </b>{obj.details || 'NA'}</div>
        </div>
        ))
      }
      {searchData.length <1 && <p>No Data Found</p>}
      </div>
    </div>
  );
}

export default App;
