"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Recherche } from "./Recherche";
import { RechercheBtn } from "./RechercheBtn";

// ... tes imports habituels au dessus ...

export function BottomRecherche({
  as: _Component = _Builtin.Block,
  rechercheBtnImage = "...",
  // AJOUTE CETTE LIGNE ICI :
  rechercheInput = {}, 
}) {
  return (
    <_Component className="wrapper-barre_recherche" tag="div">
      {/* On passe les propriétés à ton composant Recherche */}
      <Recherche {...rechercheInput} /> 
      <RechercheBtn image={rechercheBtnImage} />
    </_Component>
  );
}
