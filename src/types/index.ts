import { IconType } from "react-icons";

export interface NavLinkType {
  id: number;
  title: string;
  path: string;
  icon: IconType;
  onyForDesktop?: boolean;
}
