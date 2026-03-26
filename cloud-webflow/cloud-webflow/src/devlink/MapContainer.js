"use client";
import React from "react";
import Block from "./_Builtin/Block";
import * as _utils from "./utils";
import _styles from "./MapContainer.module.css";

export function MapContainer({ as: _Component = Block }) {
  return (
    <_Component className={_utils.cx(_styles, "map_container")} tag="div" />
  );
}
