import React, { Component } from "react";
import Router from "../Routes"
import MetisMenu from "react-metismenu";


const menu = [
  {
    icon: "fa fa-home",
    label: "Home",
    to: "/home"
  },
  {
    icon: "fa fa-search",
    label: "Search",
    to: "/search"
  },
  {
    icon: "fas fa-angle-right",
    label: "About",
    to: "/about"
  },
  {
    icon: "fa fa-sign-out-alt",
    label: "Logout"
  }
];

class MenuBAr extends Component {
  state = {
  };
  render() {
    return <MetisMenu content={menu} />;
  }
}

export default MenuBAr;
