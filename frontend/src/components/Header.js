import React from "react";
import { Navbar } from "react-bootstrap";

const Header = ({ title }) => {
    // = (props) => ... const { title } = props; ..use {title}
    // = (props) => ... use {props.title}
  return (
    <Navbar bg="dark" variant="light">
        <Navbar.Brand href="/"> {title} </Navbar.Brand>
    </Navbar>
  );
};

export default Header;