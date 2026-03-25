"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function Navbar({ as: _Component = _Builtin.NavbarWrapper }) {
  return (
    <_Component
      className="nav_component"
      tag="div"
      config={{
        animation: "default",
        collapse: "medium",
        docHeight: false,
        duration: 400,
        easing: "ease",
        easing2: "ease",
        noScroll: false,
      }}
    >
      <_Builtin.Block className="padding-global" tag="div">
        <_Builtin.Block className="nav_container" tag="div">
          <_Builtin.NavbarBrand
            className="nav_brand"
            options={{
              href: "#",
            }}
          >
            <_Builtin.Image
              className="nav_logo"
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/69b18e54f46d41e6ecf2bf9e/69b18e56f46d41e6ecf2c041_client-first-logo-white.svg"
            />
          </_Builtin.NavbarBrand>
          <_Builtin.NavbarMenu className="nav_menu" tag="nav" role="navigation">
            <_Builtin.NavbarLink
              className="nav_menu_link"
              options={{
                href: "https://finsweet.com/client-first/docs",
              }}
            >
              {"Read the docs"}
            </_Builtin.NavbarLink>
            <_Builtin.NavbarLink
              className="nav_menu_link"
              options={{
                href: "https://finsweet.com",
              }}
            >
              {"About Finsweet"}
            </_Builtin.NavbarLink>
          </_Builtin.NavbarMenu>
          <_Builtin.NavbarButton className="nav_button" tag="div">
            <_Builtin.Icon
              widget={{
                type: "icon",
                icon: "nav-menu",
              }}
            />
          </_Builtin.NavbarButton>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
