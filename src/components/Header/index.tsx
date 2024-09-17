import logo from "../../assets/logo-ignite.svg";
import { Timer, Scroll } from "@phosphor-icons/react";
import { HeaderComp } from "./styles";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <HeaderComp>
      <img src={logo}></img>
      <nav>
        <NavLink to="/">
          <Timer />
        </NavLink>
        <NavLink to="history">
          <Scroll />
        </NavLink>
      </nav>
    </HeaderComp>
  );
}
