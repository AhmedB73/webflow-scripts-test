"use client";
import React from "react";
import _styles from "./css/classes.module.css";
import * as _utils from "./utils";
import DOM from "./_Builtin/DOM";
import Paragraph from "./_Builtin/Paragraph";

export function FaqItem({
  as: _Component = DOM,
  questions = "Ceci est la question",
  rPonse = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "faq_details")}
      id={_utils.cx(
        _styles,
        "w-node-_111f254f-62e7-cbb5-ec2b-6fe60241cb82-0241cb82"
      )}
      slot=""
      tag="details"
    >
      <DOM
        className={_utils.cx(_styles, "faq_summary")}
        id={_utils.cx(
          _styles,
          "w-node-_111f254f-62e7-cbb5-ec2b-6fe60241cb83-0241cb82"
        )}
        slot=""
        tag="summary"
      >
        {questions}
      </DOM>
      <Paragraph className={_utils.cx(_styles, "faq_answer")}>
        {rPonse}
      </Paragraph>
    </_Component>
  );
}
