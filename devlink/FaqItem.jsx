"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function FaqItem({
  as: _Component = _Builtin.DOM,
  questions = "Ceci est la question",
  rPonse = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
}) {
  return (
    <_Component
      className="faq_details"
      id="w-node-_111f254f-62e7-cbb5-ec2b-6fe60241cb82-0241cb82"
      tag="details"
      slot=""
    >
      <_Builtin.DOM
        className="faq_summary"
        id="w-node-_111f254f-62e7-cbb5-ec2b-6fe60241cb83-0241cb82"
        tag="summary"
        slot=""
      >
        {questions}
      </_Builtin.DOM>
      <_Builtin.Paragraph className="faq_answer">{rPonse}</_Builtin.Paragraph>
    </_Component>
  );
}
