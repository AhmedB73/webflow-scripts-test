"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function Image({
  as: _Component = _Builtin.Block,
  imageImage = "",
  imageAltText = "__wf_reserved_inherit",
  optionsOverlayVisibility = false,
}) {
  return (
    <_Component
      className="img_wrapper"
      id="w-node-df1131d4-882e-6cb7-1d58-7a3f90a97ac0-90a97ac0"
      tag="div"
    >
      <_Builtin.Image
        className="img"
        loading="lazy"
        width="auto"
        height="auto"
        src={imageImage}
      />
      {optionsOverlayVisibility ? (
        <_Builtin.Block className="img_overlay" tag="div" />
      ) : null}
    </_Component>
  );
}
