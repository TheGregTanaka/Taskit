import React, {Component, useRef, useEffect} from 'react';

/*TODO make env
const key = "AIzaSyBr0e0T-9WGeBG-S-p05C9ahVicY14GtiQ";
const mapApi = "https://maps.googleapis.com/maps/api/js?key=" + 
  key + 
  "&libraries=places";
  */

    const Map = ({address}) => {
      const mapRef = useRef();
      let map;
      useEffect(() => {
        var scriptTag = document.createElement("script");
        scriptTag.src = process.env.REACT_APP_MAP_API;
        scriptTag.async = true;
        window.document.body.appendChild(scriptTag);
        scriptTag.addEventListener("load", () => {
          geocode();
        });
      }, []);

      const createMap = (coordinates) => {
        map = new window.google.maps.Map(mapRef.current, {
          zoom: 16,
          center: {
            lat: coordinates.lat(),
            lng: coordinates.lng(),
          },
          disableDefaultUI: true,
        })
      };

      const geocode = () => {
        let id;
        let lat, lng;
        new window.google.maps.Geocoder().geocode(
          { address: `${address}` },
          function (results, status) {
            if (status === window.google.maps.GeocoderStatus.OK) {
              id = results[0].place_id;
              createMap(results[0].geometry.location);
              lat = results[0].geometry.location.lat();
              lng = results[0].geometry.location.lng();
              new window.google.maps.Marker({
                position: { lat, lng },
                map: map,
                animation: window.google.maps.Animation.DROP,
                title: `${address}`,
              });
            } else {
              console.log("Geocode error: " + status);
            }
          }
        );
      };

      const marker = (taskID) => {
        
        

      };

      return (
        <div
          id="map" 
          ref={mapRef}
          style={{ width: "300px", height: "200px" }}
        />
      );
    }

export default Map
