import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import AddressBar from "../../Components/AddressBar";
import Button from "../../Components/Button";
import Menu from "../../Components/Menu";
import RidePopUp from "../../Components/RidePopUp";
import styled from "../../typed-components";

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
user: UserProfileGetMyProfileUser | null;
}
  
export interface UserProfile {
GetMyProfile: UserProfileGetMyProfile;
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

  

const Container = styled.div``;

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  width: 80%;
`;

const RequestButton = ExtendedButton.extend`
  bottom: 250px;
`;

interface IProps {
//   isMenuOpen: boolean;
   toggleMenu: () => void;
   loading: boolean;
   mapRef: any;
//   toAddress: string;
//   onAddressSubmit: () => void;
//   price?: string;
//   data?: UserProfile;
//   onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   requestRideFn?: MutationFn;
//   acceptRideFn?: MutationFn;
//   nearbyRide?: GetRides;
}

const HomePresenter: React.SFC<IProps> = ({
//   isMenuOpen,
   toggleMenu,
   loading,
//   toAddress,
   mapRef,
//   onInputChange,
//   onAddressSubmit,
//   price,
//   data: { GetMyProfile: { user = null } = {} } = {},
//   nearbyRide: { GetNearbyRide: { ride = null } = {} } = {},
//   requestRideFn,
//   acceptRideFn
}) => (
  <Container>
    <Helmet>
      <title>Home | Number</title>
    </Helmet>
    <Sidebar
      sidebar={<Menu />}
      open={false}
      onSetOpen={toggleMenu}
      styles={{
        sidebar: {
          backgroundColor: "white",
          width: "80%",
          zIndex: "10"
        }
      }}
    >
      {!loading && <MenuButton onClick={toggleMenu}>|||</MenuButton>}
      {/* {user &&
        !user.isDriving && ( */}
          <React.Fragment>
            <AddressBar
              name={"toAddress"}
              onChange={()=>""}
              value={""}
              onBlur={null}
            />
            <ExtendedButton
              onClick={()=>""}
              disabled={false}
              value={true ? "Change address" : "Pick Address"}
            />
          </React.Fragment>
        {/* )} */}
      {/* {price && ( */}
        <RequestButton
          onClick={()=>""}
          disabled={false}
          value={`Request Ride ($2000)`}
        />
      {/* )} */}
      {/* {ride && ( */}
        <RidePopUp
          id={34343}
          pickUpAddress={"pickUpAddress"}
          dropOffAddress={"dropOffAddress"}
          price={5000}
          distance={"3000"}
          passengerName={"passengerName"}
          passengerPhoto={"passengerPhoto"}
          acceptRideFn={() => ""}
        />
      {/* )} */}
      <Map innerRef={mapRef} />
    </Sidebar>
  </Container>
);

export default HomePresenter;
