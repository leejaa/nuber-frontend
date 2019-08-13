import React from "react";
import MenuPresenter from "./MenuPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { USER_PROFILE } from "src/SharedQueries";
import { ToggleDriving } from "src/types/api";

export const TOGGLE_DRIVING = gql`
  mutation toggleDriving {
    ToggleDrivingMode {
      ok
      error
    }
  }
`;


export default () => {

    const {data, loading} = useQuery(USER_PROFILE);
    const [ToggleDrivingMutation] = useMutation<ToggleDriving>(TOGGLE_DRIVING, {
        refetchQueries: () => [{ query: USER_PROFILE}]
    });
    
    const toggleDrivingFn = async() => {
        await ToggleDrivingMutation();
    }

    return (
        <div>
            <MenuPresenter
                data={data}
                loading={loading}
                 toggleDrivingFn={toggleDrivingFn}
            />
        </div>
    );
};