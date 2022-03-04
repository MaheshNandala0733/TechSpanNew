import "./App.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInfo } from "./redux/spaceInfo"

function App() {
  useEffect(() => {
    dispatch(getInfo());
  }, [])
  const [rocketName, setRocketName] = useState("");
  const spaceObjData = useSelector(state => state.spaceDataObj);
  const [searchData, updateSearchData] = useState([]);
  const [launchStatusValue, setLaunchStatusValue] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [islastYearChecked, setIslastYearChecked] = useState(false);
  const dispatch = useDispatch();
  const constVariable = {
    launchStatus: "Launch Status",
    lastYear: "Last Year",
    clearFilter:"Clear Filter",
    isUpcoming: "Is Upcoming",
  };

  const cardsConstVar = {
    missionName: "Mission Name",
    flightNumber: "Flight Number",
    details: "Details",
    rocketName: "Rocket Name",
    launchStatus: "Launch Status",
  };
  
  useEffect(() => {
    updateSearchData(spaceObjData)
  }, [spaceObjData])

  /* searchRocketName function for Searching by rocket name*/
  function searchRocketName(event) {
    const abc = searchData.length>0 ? searchData : spaceObjData;
    // event.preventDefault();
    setRocketName(event.target.value);
    if (event.target.value) {
      const rocketResults = abc.filter(sam => event.target.value === sam.rocket.rocket_name);
      updateSearchData(rocketResults);
    } else {
      updateSearchData(spaceObjData);
    }
  }
  /* Filter data on using onFailure function by failure status*/
  function onFailure() {
    const abc1 = searchData.length>0? searchData : spaceObjData;
    const onFailureFilter = abc1.filter(x => x.launch_success === false)
    updateSearchData(onFailureFilter);
  }
  /* Filter data on using onSuccess function by success status*/
  function onSuccess() {
    const abc2 =  searchData.length>0 ? searchData : spaceObjData;
    const onSuccessFilter = abc2.filter(x => x.launch_success === true)
    updateSearchData(onSuccessFilter);
  }
  /* onClear function to clear all filters */
  function onClear() {
    updateSearchData(spaceObjData);
    setLaunchStatusValue("");
    setRocketName("");
    setIsChecked(false);
    setIslastYearChecked(false);
  }
  /* select success or failure status by using LaunchStatus function */
  function LaunchStatus(e) {
    e.preventDefault();
    setLaunchStatusValue(e.target.value);
    if (e.target.value === "success") {
      onSuccess();
    } else if (e.target.value === "failure") {
      onFailure();
    }
  }

  /* isUpcoming function used to filter data based on upcoming status  */
  const isUpcoming = () => {
    var isUpcomingList = [];
    if (!isChecked) {
      isUpcomingList = spaceObjData.filter(x => x.upcoming === true);
      updateSearchData(isUpcomingList);
    } else {
      updateSearchData(spaceObjData);
    }
    setIsChecked(!isChecked)
  }

  /* lastYear function used to filter data based on lastYear data  */
  const lastYear = () => {
    const currentYear = new Date();
    var lastYearList = [];
    if (!islastYearChecked) {
      lastYearList = spaceObjData.filter(x => x.launch_year === (currentYear.getFullYear()-1));
      updateSearchData(lastYearList);
    } else {
      updateSearchData(spaceObjData);
    }
    setIslastYearChecked(!islastYearChecked)
  }


  return ( <div className = "App" >
    <div className = "heard-elements" >
      <div className = "input-field col s12 m-r-7" >
        <input type = "text" value = {rocketName} onChange = { searchRocketName } placeholder = "Search Rocket Name" className = "input-element" />
        <label className = "m-l-5 m-r-2" > {constVariable.launchStatus}
          <select onChange = { LaunchStatus } value = { launchStatusValue } className = "input-element m-l-2">
            <option value = "Choose Status"> Choose Status </option>
            <option value = "success" > Success </option> 
            <option value = "failure" > Failure </option> 
          </select > 
        </label>
        <label className = "m-l-5 m-r-1" > {constVariable.isUpcoming}
          <input type = "checkbox"
            id = "checkbox"
            className = "check-element"
            checked = { isChecked }
            onChange = { isUpcoming }
          />
        </label >
        <label className = "m-l-5 m-r-1" > {constVariable.lastYear}
          <input type = "checkbox"
            id = "checkbox"
            className = "check-element"
            checked = { islastYearChecked }
            onChange = { lastYear }
          />
        </label >
      </div>
      <button onClick = { onClear } > {constVariable.clearFilter}</button>
    </div> 
    <div className = "cards-list" > 
      {searchData.length > 0 && searchData.map(spaceDataResultObj => (
        <div className = 'to-cards'
          key = { spaceDataResultObj.mission_name } >
          <div > < b > {cardsConstVar.missionName}: </b>{spaceDataResultObj.mission_name || "NA"}</div >
          <div > < b > {cardsConstVar.flightNumber} </b>{spaceDataResultObj.flight_number || "NA"}</div >
          <div > < b > {cardsConstVar.details}: </b>{spaceDataResultObj.details || "NA"}</div >
          <div > < b > {cardsConstVar.rocketName}: </b>{spaceDataResultObj.rocket.rocket_name || "NA"}</div >
          <div > < b > {cardsConstVar.launchStatus}: </b>{spaceDataResultObj.launch_success && spaceDataResultObj.launch_success.toString() || "NA"}</div >
        </div>
      ))}
      {searchData.length < 1 && < div className="p-a-5"> No Data Found </div>} 
    </div > 
  </div>
  );
}

export default App;