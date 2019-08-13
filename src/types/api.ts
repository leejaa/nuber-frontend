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