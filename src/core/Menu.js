import React, { Fragment, useEffect, useState } from "react";
import { signout, isAuthenticated } from '../auth';
import { Link, withRouter } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from "mdbreact";
import { getCategories } from "./apiCore";
import { itemTotal } from "./apiCart";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#1110ff" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => {
  const state = {
    isOpen: false
  };
  const [values, setValues] = useState({
    categories: [],
    category: "",
  });

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
        });
      }
    });
  };
  useEffect(() => {
    init();
  }, []);

  const toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }
  return (
    <MDBNavbar color="black" dark expand="sm" >
      <MDBNavbarBrand>
        <strong className="white-text">BANGPAN</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={state.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem isActive>
            <MDBNavLink style={isActive(history, "/")} to="/">Home</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavItem isActive>
              <MDBNavLink style={isActive(history, "/category")} to="/category">Category</MDBNavLink>
            </MDBNavItem>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          {/* ไม่ล็อกอิน  */}
          {!isAuthenticated() && (
            <Fragment>
              <MDBNavItem active className>
              </MDBNavItem>
              <MDBNavItem active className>
                <MDBNavLink style={isActive(history, "/signup")} to="/signup">signup</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem active>
                <MDBNavLink style={isActive(history, "/signin")} to="/signin">signin</MDBNavLink>
              </MDBNavItem>
            </Fragment>
          )}

          {/* ล็อกอินuser  */}
          {isAuthenticated() && (
            <Fragment>
              <MDBNavItem>
                <MDBNavLink className="waves-effect waves-light" style={isActive(history, "/cart")}
                  to="/cart"
                >
                  <MDBIcon icon="shopping-cart" />
                  <sup>
                    <small className="cart-badge red">{itemTotal()}</small>
                  </sup>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu right className="dropdown-defaul "  >
                    {isAuthenticated().user.role === 0 && (
                      <MDBDropdownItem href="/user/dashboard"  >Profile</MDBDropdownItem>
                    )}
                    {isAuthenticated().user.role === 1 && (
                      <Fragment>
                        <MDBDropdownItem href="/admin/dashboard"  >Profile Admin</MDBDropdownItem>
                        <MDBDropdownItem href="/create/category" >Category</MDBDropdownItem>
                      </Fragment>
                    )}
                    <MDBDropdownItem href="/create/product">Upload Product</MDBDropdownItem>

                    <MDBDropdownItem href="/user/orders">History</MDBDropdownItem>

                    <MDBDropdownItem href="/" onClick={() => signout(() => {
                      history.push("/");
                    })
                    }>Sign out</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>

            </Fragment>
          )}
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>

  );
};


export default withRouter(Menu);