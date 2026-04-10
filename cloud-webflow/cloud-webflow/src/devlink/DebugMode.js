"use client";
import React from "react";
import _styles from "./css/classes.module.css";
import * as _utils from "./utils";
import HtmlEmbed from "./_Builtin/HtmlEmbed";

export function DebugMode({ as: _Component = HtmlEmbed }) {
  return (
    <_Component
      className={_utils.cx(_styles, "debug-mode")}
      content=""
      value="%3C!--%20%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%20%20%20%20%20%F0%9F%94%8D%20DEBUG%20MODE%20-%20%C3%80%20SUPPRIMER%20EN%20PROD%0A%20%20%20%20%20%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%20--%3E%0A%3Cscript%3E%0Aif%20(window.location.search.includes('debug%3Dtrue'))%20%7B%0A%20%20document.body.setAttribute('data-debug'%2C%20'true')%3B%0A%20%20%0A%20%20%2F%2F%20Badge%20visuel%0A%20%20const%20badge%20%3D%20document.createElement('div')%3B%0A%20%20badge.innerHTML%20%3D%20'%F0%9F%94%8D%20DEBUG'%3B%0A%20%20badge.style.cssText%20%3D%20'position%3Afixed%3Btop%3A20px%3Bright%3A20px%3Bbackground%3A%23ff0000%3Bcolor%3Awhite%3Bpadding%3A10px%2015px%3Bborder-radius%3A6px%3Bz-index%3A999999%3Bfont-weight%3Abold%3Bfont-size%3A12px%3B'%3B%0A%20%20document.body.appendChild(badge)%3B%0A%7D%0A%3C%2Fscript%3E%0A%0A%3Cstyle%3E%0A%2F*%20%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A%20%20%20%F0%9F%94%8D%20DEBUG%20CSS%20-%20%C3%80%20SUPPRIMER%20EN%20PROD%0A%20%20%20%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%20*%2F%0A%0A%2F*%20Liens%20non%20connect%C3%A9s%20*%2F%0Abody%5Bdata-debug%3D%22true%22%5D%20a%5Bhref%3D%22%23%22%5D%2C%0Abody%5Bdata-debug%3D%22true%22%5D%20a%5Bhref%3D%22%22%5D%20%7B%0A%20%20outline%3A%203px%20solid%20red%20!important%3B%0A%20%20outline-offset%3A%202px%3B%0A%7D%0A%0A%2F*%20Images%20sans%20alt%20*%2F%0Abody%5Bdata-debug%3D%22true%22%5D%20img%3Anot(%5Balt%5D)%2C%0Abody%5Bdata-debug%3D%22true%22%5D%20img%5Balt%3D%22%22%5D%20%7B%0A%20%20outline%3A%203px%20solid%20orange%20!important%3B%0A%20%20outline-offset%3A%202px%3B%0A%7D%0A%0A%2F*%20Boutons%20vides%20*%2F%0Abody%5Bdata-debug%3D%22true%22%5D%20.button%3Aempty%2C%0Abody%5Bdata-debug%3D%22true%22%5D%20button%3Aempty%2C%0Abody%5Bdata-debug%3D%22true%22%5D%20a.button%3Aempty%20%7B%0A%20%20outline%3A%203px%20solid%20purple%20!important%3B%0A%20%20outline-offset%3A%202px%3B%0A%7D%0A%3C%2Fstyle%3E%0A%3C!--%20FIN%20DEBUG%20MODE%20--%3E"
    />
  );
}
