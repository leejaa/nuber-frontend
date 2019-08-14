import React from "react";
import PlacePresenter from "./PlacesPresenter";
import { GET_PLACES } from "src/SharedQueries";
import { useQuery } from "react-apollo-hooks";


export default ({history}) => {

  const {data, loading} = useQuery(GET_PLACES);

    return (
        <div>
            <PlacePresenter
              data = {data}
              loading = {loading}
            />
        </div>
    );
}