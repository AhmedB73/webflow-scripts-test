"use client";
import React from "react";
import Block from "./_Builtin/Block";
import { Image } from "./Image";
import * as _utils from "./utils";
import _styles from "./Card.module.css";

export function Card({
  as: _Component = Block,
  imageImageAltText = "__wf_reserved_inherit",
  imageImageImage = "",
  imageOptionsOverlayVisibility = false,
  text1 = "This is some text inside of a div block.",
  text2 = "This is some text inside of a div block.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "card")} tag="div">
      <Block className={_utils.cx(_styles, "wrapper-img")} tag="div">
        <Image
          imageAltText={imageImageAltText}
          imageImage={imageImageImage}
          optionsOverlayVisibility={imageOptionsOverlayVisibility}
        />
      </Block>
      <Block className={_utils.cx(_styles, "text-wrapper")} tag="div">
        <Block tag="div">{text1}</Block>
        <Block tag="div">{text2}</Block>
      </Block>
    </_Component>
  );
}
