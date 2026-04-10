"use client";
import React from "react";
import _styles from "./css/classes.module.css";
import * as _utils from "./utils";
import Block from "./_Builtin/Block";
import Image from "./_Builtin/Image";

export function BarRechercheFilter({
  as: _Component = Block,
  image = "https://cdn.prod.website-files.com/69c4fbdddbeddb6a9803391e/69c4fbeec4cd900022857e9d_Ico%CC%82ne%20Recherche%20(1).png",
  isMenuOpen = true,
  menuOptionsSlot = "",
  onSearchClick = {},
  onToggleMenu = {},
  text1 = "supermarché",
  text2 = "Arrondissement",
  text3 = "This is some text inside of a div block.",
  text4 = "This is some text inside of a div block.",
  text5 = "This is some text inside of a div block.",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "container-bar_recherche_filter")}
      tag="div"
    >
      <Block
        className={_utils.cx(_styles, "container-filter_recherche")}
        tag="div"
      >
        <Block
          className={_utils.cx(_styles, "wrapper-filter_recherche")}
          tag="div"
          {...onToggleMenu}
        >
          <Block className={_utils.cx(_styles, "wrapper-rond")} tag="div" />
          <Block tag="div">{text1}</Block>
        </Block>
        <Block
          className={_utils.cx(_styles, "btn-recherche")}
          id={_utils.cx(
            _styles,
            "w-node-_304472af-eb91-1f80-0efa-dc0b66169238-6616922e"
          )}
          tag="div"
          {...onSearchClick}
        >
          <Image
            alt=""
            className={_utils.cx(_styles, "image-2")}
            height="auto"
            loading="lazy"
            src={image}
            width="auto"
          />
        </Block>
      </Block>
      {isMenuOpen ? (
        <Block
          className={_utils.cx(_styles, "choix-filter-bar_none")}
          tag="div"
        >
          {menuOptionsSlot ?? (
            <>
              <Block tag="div">{text3}</Block>
              <Block tag="div">{text4}</Block>
              <Block tag="div">{text5}</Block>
            </>
          )}
        </Block>
      ) : null}
    </_Component>
  );
}
