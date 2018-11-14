import React, { Component } from "react";
import ReactDOM from "react-dom";
import MetisMenu from "react-metismenu";

const menu = [
  {
    icon: "fa fa-home",
    label: "Home",
    to: "menu-1"
  },
  {
    icon: "fa fa-search",
    label: "Search",
    to: "menu-2"
  },
  {
    icon: "bolt",
    label: "Menu 3",
    content: [
      {
        icon: "bolt",
        label: "Sub Menu",
        to: "sub-menu"
      }
    ]
  },
  {
    icon: "fas fa-angle-right",
    label: "About"
  },
  {
    icon: "fa fa-sign-out-alt",
    label: "Logout"
  }
];

class MenuBAr extends Component {
  state = {};
  render() {
    return <MetisMenu content={menu} />;
  }
}

export default MenuBAr;
