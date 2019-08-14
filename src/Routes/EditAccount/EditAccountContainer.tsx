import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import EditAccountPresenter from "./EditAccountPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import axios from "axios";
import { USER_PROFILE } from "src/SharedQueries";
import {
    UpdateProfile,
    UpdateProfileVariables,
  } from "../../types/api";

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $firstName: String!
    $lastName: String!
    $email: String!
    $profilePhoto: String!
  ) {
    UpdateMyProfile(
      firstName: $firstName
      lastName: $lastName
      email: $email
      profilePhoto: $profilePhoto
    ) {
      ok
      error
    }
  }
`;



export default ({history}) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [uploading, setUploading] = useState(false);

    const {data, loading} = useQuery(USER_PROFILE);
    const [UpdateProfileMutation] = useMutation<UpdateProfile, UpdateProfileVariables>(UPDATE_PROFILE, {
        refetchQueries: () => [{ query: USER_PROFILE}]
    });

    useEffect(() => {

        if(data && data.GetMyProfile){
            const { GetMyProfile : { user } } = data;

            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setProfilePhoto(user.profilePhoto || "http://mblogthumb2.phinf.naver.net/20150427_261/ninevincent_1430122791768m7oO1_JPEG/kakao_1.jpg?type=w2");
        }

    }, [data])

    const onSubmit = async() => {

        setUploading(true);

        await UpdateProfileMutation({
            variables : {
                firstName
                , lastName
                , email
                , profilePhoto
            }
        });

        setUploading(false);
    }

    const onInputChange = async event => {
        const {
            target: { name, value, files }
          } = event;

        if(files){
            setUploading(true);
            const formData = new FormData();
            formData.append("file", files[0]);
            formData.append("api_key", "518252783565389");
            formData.append("upload_preset", "nuber-20190814");
            formData.append("timestamp", String(Date.now() / 1000));
            const {
            data: { secure_url }
            } = await axios.post(
                "https://api.cloudinary.com/v1_1/dbqgymmrx/image/upload",
                formData
            );
            if (secure_url) {
                setProfilePhoto(secure_url);
                setUploading(false);
            }
        }


        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;

            case 'lastName':
                setLastName(value);
                break;

            case 'email':
                setEmail(value);
                break;
    
            default:
                break;
        }
    }

    console.log(`data : ${JSON.stringify(data)}`);

    return (
        <div>
            <EditAccountPresenter
                loading={loading}
                uploading={uploading}
                firstName={firstName}
                lastName={lastName}
                email={email}
                profilePhoto={profilePhoto}
                onSubmit={onSubmit}
                onInputChange={onInputChange}
            />
        </div>
    );
}