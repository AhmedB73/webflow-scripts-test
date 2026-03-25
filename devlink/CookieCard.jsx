"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function CookieCard({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className="mz-cc-banner_wrapper" tag="div">
      <_Builtin.Block className="max-width-small-2 is-cookie" tag="div">
        <_Builtin.Block tag="div">
          {
            "Pour vous offrir la meilleure expérience, ce site utilise des cookies. Vous pouvez choisir de les accepter ou non."
          }
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className="mz-cc-banner_btn-wrapper" tag="div">
        <_Builtin.DOM
          className="mz-cc-banner_btn is-refuse"
          tag="button"
          slot=""
          fsCc="deny"
        >
          {"Refuser"}
        </_Builtin.DOM>
        <_Builtin.DOM
          className="mz-cc-banner_btn"
          tag="button"
          slot=""
          fsCc="allow"
        >
          {"Accepter"}
        </_Builtin.DOM>
      </_Builtin.Block>
    </_Component>
  );
}
