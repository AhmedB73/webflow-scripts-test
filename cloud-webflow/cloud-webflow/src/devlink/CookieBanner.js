"use client";
import React from "react";
import Block from "./_Builtin/Block";
import { CookieCard } from "./CookieCard";
import * as _utils from "./utils";
import _styles from "./CookieBanner.module.css";

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
