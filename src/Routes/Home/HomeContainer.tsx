import React from "react";
import ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router-dom";
import { geoCode, reverseGeoCode } from "../../mapHelpers";
import HomePresenter from "./HomePresenter";
import { toast } from "react-toastify";

interface IState {
  lat: number;
  lng: number;
  address: string;
  toAddress: string;
  toLat: number;
  toLng: number;
  distance: string;
  duration?: string;
  price?: string;
  isMenuOpen: boolean;
  ride: boolean;
  priceYn: boolean;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
}

class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public userMarker: google.maps.Marker;
  public toMarker: google.maps.Marker;
  public directions: google.maps.DirectionsRenderer;
  public drivers: google.maps.Marker[];

  public state = {
    address: "",
    lat: 0,
    lng: 0,
    toAddress: "원하시는 목적지를 입력후 목적지선택 버튼을 눌러주세요.",
    toLat: 0,
    toLng: 0,
    distance: "",
    duration: undefined,
    price: undefined,
    isMenuOpen: false,
    ride: false,
    priceYn: true,
  };
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }
  public componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      this.handleGeoSucces,
      this.handleGeoError
    );
  }
  public render() {
    const { toAddress, price, isMenuOpen, ride, address, distance, priceYn } = this.state;

    return (
      <HomePresenter
        mapRef={this.mapRef}
        toAddress={toAddress}
        onInputChange={this.onInputChange}
        onInputBlur={this.onInputBlur}
        price={price}
        toggleMenu={this.toggleMenu}
        isMenuOpen={isMenuOpen}
        ride={ride}
        address={address}
        distance={distance}
        requestRideFn={this.requestRideFn}
        acceptRideFn={this.acceptRideFn}
        priceYn={priceYn}
      />
    );
  }
  public handleGeoSucces: PositionCallback = (positon: Position) => {
    const {
      coords: { latitude, longitude }
    } = positon;


    this.setState({
      lat: latitude,
      lng: longitude
    });
    this.loadMap(latitude, longitude);
    this.reverseGeocodeAddress(latitude, longitude);
  };
  public handleGeoError: PositionErrorCallback = () => {
    console.log("No location");
  };
  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      minZoom: 8,
      zoom: 15
    };
    this.map = new maps.Map(mapNode, mapConfig);

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

    this.userMarker = new maps.Marker(userMarkerOptions);
    this.userMarker.setMap(this.map);

    this.map.addListener("dragend", this.handleDragEnd);
  };
  public handleDragEnd = () => {
    const newCenter = this.map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    this.setState({
      lat,
      lng
    });
    this.reverseGeocodeAddress(lat, lng);
  };
  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  public onInputBlur = async () => {
    
    const maps = google.maps;
    const { toAddress } = this.state;
    const result = await geoCode(toAddress);
    if (result !== false) {
      const { lat, lng, formatted_address: formatedAddress } = result;
      if (this.toMarker) {
        this.toMarker.setMap(null);
      }
      const toMarkerOptions: google.maps.MarkerOptions = {
        position: {
          lat,
          lng
        }
      };
      this.toMarker = new maps.Marker(toMarkerOptions);
      this.toMarker.setMap(this.map);
      const bounds = new maps.LatLngBounds();
      bounds.extend({ lat, lng });
      bounds.extend({ lat: this.state.lat, lng: this.state.lng });
      this.map.fitBounds(bounds);
      this.setState(
        {
          toAddress: formatedAddress,
          toLat: lat,
          toLng: lng
        },
        this.createPath
      );
      // this.map.panTo({ lat, lng });
    }
  };

  public createPath = () => {
    const { toLat, toLng, lat, lng } = this.state;
    if (this.directions) {
      this.directions.setMap(null);
    }
    const renderOptions: google.maps.DirectionsRendererOptions = {
      polylineOptions: {
        strokeColor: "#000"
      },
      suppressMarkers: true
    };
    this.directions = new google.maps.DirectionsRenderer(renderOptions);
    const directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
    const to = new google.maps.LatLng(toLat, toLng);
    const from = new google.maps.LatLng(lat, lng);

    const directionsOptions: google.maps.DirectionsRequest = {
      destination: to,
      origin: from,
      travelMode: google.maps.TravelMode.TRANSIT
    };

    directionsService.route(directionsOptions, this.handleRouteRequest);
  };

  public handleRouteRequest = (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => {

    if (status === google.maps.DirectionsStatus.OK) {
      const { routes } = result;
      const {
        distance: { text: distance },
        duration: { text: duration }
      } = routes[0].legs[0];

      this.directions.setDirections(result);
      this.directions.setMap(this.map);
      this.setState(
        {
          distance,
          duration
        },
        this.setPrice
      );
    } else {
      toast.error("위치를 찾을수가 없습니다.");
    }
  };

  public setPrice = () => {
    const { distance } = this.state;

    if (distance) {
      this.setState({
        price: Number(parseFloat(distance.replace(",", "").replace("km", "").replace(" ", "")) * 3000).toFixed(0)
      });
    }
  };

  public reverseGeocodeAddress = async (lat: number, lng: number) => {
    const reversedAddress = await reverseGeoCode(lat, lng);
    if (reversedAddress !== false) {
      this.setState({
        address: reversedAddress
      });
    }
  };

  public toggleMenu = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen
      };
    });
  };

  public requestRideFn = () => {
    this.setState(state => {
      return {
        ride: !state.ride
        , priceYn: !state.priceYn
      };
    });
  };

  public acceptRideFn = () => {

    const {history} = this.props;
    const { address, toAddress, distance, duration, price } = this.state;

    history.push({
      pathname: "/ride",
      state: {
        address
        , toAddress
        , distance
        , duration
        , price
      }
    });
  }
  
}

export default HomeContainer;
