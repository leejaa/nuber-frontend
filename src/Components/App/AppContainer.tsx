import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import theme from "../../theme";
import { ThemeProvider } from "../../typed-components";
import AppPresenter from "./AppPresenter";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

export default () => {

    const {
        data : { isLoggedIn }
      } : any = useQuery(QUERY);

      console.log(`isLoggedIn : ${isLoggedIn}`);

    return (
        <React.Fragment>
          <ThemeProvider theme={theme}>
            <AppPresenter isLoggedIn={isLoggedIn} />
          </ThemeProvider>
          <ToastContainer draggable={true} position={"bottom-center"} />
        </React.Fragment>
      );
}

