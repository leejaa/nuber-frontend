import React from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import styled from "../../typed-components";

const Container = styled.div`
  padding: 40px;
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
  margin-right: 20px;
  max-width: 50px;
  height: 50px;
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  margin: 30px 0px;
`;

const ExtendedButton = styled(Button)`
  margin-bottom: 30px;
`;

interface IProps {
  loading: boolean;
  address: string
  , toAddress: string
  , distance: string
  , duration: string
  , price: string
  , data: any
}

const RidePresenter: React.SFC<IProps> = ({
  loading
  , address
  , toAddress
  , distance
  , duration
  , price
  , data: { GetMyProfile: { user = null } = {} } = {},
}) => (
  <Container>
    {
      !loading && (
        <React.Fragment>
          <Title>승객</Title>
          <Passenger>
            <Img src={user.profilePhoto ||
                      "http://mblogthumb2.phinf.naver.net/20150427_261/ninevincent_1430122791768m7oO1_JPEG/kakao_1.jpg?type=w2"} />
            <Data>{user.fullName}</Data>
          </Passenger>
          {true && (
            <React.Fragment>
              <Title>운전기사</Title>
              <Passenger>
                <Img src="https://img.hankyung.com/photo/201905/AA.19559299.1.jpg" />
                <Data>기사님</Data>
              </Passenger>
            </React.Fragment>
          )}
          <Title>From</Title>
          <Data>{address}</Data>
          <Title>To</Title>
          <Data>{toAddress}</Data>
          <Title>가격</Title>
          <Data>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Data>
          <Title>거리</Title>
          <Data>{distance}</Data>
          <Title>소요시간</Title>
          <Data>{duration}</Data>
          <Title>상태</Title>
          <Data>이동중</Data>
          <Buttons>
            
              <Link to={`/chat`}>
                <ExtendedButton value={"기사님과 대화하기"} onClick={null} />
              </Link>
          </Buttons>
        </React.Fragment>
      )}
  </Container>
);

export default RidePresenter;
