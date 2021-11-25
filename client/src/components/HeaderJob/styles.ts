import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderSection = styled("header")`
  padding: 1rem 0.5rem;

  .ant-row-space-between {
    align-items: center;
    text-align: center;
  }
`;

export const NavBar = styled("header")<any>`
.navbar {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-top: .5rem;
  padding-bottom: .5rem;
  height: 50px;
   borderRadius: 0;
}

@media (min-width:768px) {
  .navbar-expand-md {
      flex-wrap: nowrap;
      justify-content: flex-start
  }

  .navbar-expand-md .navbar-nav {
      flex-direction: row
  }

  .navbar-expand-md .navbar-nav .dropdown-menu {
      position: absolute
  }

  .navbar-expand-md .navbar-nav .nav-link {
      padding-right: .5rem;
      padding-left: .5rem
  }

  .navbar-expand-md .navbar-collapse {
      display: flex !important
  }

  .navbar-expand-md .navbar-toggler {
      display: none
  }
}
.navbar-dark .navbar-brand {
  color: #fff
}

.navbar-dark .navbar-brand:focus,
.navbar-dark .navbar-brand:hover {
  color: #fff
}

.navbar-dark .navbar-nav .nav-link {
  color: rgba(255, 255, 255, .55)
}

.navbar-dark .navbar-nav .nav-link:focus,
.navbar-dark .navbar-nav .nav-link:hover {
  color: rgba(255, 255, 255, .75)
}

.navbar-dark .navbar-nav .nav-link.disabled {
  color: rgba(255, 255, 255, .25)
}

.navbar-dark .navbar-nav .nav-link.active,
.navbar-dark .navbar-nav .show > .nav-link {
  color: #fff
}

.navbar-dark .navbar-toggler {
  color: rgba(255, 255, 255, .55);
  border-color: rgba(255, 255, 255, .1)
}

.navbar-dark .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")
}

.navbar-dark .navbar-text {
  color: rgba(255, 255, 255, .55)
}

.navbar-dark .navbar-text a,
.navbar-dark .navbar-text a:focus,
.navbar-dark .navbar-text a:hover {
  color: #fff
}

.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030
}
.bg-dark {
  background-color: #212529 !important
}
`;

export const LogoContainer = styled(Link)`
  display: flex;
`;

export const NavLink = styled("div")`
  display: inline-block;
  text-align: center;
`;

export const CustomNavLink = styled("div")`
  width: 203px;
  display: inline-block;

  @media only screen and (max-width: 411px) {
    width: 150px;
  }

  @media only screen and (max-width: 320px) {
    width: 118px;
  }
`;

export const ContactWrapper = styled("div")<any>`
  cursor: pointer;
  width: ${(p) => (p.width ? "100%" : "110px")};
  font-weight: 700;
  text-align: center;
  border-radius: 1.25rem;
  display: inline-block;
`;

export const Burger = styled("div")`
  @media only screen and (max-width: 890px) {
    display: block;
  }

  display: none;

  svg {
    fill: #2e186a;
  }
`;

export const NotHidden = styled("div")`
  @media only screen and (max-width: 890px) {
    display: none;
  }
`;

export const Menu = styled("h5")`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

export const CustomNavLinkSmall = styled(NavLink)`
  font-size: 1.2rem;
  color: #18216d;
  transition: color 0.2s ease-in;
  margin: 0.5rem 2rem;

  @media only screen and (max-width: 768px) {
    margin: 1.25rem 2rem;
  }
`;

export const Label = styled("span")`
  font-weight: 500;
  color: #404041;
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;


export const Span = styled("span")`
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:active,
  &:focus {
    color: rgb(255, 130, 92);
    text-underline-position: under;
    text-decoration: rgb(255, 130, 92) wavy underline;
  }
`;
