import React from "react";
import styled from "../../typed-components";
import Button from "../Button";
import { useQuery } from "react-apollo-hooks";
import { USER_PROFILE } from "src/SharedQueries";

interface IProps {
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  acceptRideFn: any;
}

const Container = styled.div`
  background-color: white;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 80%;
  height: 60%;
  z-index: 9;
  padding: 20px;
`;

const Title = styled.h4`
  font-weight: 800;
  margin-top: 30px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

const Data = styled.span`
  color: ${props => props.theme.blueColor};
`;

const Img = styled.img`
  border-radius: 50%;
  margin-right: 5px;
  height: 60px;
  width: 60px;
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const RidePopUp: React.SFC<IProps> = ({
  pickUpAddress,
  dropOffAddress,
  price,
  distance,
  acceptRideFn
}) => {

  const {data, loading} = useQuery(USER_PROFILE);

  console.log(`data : ${JSON.stringify(data)}`);

  return (
      <Container>
        <Title>출발지</Title>
        <Data>{pickUpAddress}</Data>
        <Title>도착지</Title>
        <Data>{dropOffAddress}</Data>
        <Title>가격</Title>
        <Data>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Data>
        <Title>거리</Title>
        <Data>{distance}</Data>
        <Title>승객:</Title>
        <Passenger>
          <Img src={loading ? "" : data.GetMyProfile.user.profilePhoto} />
          <Data>{loading ? "로딩중..." : data.GetMyProfile.user.fullName}</Data>
        </Passenger>
        <Button
          onClick={() => acceptRideFn()}
          value={"택시기사 요청"}
        />
      </Container>
  );
}

export default RidePopUp;
