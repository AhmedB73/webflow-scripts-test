import * as React from "react";
import * as Types from "./types";

declare function Card(props: {
  as?: React.ElementType;
  imageImageAltText?: Types.Basic.AltText;
  imageImageImage?: Types.Asset.Image;
  imageOptionsOverlayVisibility?: Types.Visibility.VisibilityConditions;
  text1?: React.ReactNode;
  text2?: React.ReactNode;
}): React.JSX.Element;
