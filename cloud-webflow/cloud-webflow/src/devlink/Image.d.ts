import * as React from "react";
import * as Types from "./types";

declare function Image(props: {
  as?: React.ElementType;
  imageAltText?: Types.Basic.AltText;
  imageImage?: Types.Asset.Image;
  optionsOverlayVisibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
