export interface StartPhoneVerificationData {
    ok: boolean;
    error: string;
  }
  
export interface StartPhoneVerificationVar {
    phoneNumber: string;
  }

export interface VerifyPhoneData {
    ok: boolean;
    error: string | null;
    token: string | null;
  }
  
export interface VerifyPhoneVar {
    phoneNumber: string;
    key: string;
  }

  export interface UserProfileGetMyProfileUser {
    __typename: "User";
    id: number;
    profilePhoto: string | null;
    firstName: string;
    lastName: string;
    email: string | null;
    fullName: string | null;
    isDriving: boolean;
  }
  
export interface UserProfileGetMyProfile {
__typename: "GetMyProfileResponse";
ok: boolean;
error: string | null;
user: UserProfileGetMyProfileUser;
}
  
export interface UserProfile {
    GetMyProfile: UserProfileGetMyProfile;
}

export interface ToggleDrivingToggleDrivingMode {
    __typename: "ToggleDrivingModeResponse";
    ok: boolean;
    error: string | null;
  }
  
export interface ToggleDriving {
ToggleDrivingMode: ToggleDrivingToggleDrivingMode;
}

export interface UpdateProfileUpdateMyProfile {
    __typename: "UpdateMyProfileResponse";
    ok: boolean;
    error: string | null;
  }
  
  export interface UpdateProfile {
    UpdateMyProfile: UpdateProfileUpdateMyProfile;
  }
  
  export interface UpdateProfileVariables {
    firstName: string;
    lastName: string;
    email: string;
    profilePhoto: string;
  }


  export interface GetPlacesGetMyPlacesPlaces {
    __typename: "Place";
    id: number;
    name: string;
    address: string;
    isFav: boolean;
  }
  
  export interface GetPlacesGetMyPlaces {
    __typename: "GetMyPlacesResponse";
    ok: boolean;
    error: string | null;
    places: GetPlacesGetMyPlacesPlaces[] | null;
  }
  
  export interface GetPlaces {
    GetMyPlaces: GetPlacesGetMyPlaces;
  }

  export interface EditPlaceEditPlace {
    __typename: "EditPlaceResponse";
    ok: boolean;
    error: string | null;
  }
  
  export interface EditPlace {
    EditPlace: EditPlaceEditPlace;
  }
  
  export interface EditPlaceVariables {
    placeId: number;
    isFav?: boolean | null;
  }
  
  export interface AddPlaceAddPlace {
    __typename: "AddPlaceResponse";
    ok: boolean;
    error: string | null;
  }
  
  export interface AddPlace {
    AddPlace: AddPlaceAddPlace;
  }
  
  export interface AddPlaceVariables {
    name: string;
    lat: number;
    lng: number;
    address: string;
    isFav: boolean;
  }


  export interface AcceptRideUpdateRideStatus {
    __typename: "UpdateRideStatusResponse";
    ok: boolean;
    error: string | null;
    rideId: number | null;
  }
  
  export interface AcceptRide {
    UpdateRideStatus: AcceptRideUpdateRideStatus;
  }
  
  export interface AcceptRideVariables {
    rideId: number;
  }

  export interface GetDriversGetNearbyDriversDrivers {
    __typename: "User";
    id: number;
    lastLat: number | null;
    lastLng: number | null;
  }
  
  export interface GetDriversGetNearbyDrivers {
    __typename: "GetNearbyDriversResponse";
    ok: boolean;
    drivers: GetDriversGetNearbyDriversDrivers[] | null;
  }
  
  export interface GetDrivers {
    GetNearbyDrivers: GetDriversGetNearbyDrivers;
  }
  

  export interface GetRidesGetNearbyRideRidePassenger {
    __typename: "User";
    fullName: string | null;
    profilePhoto: string | null;
  }
  
  export interface GetRidesGetNearbyRideRide {
    __typename: "Ride";
    id: number;
    pickUpAddress: string;
    dropOffAddress: string;
    price: number;
    distance: string;
    passenger: GetRidesGetNearbyRideRidePassenger;
  }
  
  export interface GetRidesGetNearbyRide {
    __typename: "GetNearbyRideResponse";
    ok: boolean;
    error: string | null;
    ride: GetRidesGetNearbyRideRide | null;
  }
  
  export interface GetRides {
    GetNearbyRide: GetRidesGetNearbyRide;
  }
  

  export interface ReportMovementReportMovement {
    __typename: "ReportMovementResponse";
    ok: boolean;
  }
  
  export interface ReportMovement {
    ReportMovement: ReportMovementReportMovement;
  }
  
  export interface ReportMovementVariables {
    lat: number;
    lng: number;
  }
  

  export interface RequestRideRequestRideRide {
    __typename: "Ride";
    id: number;
  }
  
  export interface RequestRideRequestRide {
    __typename: "RequestRideResponse";
    ok: boolean;
    error: string | null;
    ride: RequestRideRequestRideRide | null;
  }
  
  export interface RequestRide {
    RequestRide: RequestRideRequestRide;
  }
  
  export interface RequestRideVariables {
    pickUpAddress: string;
    pickUpLat: number;
    pickUpLng: number;
    dropOffAddress: string;
    dropOffLat: number;
    dropOffLng: number;
    price: number;
    distance: string;
    duration: string;
  }
  