"use client";
import React from "react";
import _styles from "./css/classes.module.css";
import * as _utils from "./utils";
import Block from "./_Builtin/Block";
import DOM from "./_Builtin/DOM";
import Image from "./_Builtin/Image";

export function MapRecherche({
  as: _Component = Block,
  image = "https://cdn.prod.website-files.com/69c4fbdddbeddb6a9803391e/69c4fbeec4cd900022857e9d_Ico%CC%82ne%20Recherche%20(1).png",
  slot = "",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "wrapper-barre_recherche")}
      tag="div"
    >
      {slot ?? (
        <>
          <DOM
            className={_utils.cx(_styles, "div-block")}
            id={_utils.cx(
              _styles,
              "w-node-_77a2e998-672e-9484-7f1e-49b1089a685d-089a685c"
            )}
            id=""
            slot=""
            tag="input"
          />
          <DOM
            className={_utils.cx(_styles, "button-2")}
            id={_utils.cx(
              _styles,
              "w-node-_77a2e998-672e-9484-7f1e-49b1089a685e-089a685c"
            )}
            slot=""
            tag="button"
          >
            <Image
              alt=""
              className={_utils.cx(_styles, "image")}
              height="auto"
              loading="lazy"
              src={image}
              width="auto"
            />
          </DOM>
        </>
      )}
    </_Component>
  );
}
