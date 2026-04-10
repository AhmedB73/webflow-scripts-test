"use client";
import React from "react";
import _styles from "./css/classes.module.css";
import * as _utils from "./utils";
import Block from "./_Builtin/Block";
import Icon from "./_Builtin/Icon";
import Image from "./_Builtin/Image";
import NavbarBrand from "./_Builtin/NavbarBrand";
import NavbarButton from "./_Builtin/NavbarButton";
import NavbarLink from "./_Builtin/NavbarLink";
import NavbarMenu from "./_Builtin/NavbarMenu";
import NavbarWrapper from "./_Builtin/NavbarWrapper";

export function Navbar({ as: _Component = NavbarWrapper }) {
  return (
    <_Component
      className={_utils.cx(_styles, "nav_component")}
      config={{
        animation: "default",
        collapse: "medium",
        docHeight: false,
        duration: 400,
        easing: "ease",
        easing2: "ease",
        noScroll: false,
      }}
      tag="div"
    >
      <Block className={_utils.cx(_styles, "padding-global")} tag="div">
        <Block className={_utils.cx(_styles, "nav_container")} tag="div">
          <NavbarBrand
            className={_utils.cx(_styles, "nav_brand")}
            options={{
              href: "#",
            }}
          >
            <Image
              alt=""
              className={_utils.cx(_styles, "nav_logo")}
              height="auto"
              loading="lazy"
              src="https://cdn.prod.website-files.com/69c4fbdddbeddb6a9803391e/69c4fbdfdbeddb6a980339e6_client-first-logo-white.svg"
              width="auto"
            />
          </NavbarBrand>
          <NavbarMenu
            className={_utils.cx(_styles, "nav_menu")}
            role="navigation"
            tag="nav"
          >
            <NavbarLink
              className={_utils.cx(_styles, "nav_menu_link")}
              options={{
                href: "https://finsweet.com/client-first/docs",
              }}
            >
              {"Read the docs"}
            </NavbarLink>
            <NavbarLink
              className={_utils.cx(_styles, "nav_menu_link")}
              options={{
                href: "https://finsweet.com",
              }}
            >
              {"About Finsweet"}
            </NavbarLink>
          </NavbarMenu>
          <NavbarButton className={_utils.cx(_styles, "nav_button")} tag="div">
            <Icon
              widget={{
                type: "icon",
                icon: "nav-menu",
              }}
            />
          </NavbarButton>
        </Block>
      </Block>
    </_Component>
  );
}
