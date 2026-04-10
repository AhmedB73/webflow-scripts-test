"use client";
import React from "react";
import _styles from "./css/classes.module.css";
import * as _utils from "./utils";
import Block from "./_Builtin/Block";
import { CookieCard } from "./CookieCard";

export function CookieBanner({ as: _Component = Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "mz-cc-banner_componant")}
      fs-cc="banner"
      tag="div"
    >
      <CookieCard />
    </_Component>
  );
}
