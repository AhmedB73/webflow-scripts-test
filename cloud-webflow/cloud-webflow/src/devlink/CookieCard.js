"use client";
import React from "react";
import Block from "./_Builtin/Block";
import DOM from "./_Builtin/DOM";
import * as _utils from "./utils";
import _styles from "./CookieCard.module.css";

export function CookieCard({ as: _Component = Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "mz-cc-banner_wrapper")}
      tag="div"
    >
      <Block
        className={_utils.cx(_styles, "max-width-small-2", "is-cookie")}
        tag="div"
      >
        <Block tag="div">
          {
            "Pour vous offrir la meilleure expérience, ce site utilise des cookies. Vous pouvez choisir de les accepter ou non."
          }
        </Block>
      </Block>
      <Block
        className={_utils.cx(_styles, "mz-cc-banner_btn-wrapper")}
        tag="div"
      >
        <DOM
          className={_utils.cx(_styles, "mz-cc-banner_btn", "is-refuse")}
          fs-cc="deny"
          slot=""
          tag="button"
        >
          {"Refuser"}
        </DOM>
        <DOM
          className={_utils.cx(_styles, "mz-cc-banner_btn")}
          fs-cc="allow"
          slot=""
          tag="button"
        >
          {"Accepter"}
        </DOM>
      </Block>
    </_Component>
  );
}
