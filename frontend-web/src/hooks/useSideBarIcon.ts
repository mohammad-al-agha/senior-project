import Code from "../../assets/images/CodeW.svg";
import Design from "../../assets/images/DesignW.svg";
import Stats from "../../assets/images/StatsW.svg";
import Networking from "../../assets/images/NetworkingW.svg";
import Security from "../../assets/images/SecurityW.svg";
import Math from "../../assets/images/MathW.svg";
import Database from "../../assets/images/DatabaseW.svg";

export const useSideBarIcon = (icon: string) => {
  if (icon === "Net") {
    return Networking;
  }
  if (icon === "Code") {
    return Code;
  }
  if (icon === "Design") {
    return Design;
  }
  if (icon === "Security") {
    return Security;
  }
  if (icon === "Data") {
    return Database;
  }
  if (icon === "Stats") {
    return Stats;
  }
  if (icon === "Math") {
    return Math;
  }
};
