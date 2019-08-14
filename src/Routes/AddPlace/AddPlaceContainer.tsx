import React, { useState } from "react";
import AddPlacePresenter from "./AddPlacePresenter";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import { AddPlace, AddPlaceVariables } from "src/types/api";
import { GET_PLACES } from "src/SharedQueries";

export const ADD_PLACE = gql`
  mutation addPlace(
    $name: String!
    $lat: Float!
    $lng: Float!
    $address: String!
    $isFav: Boolean!
  ) {
    AddPlace(
      name: $name
      lat: $lat
      lng: $lng
      address: $address
      isFav: $isFav
    ) {
      ok
      error
    }
  }
`;



export default ({history}) => {

    const [address, setAddress] = useState(history.location.state && history.location.state.address || "");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [lat] = useState(history.location.state && history.location.state.lat || 0);
    const [lng] = useState(history.location.state && history.location.state.lng || 0);

    const [AddPlaceMutation] = useMutation<AddPlace, AddPlaceVariables>(ADD_PLACE, {
        refetchQueries: () => [{ query: GET_PLACES}]
    });

    const onInputChange = async event => {
        const {
            target: { name : name2, value }
          } = event;

        switch (name2) {
            case 'name':
                setName(value);
                break;

            case 'address':
                setAddress(value);
                break;

            default:
                break;
        }
    }

    const onSubmit = async() => {

        try {
            setLoading(true);
            await AddPlaceMutation({
                variables : {
                    address,
                    isFav: false,
                    lat,
                    lng,
                    name
                }
            });
        } catch (error) {
            console.log(`error : ${error}`);
        }finally{
            setLoading(false);

            history.push({
                pathname: "/places",
            });
        }
    }

    return (
        <div>
            <AddPlacePresenter
                onInputChange={onInputChange}
                address={address}
                name={name}
                loading={loading}
                onSubmit={onSubmit}
                pickedAddress={lat !== 0 && lng !== 0}
            />
        </div>
    );
}