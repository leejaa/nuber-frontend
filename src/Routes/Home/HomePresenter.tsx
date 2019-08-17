import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import AddressBar from "../../Components/AddressBar";
import Button from "../../Components/Button";
import Menu from "../../Components/Menu";
import styled from "../../typed-components";
import RidePopUp from "src/Components/RidePopUp";

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
  mapRef: any;
  isMenuOpen: boolean;
  priceYn: boolean;
  ride: boolean;
  loading: boolean;
  toggleMenu: () => void;
  // loading: boolean;
  toAddress: string;
  distance: string;
  address: string;
  // onAddressSubmit: () => void;
  price?: number;
  // data?: any;
   onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   onInputBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
   onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
   requestRideFn?: any;
   acceptRideFn?: any;
  // nearbyRide?: any;
}

const HomePresenter: React.SFC<IProps> = ({
  mapRef,
  isMenuOpen,
  toggleMenu,
   toAddress,
   address,
   onInputChange,
   onInputBlur,
  price,
  priceYn,
  ride,
  distance,
  loading,
   requestRideFn,
   acceptRideFn,
   onKeyPress
}) => (
  <Container>
    <Helmet>
      <title>우버 홈</title>
    </Helmet>
    <Sidebar
      sidebar={<Menu />}
      open={isMenuOpen}
      onSetOpen={toggleMenu}
      styles={{
        sidebar: {
          backgroundColor: "white",
          width: "80%",
          zIndex: "10"
        }
      }}
    >
      <MenuButton onClick={toggleMenu}>|||</MenuButton>
      
          <React.Fragment>
            <AddressBar
              name={"toAddress"}
              onChange={onInputChange}
              value={toAddress}
              onBlur={onInputBlur}
              onKeyPress={onKeyPress}
            />
            <ExtendedButton
              onClick={onInputBlur}
              disabled={false}
              value={loading ? "장소를 검색중입니다..." : "목적지 검색"}
            />
          </React.Fragment>

          {price && priceYn && (
            <RequestButton
              onClick={requestRideFn}
              disabled={toAddress === ""}
              value={`요청 (${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원)`}

            />
          )}

          {ride && (
            <RidePopUp
              pickUpAddress={address}
              dropOffAddress={toAddress}
              price={price as any}
              distance={distance}
              acceptRideFn={acceptRideFn}
            />
          )}


      <Map innerRef={mapRef} />
    </Sidebar>
  </Container>
);

export default HomePresenter;
