"use client";
import React from "react";
import _styles from "./css/classes.module.css";
import * as _utils from "./utils";
import Block from "./_Builtin/Block";
import Image2 from "./_Builtin/Image";

export function Image({
  as: _Component = Block,
  imageAltText = "__wf_reserved_inherit",
  imageImage = "",
  optionsOverlayVisibility = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "img_wrapper")}
      id={_utils.cx(
        _styles,
        "w-node-df1131d4-882e-6cb7-1d58-7a3f90a97ac0-90a97ac0"
      )}
      tag="div"
    >
      <Image2
        className={_utils.cx(_styles, "img")}
        height="auto"
        loading="lazy"
        src={imageImage}
        width="auto"
      />
      {optionsOverlayVisibility ? (
        <Block className={_utils.cx(_styles, "img_overlay")} tag="div" />
      ) : null}
    </_Component>
  );
}
