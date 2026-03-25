"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function Recherche(props) {
  return (
    <input 
      {...props} /* Cela permet de recevoir le value et le onChange de App.jsx */
      className="recherche w-input" 
      /* garde tes autres classes Webflow ici */
    />
  );
}
