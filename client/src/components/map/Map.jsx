
import React from 'react'
import GoogleMapReact from 'google-map-react'

import './map.css'
require('dotenv').config();

const getMapOptions = (maps) => {

  return {
      scaleControl: true,
      gestureHandling: "greedy",
      disableDoubleClickZoom: true,
      minZoom: 11,
      maxZoom: 17,

      mapTypeControl: true,
      mapTypeId: maps.MapTypeId.SATELLITE,
      mapTypeControlOptions: {
          style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: maps.ControlPosition.BOTTOM_CENTER,
          mapTypeIds: [
              maps.MapTypeId.ROADMAP,
              maps.MapTypeId.SATELLITE,
              maps.MapTypeId.HYBRID
          ]
      },
      zoomControl: true,
  };
}


const Map = ({ location, zoomLevel }) => (
  
  <div >
    

    <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: ''}}
        
        center={location}
        zoom={zoomLevel}
        options={getMapOptions}
      >
      </GoogleMapReact>
    </div>
  </div>
)

export default Map