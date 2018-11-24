import React, { Component } from "react";
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

class MenuBar extends Component {
  state = {
  };
  render() {
    return <MetisMenu content={menu} />;
  }
}

export default MenuBar;
