import React from "react";
import { gql } from "apollo-boost";
import PlacePresenter from "./PlacePresenter";
import { GET_PLACES } from "src/SharedQueries";
import { useMutation } from "react-apollo-hooks";

export const EDIT_PLACE = gql`
  mutation editPlace($id: Int!, $isFav: Boolean) {
    EditPlace(id: $id, isFav: $isFav) {
      ok
      error
    }
  }
`;





export default ({id, fav, name, address}) => {

    const [FavMutation] = useMutation(EDIT_PLACE, {
        variables: {
            isFav: !fav,
            id: id
        }
        , refetchQueries: () => [{ query: GET_PLACES}]
    });

    const onStarPress = async() => {

      try {
        await FavMutation();
      } catch (error) {
        console.log(`error : ${error}`);
      }
    }

    return (
        <div>
            <PlacePresenter
                onStarPress={onStarPress}
                fav={fav}
                name={name}
                address={address}
            />
        </div>
    );
}