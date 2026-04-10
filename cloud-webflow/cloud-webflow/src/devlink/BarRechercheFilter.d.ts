import * as React from "react";
import * as Types from "./types";

declare function BarRechercheFilter(props: {
  as?: React.ElementType;
  image?: Types.Asset.Image;
  isMenuOpen?: Types.Boolean.Boolean;
  menuOptionsSlot?: Types.Devlink.Slot;
  onSearchClick?: Types.Devlink.RuntimeProps;
  onToggleMenu?: Types.Devlink.RuntimeProps;
  text1?: React.ReactNode;
  text2?: React.ReactNode;
  text3?: React.ReactNode;
  text4?: React.ReactNode;
  text5?: React.ReactNode;
}): React.JSX.Element;
