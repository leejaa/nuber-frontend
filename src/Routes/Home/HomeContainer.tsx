import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import HomePresenter from "./HomePresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { USER_PROFILE } from "src/SharedQueries";
import { GET_NEARBY_DRIVERS, REPORT_LOCATION } from "./HomeQueries";
import { reverseGeoCode, geoCode } from "src/mapHelpers";
import { toast } from "react-toastify";
import { UserProfile } from "src/types/api";

export default ({google, history}) => {

    let map : google.maps.Map;
    let userMarker: google.maps.Marker;
    let toMarker: google.maps.Marker;
    let directions: google.maps.DirectionsRenderer;
    // var drivers: google.maps.Marker[];

    const mapRef = useRef();
    const [distance2, setDistance] = useState("");
    const [, setDuration] = useState("");
    const [, setFromAddress] = useState("");
    const [, setIsDriving] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [price, setPrice] = useState("");
    const [toAddress, setToAddress] = useState("Athens International Airport (ATH), Attiki Odos, Spata Artemida 190 04, Greece");
    const [toLat, setToLat] = useState(0);
    const [toLng, setToLng] = useState(0);

    const {data, loading} = useQuery(USER_PROFILE);
    const {data : data2} = useQuery(GET_NEARBY_DRIVERS);
    // const {data : data3} = useQuery(GET_NEARBY_RIDE);
    // const [RequestRideMutation] = useMutation(REQUEST_RIDE);
    // const [AcceptRideMutation] = useMutation(ACCEPT_RIDE);
    const [reportLocation] = useMutation(REPORT_LOCATION);

      useEffect(() => {


        // drivers = [];

        navigator.geolocation.getCurrentPosition(
            handleGeoSucces,
            handleGeoError
          );

      }, []);

      useEffect(() => {

        handleRideRequest(data2);

      }, [data2]);

      useEffect(() => {

        handleProfileQuery(data);

      }, [data]);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleGeoSucces = (positon: Position) => {
        const {
            coords: { latitude, longitude }
        } = positon;

        setLat(latitude);
        setLng(longitude);

        

        getFromAdress(latitude, longitude);

        loadMap(latitude, longitude);

    };
    const getFromAdress = async (lat2: number, lng2: number) => {
        const address = await reverseGeoCode(lat2, lng2);
        if (address) {
            setFromAddress(address);
        }
    };

    const loadMap = (lat2, lng2) => {
        const maps = google.maps;
        const mapNode = ReactDOM.findDOMNode(mapRef.current);

        if (!mapNode) {
            loadMap(lat2, lng2);
            return;
        }
        const mapConfig: google.maps.MapOptions = {
            center: {
            lat,
            lng
            },
            disableDefaultUI: true,
            zoom: 13
        };
        map = new maps.Map(mapNode, mapConfig);
        const userMarkerOptions: google.maps.MarkerOptions = {
            icon: {
            path: maps.SymbolPath.CIRCLE,
            scale: 7
            },
            position: {
            lat,
            lng
            }
        };
        userMarker = new maps.Marker(userMarkerOptions);
        userMarker.setMap(map);
        const watchOptions: PositionOptions = {
            enableHighAccuracy: true
        };
        navigator.geolocation.watchPosition(
            handleGeoWatchSuccess,
            handleGeoWatchError,
            watchOptions
        );
    };
      const handleGeoWatchSuccess = async(position: Position) => {
        const {
          coords: { latitude, longitude }
        } = position;
        userMarker.setPosition({ lat: latitude, lng: longitude });
        map.panTo({ lat: latitude, lng: longitude });
        await reportLocation({
          variables: {
            lat: parseFloat(latitude.toFixed(10)),
            lng: parseFloat(longitude.toFixed(10))
          }
        });
      };
      const handleGeoWatchError = () => {
        console.log("Error watching you");
      };
      const handleGeoError = () => {
        console.log("No location");
      };
      const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        // const {
        //   target: { name, value }
        // } = event;
        
      };
      const onAddressSubmit = async () => {
        const maps = google.maps;
        const result = await geoCode(toAddress);
        if (result !== false) {
          const { lat : lat2, lng : lng2, formatted_address: formatedAddress } = result;
          if (toMarker) {
            toMarker.setMap(null);
          }
          const toMarkerOptions: google.maps.MarkerOptions = {
            position: {
                lat : lat2,
                lng : lng2
            }
          };
          toMarker = new maps.Marker(toMarkerOptions);
          toMarker.setMap(map);
          const bounds = new maps.LatLngBounds();
          bounds.extend({ lat, lng });
          bounds.extend({ lat: lat, lng: lng });
          map.fitBounds(bounds);

            setToAddress(formatedAddress);
            setToLat(lat);
            setToLng(lng);

            createPath();
            

        }
      };
      const createPath = () => {
        if (directions) {
          directions.setMap(null);
        }
        const renderOptions: google.maps.DirectionsRendererOptions = {
          polylineOptions: {
            strokeColor: "#000"
          },
          suppressMarkers: true
        };
        directions = new google.maps.DirectionsRenderer(renderOptions);
        const directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
        const to = new google.maps.LatLng(toLat, toLng);
        const from = new google.maps.LatLng(lat, lng);
        const directionsOptions: google.maps.DirectionsRequest = {
          destination: to,
          origin: from,
          travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(directionsOptions, handleRouteRequest);
      };
      const handleRouteRequest = (
        result: google.maps.DirectionsResult,
        status: google.maps.DirectionsStatus
      ) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const { routes } = result;
          const {
            distance: { text: distance },
            duration: { text: duration }
          } = routes[0].legs[0];
          directions.setDirections(result);
          directions.setMap(map);

            setDistance(distance);
            setDuration(duration);

            fnSetPrice();


        } else {
          toast.error("There is no route there, you have to swim ");
        }
      };
      const fnSetPrice = () => {
          
          setPrice(Number(parseFloat(distance2.replace(",", "")) * 3).toFixed(2));
        }
    //   const handleNearbyDrivers = (data: {} | any) => {
    //     if ("GetNearbyDrivers" in data) {
    //       const {
    //         GetNearbyDrivers: { drivers, ok }
    //       } = data;
    //       if (ok && drivers) {
    //         for (const driver of drivers) {
                
    //           if (driver && driver.lastLat && driver.lastLng) {
    //             const exisitingDriver:
    //               | google.maps.Marker
    //               | undefined = drivers.find(
    //               (driverMarker: google.maps.Marker) => {
    //                 const markerID = driverMarker.get("ID");
    //                 return markerID === driver.id;
    //               }
    //             );

    //             if (exisitingDriver) {
    //               exisitingDriver.setPosition({
    //                 lat: driver.lastLat,
    //                 lng: driver.lastLng
    //               });
    //               exisitingDriver.setMap(map);
    //             } else {
    //               const markerOptions: google.maps.MarkerOptions = {
    //                 icon: {
    //                   path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
    //                   scale: 5
    //                 },
    //                 position: {
    //                   lat: driver.lastLat,
    //                   lng: driver.lastLng
    //                 }
    //               };
    //               const newMarker: google.maps.Marker = new google.maps.Marker(
    //                 markerOptions
    //               );
    //               drivers.push(newMarker);
    //               newMarker.set("ID", driver.id);
    //               newMarker.setMap(map);
    //             }
    //           }
    //         }
    //       }
    //     }
    //   };
      
      const handleRideRequest = (paramData: any) => {

        if(paramData === undefined){
            return;
        }

        const { RequestRide } = paramData;

        if(RequestRide === undefined){
            return;
        }

        if (RequestRide.ok) {
          toast.success("Drive requested, finding a driver");
          history.push(`/ride/${RequestRide.ride!.id}`);
        } else {
          toast.error(RequestRide.error);
        }
      };
      const handleProfileQuery = (paramData: UserProfile) => {

        if(paramData === undefined){
            return;
        }

        const { GetMyProfile } = paramData;
        if (GetMyProfile.user) {
          const {
            user: { isDriving }
          } = GetMyProfile;

          setIsDriving(isDriving);
        
        }
      };

    //   const handleRideAcceptance = (data: AcceptRide) => {
    //     const { UpdateRideStatus } = data;
    //     if (UpdateRideStatus.ok) {
    //       history.push(`/ride/${UpdateRideStatus.rideId}`);
    //     }
    //   };

    return (
        <div>
            <HomePresenter
                loading={loading}
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                mapRef={mapRef}
                toAddress={toAddress}
                onInputChange={onInputChange}
                price={price}
                data={data}
                onAddressSubmit={onAddressSubmit}
                // requestRideFn={requestRideFn}
                // nearbyRide={nearbyRide}
                // acceptRideFn={acceptRideFn}
            />
        </div>
    );
}