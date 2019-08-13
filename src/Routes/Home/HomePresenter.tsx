import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "../../typed-components";
import Menu from "../../Components/Menu";


const Container = styled.div``;

// const MenuButton = styled.button`
//   appearance: none;
//   padding: 10px;
//   position: absolute;
//   top: 10px;
//   left: 10px;
//   text-align: center;
//   font-weight: 800;
//   border: 0;
//   cursor: pointer;
//   font-size: 20px;
//   transform: rotate(90deg);
//   z-index: 2;
//   background-color: transparent;
// `;

// const Map = styled.div`
//   position: absolute;
//   height: 100%;
//   width: 100%;
// `;

// const ExtendedButton = styled(Button)`
//   position: absolute;
//   bottom: 50px;
//   left: 0;
//   right: 0;
//   margin: auto;
//   z-index: 10;
//   height: auto;
//   width: 80%;
// `;

// const RequestButton = ExtendedButton.extend`
//   bottom: 250px;
// `;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void
}

const HomePresenter : React.SFC<IProps> = ({
  isMenuOpen
  , toggleMenu
}) => {



    return (
        <Container>
          <Helmet>
            <title>우버 홈</title>
          </Helmet>
          <Sidebar
            sidebar={<Menu/>}
            open={isMenuOpen}
            onSetOpen={toggleMenu}
            styles={{
              sidebar: {
                backgroundColor: "white",
                width: "80%",
                zIndex: "10"
              }
            }}
          >
          <button onClick={toggleMenu}>open side bar</button>

          </Sidebar>

        </Container>
    );
};

export default HomePresenter;