"use client";
import React from "react";
import _styles from "./css/classes.module.css";
import * as _utils from "./utils";
import Block from "./_Builtin/Block";

export function MapContainer({ as: _Component = Block }) {
  return (
    <_Component className={_utils.cx(_styles, "map_container")} tag="div" />
  );
}
