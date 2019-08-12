import React from "react";
import { Link } from "react-router-dom";
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

export interface ToggleDrivingToggleDrivingMode {
    __typename: "ToggleDrivingModeResponse";
    ok: boolean;
    error: string | null;
  }
  
export interface ToggleDriving {
ToggleDrivingMode: ToggleDrivingToggleDrivingMode;
}

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  background-color: black;
  height: 20%;
  margin-bottom: 30px;
  padding: 0 15px;
  color: white;
`;

const SLink = styled(Link)`
  font-size: 22px;
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-weight: 400;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  background-color: grey;
  border-radius: 40px;
  overflow: hidden;
`;

const Name = styled.h2`
  font-size: 22px;
  color: white;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Rating = styled.h5`
  font-size: 18px;
  color: white;
`;

const Text = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
  height: 100%;
  align-items: center;
`;

interface IToggleProps {
  isDriving: boolean;
}

const ToggleDriving = styled<IToggleProps, any>("button")`
  -webkit-appearance: none;
  background-color: #1abc9c;
  width: 100%;
  color: white;
  font-size: 18px;
  border: 0;
  padding: 15px 0px;
  cursor: pointer;
`;

interface IProps {
//   data?: userProfile;
   loading: boolean;
//   toggleDrivingFn: MutationFn<toggleDriving>;
}

const MenuPresenter: React.SFC<IProps> = ({
//   data: { GetMyProfile: { user = null } = {} } = {},
   loading,
//   toggleDrivingFn
}) => (
  <Container>
    {/* {!loading &&
      user &&
      user.fullName && ( */}
        <React.Fragment>
          <Header>
            <Grid>
              <Link to={"/edit-account"}>
                <Image
                  src={
                    "https://lh3.googleusercontent.com/-CTwXMuZRaWw/AAAAAAAAAAI/AAAAAAAAAUg/8T5nFuIdnHE/photo.jpg"
                  }
                />
              </Link>
              <Text>
                <Name>풀네임</Name>
                <Rating>4.5</Rating>
              </Text>
            </Grid>
          </Header>
          <SLink to="/trips">Your Trips</SLink>
          <SLink to="/settings">Settings</SLink>
          <ToggleDriving onClick={()=>""} isDriving={false}>
            {false ? "Stop driving" : "Start driving"}
          </ToggleDriving>
        </React.Fragment>
  </Container>
);

export default MenuPresenter;
