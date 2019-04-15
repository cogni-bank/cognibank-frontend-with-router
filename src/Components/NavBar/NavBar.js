import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Cogni-Bank</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/AccountDetails" to="/AccountDetails">
                  Accounts
                </Nav.Link>
                <Nav.Link href="/transactions" to="/transactions">
                  Transactions
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link>{this.props.person}</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </>
      </React.Fragment>
    );
  }
}

export default NavBar;
