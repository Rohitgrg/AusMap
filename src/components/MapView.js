import React from 'react'
import {Popup,MapContainer, TileLayer, GeoJSON, MapConsumer, useMapEvent, CircleMarker} from "react-leaflet"
import EnhancedMarker from 'react-leaflet-enhanced-marker';
import statesLocation from "../data/statesLatLong.json"
import popluationByCities from "../data/sua.json"
import states from "../data/states.json"



import redIcon from "../assets/redMarker.png"
import greenIcon from "../assets/greenMarker.png"
import 'react-leaflet-markercluster/dist/styles.min.css';

require('react-leaflet-markercluster/dist/styles.min.css'); 
const MapView = () => {

    const [percentageByState, setPercentageByState] = React.useState({})
    const [showCities, setShowCities] = React.useState(false);

    const calculatePercentageByState = () => {
        let percentageByState = {};
      popluationByCities.forEach((city)=>{
          let stateOfCity = city.State.toLowerCase();
          let listOfStates = statesLocation;
          listOfStates.forEach((state) => {
            let stateName = state.State.toLowerCase();
            if(stateOfCity.includes(stateName)){
                let tempPercentage = Number(city["Percentage ofnational population (June 2018)"].replace('%',''));
                if(percentageByState[stateName]) percentageByState[stateName] = percentageByState[stateName] + tempPercentage;
                else percentageByState[stateName] = tempPercentage;
            }
          })
      })
      setPercentageByState(percentageByState)
    }

    const getCustomMarker = (state ) => {
        let percentage = percentageByState[state.State.toLowerCase()] || 0;
        percentage =  Number(percentage)
        percentage = percentage.toFixed(2);
        return (
            <div style ={{ textAlign:"center", background:"white"}}>
            {percentage + " %"}
            </div>
        )
      }

      const getCustomMarkerStateName =(state) => {
        let stateName = state.State;
        return (
            <div style={{fontSize: "11px" , fontWeight:"bold", fontFamily: "sans-serif", width:"10rem"}}>
                {stateName.toUpperCase()}
            </div>
        )
      }

        React.useEffect(()=>{
            calculatePercentageByState()
        },[]);    
    
    
    return (
        <div>
        <MapContainer
            style={{height: "100vh" , width:"100%"}}
            minZoom={5}
            zoom ={5}
            center={[-28.2744, 133.7751]}
            eventHandlers
        >
        <TileLayer url= "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

        <GeoJSON data={states.features} key={Math.random()}/>
        <ZoomControl setShowCities={setShowCities}/>
        <MapConsumer>
        {(map)=>{
            const mapZoom = map.getZoom();
            if (mapZoom >= 6) console.log("zoomed");
            return null;
            }}
        </MapConsumer>
         
        {!showCities && statesLocation.map ((state,i) => (<EnhancedMarker 
            key = {state.State}
            index={i}
            icon={getCustomMarker(state)}
            position={[state.Lat -0.7, state.Long]}
          />))}

          {!showCities && statesLocation.map ((state,i) => (<EnhancedMarker 
            key = {state.State}
            index={i}
            icon={getCustomMarkerStateName(state)}
            position={[state.Lat, state.Long]}
          />))}

            {showCities && popluationByCities.map((city) => (
                        
            <div>
                <EnhancedMarker 
                icon={<img src={ Number(city["2011 Census[4] Population"].replaceAll(/,/g, "")) > 1500000 ? redIcon : greenIcon} style={{left:"30%", position:"relative" ,marginTop:"-1rem"}}
                alt="icon"/>}
                 position={[city.lat, city.long]}
                 >
                    <Popup>
                    {city.SUA}
                    <br/>
                    {city["2011 Census[4] Population"]}
                    </Popup>
                </EnhancedMarker>
                <CircleMarker
                    color={ Number(city["2011 Census[4] Population"].replaceAll(/,/g, "")) > 1500000 ? "red" : "green"}
                    center={[city.lat, city.long]}
                    fillOpacity={0.5}
                    stroke={false}
                    radius={!isNaN(Number(city["2011 Census[4] Population"].replaceAll(/,/g, ""))) && 10 * Number(city["2011 Census[4] Population"].replaceAll(",", "")) / 1000000}
                />
                { console.log(city.SUA , Number(city["2011 Census[4] Population"].replaceAll(",", "")))}
         </div>
            ))}
        </MapContainer>
        </div>
    )
}

const ZoomControl = ({setShowCities}) => {
    const map = useMapEvent('zoom', () => {
        const zoomLevel = map.getZoom();
     if(zoomLevel >= 6) setShowCities(true);
     else setShowCities(false);
      console.log(map.getZoom());
    })
    return null
  }

export default MapView
