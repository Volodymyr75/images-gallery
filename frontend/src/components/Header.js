import React from "react";
import { Navbar, Container } from "react-bootstrap";

const navbarStyle = {
    backgroundColor: 'lightblue'

}

const Header = ({ title }) => {
    // = (props) => ... const { title } = props; ..use {title}
    // = (props) => ... use {props.title}
  return (
    <Navbar style={navbarStyle} variant="light">
        <Container>
            <Navbar.Brand href="/"> {title} </Navbar.Brand>
        </Container>
        
    </Navbar>
  );
};

export default Header;