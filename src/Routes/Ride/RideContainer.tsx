import React from "react";
import RidePresenter from "./RidePresenter";
import { useQuery } from "react-apollo-hooks";
import { USER_PROFILE } from "src/SharedQueries";

export default ({history}) => {

    const { location: { state: {
        address = ""
        , toAddress = ""
        , distance = ""
        , duration = ""
        , price = ""
    } = {} } } = history;

    const {data, loading} = useQuery(USER_PROFILE);

    console.log(`loading : ${loading}`);
    console.log(`data : ${JSON.stringify(data)}`);

    return (
        <div>
          <RidePresenter
            loading={loading}
            address={address}
            toAddress={toAddress}
            distance={distance}
            duration={duration}
            price={price}
            data={data}
          />
        </div>
      );
}
