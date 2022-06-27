import styled from "styled-components";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/user";
import NavCartItem from "./NavCartItem";
import { navbarCategories } from "../data";

// import icons
import {
  Search,
  FavoriteBorder,
  ShoppingCartOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import { ReactComponent as PartsIcon } from "../imgs/parts.svg";
import { ReactComponent as AccessIcon } from "../imgs/accessories.svg";
import { ReactComponent as CompIcon } from "../imgs/computers.svg";
import { ReactComponent as SmartphonesIcon } from "../imgs/smartphones.svg";

const Container = styled.nav`
  width: 100%;
  /* background-color: white; */
  position: sticky;
  z-index: 100;
  top: 0;
  transform: ${(props) => props.hide && "translateY(-60%)"};
  transition: all 250ms ease;
`;
const Wrapper = styled.div`
  width: calc(100% - 64px);
  max-width: 1444px;
  margin: auto;
  /* background-color: #fff; */
  display: flex;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 16%) 0px 4px 8px 0px, rgb(0 0 0 / 8%) 0px 0px 2px 1px;
`;

const TopLeft = styled.div`
  margin-left: 16px;
`;

const Logo = styled(Link)`
  font-size: 3rem;
  cursor: pointer;
  color: black;
  font-weight: 600;
  text-decoration: none;
`;

const TopCenter = styled.div`
  flex: 2;
  margin: 0 10px;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SearchWrapper = styled.div`
  width: ${(props) => (props.focus ? "100%" : "33%")};
  height: 40px;
  display: flex;
  border-radius: 20px;
  border: 1px rgb(204, 204, 204) solid;
  transition: box-shadow 150ms ease, width 0.5s ease;
  box-shadow: ${(props) =>
    props.focus &&
    "rgb(0 0 0 / 16%) 0px 4px 8px 0px, rgb(0 0 0 / 8%) 0px 0px 2px 1px"};
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  padding: 5px 0 5px 20px;
  border-radius: 20px 0 0 20px;
  &:focus {
    border: none;
    outline: none;
  }
  &:focus ${SearchWrapper} {
  }
`;

const SearchIconWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 64px;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  background-color: var(--color-primary);

  &:hover {
    background-color: rgb(26, 26, 26);
  }
`;

const TopRight = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 5px;
`;

const Divider = styled.div`
  height: 48px;
  margin: 0 5px;
  width: 1px;
  background-color: rgb(77, 77, 77);
`;

const MenuDropdown = styled.div`
  opacity: 0;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  transform: scaleY(0) translateX(-50%);
  transform-origin: top center;
  cursor: default;
  position: absolute;
  padding: 16px 0;
  top: 100%;
  left: 50%;
  /* left: ${(props) => props.side === "left" && 0};
  right: ${(props) => props.side === "right" && 0}; */
  width: calc(60% - 100px);
  /* height: 300px; */
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 16%) 0px 4px 8px 0px, rgb(0 0 0 / 8%) 0px 0px 2px 1px;
  background-color: white;
  transition: all 250ms ease;
`;

const TopMenuDropdown = styled(MenuDropdown)`
  width: ${(p) => (p.cart ? "150%" : "100%")};
  padding: ${(p) => (p.cart ? "0" : "20px")};
  height: auto;
  z-index: 5;
  left: auto;
  right: auto;
  border-radius: ${(props) =>
    props.side === "left" ? "0 10px 10px 10px" : "10px 0 10px 10px"};
  left: ${(props) => props.side === "left" && 0};
  right: ${(props) => props.side === "right" && 0};
  transform: scaleY(0);
`;

const MenuItemLabel = styled.label`
  width: 100%;
  height: 100%;
  border-radius: 10px 10px 0 0;
  padding: 0px 16px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  clip-path: inset(-20px -20px 0 -20px);
  transition: all 150ms ease;
`;

const TopRightLabel = styled(MenuItemLabel)`
  width: 100%;
  flex-direction: column;
  background-color: transparent;
  z-index: 6;
  padding: 5px;
`;

const CartBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -12px;
  min-width: 25px;
  padding: 0 5px;
  height: 25px;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border: #fff 2px solid;
  background-color: var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavCartItems = styled.div`
  max-height: 420px;
  overflow-y: scroll;
`;

const CartTotalWrapper = styled.div`
  width: 100%;
  background-color: whitesmoke;
  padding: 16px;
  border-radius: 0 0 10px 10px;
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 1.1rem;
  font-weight: 700;
`;

const TopRightItem = styled.div`
  min-width: 88px;
  margin-top: 5px;
  height: 64px;
  border-radius: 10px 10px 0 0;
  border: none;
  background-color: transparent;
  display: flex;

  justify-content: center;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &:hover ${TopMenuDropdown} {
    opacity: 1;
    pointer-events: auto;
    transform: scaleY(1);
  }
  &:hover ${TopRightLabel} {
    box-shadow: rgb(0 0 0 / 16%) 0px 4px 8px 0px,
      rgb(0 0 0 / 8%) 0px 0px 2px 1px;
    background-color: white;
  }
`;

const BottomWrapper = styled.div`
  /* background-color: var(--lightgrey); */
`;

const Bottom = styled.div`
  height: 50px;
  width: 100%;
  border-radius: 0 0 50px 50px;
  box-shadow: rgb(0 0 0 / 16%) 0px 4px 8px 0px, rgb(0 0 0 / 8%) 0px 0px 2px 1px;
  background-color: var(--lightgrey);
  display: flex;
  justify-content: center;
  position: relative;
`;

const MenuItem = styled.button`
  height: 100%;
  border: none;
  background-color: transparent;
  display: flex;
  padding: 0;
  justify-content: center;
  align-items: center;
  /* position: relative; */
  &:hover ${MenuItemLabel} {
    box-shadow: rgb(0 0 0 / 16%) 0px 4px 8px 0px,
      rgb(0 0 0 / 8%) 0px 0px 2px 1px;
    background-color: white;
  }

  &:hover ${MenuDropdown} {
    opacity: 1;
    pointer-events: auto;
    transform: scaleY(1) translateX(-50%);
  }
`;

const MenuItemIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 5px;
`;

const DropdownTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const DropdownBottom = styled.div`
  display: flex;
`;

const DropdownLinkList = styled.div`
  flex: 1;
  list-style: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
`;
const DropdownLink = styled(Link)`
  display: flex;
  color: inherit;
  text-decoration: none;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
  padding: 8px 16px;
  border-radius: 0 50px 50px 0;
  &:hover {
    background-color: whitesmoke;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  width: 100%;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${(props) => (props.visible ? 1 : 0)};
  position: fixed;
  pointer-events: none;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100vh;
  transition: all 0.5s ease;
`;

export const LoginButtonsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  hr {
    display: block;
    width: 100%;
    margin: 20px 0;
  }
  span {
    position: absolute;
    background-color: #fff;
    font-size: 0.8rem;
    padding: 4px 8px;
  }
`;

export const LoginButton = styled.button`
  background-color: ${(p) => (p.invert ? "#fff" : "var(--color-primary)")};
  border: var(--color-primary) solid 2px;
  width: 100%;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  height: 32px;
  color: ${(p) => (p.invert ? "var(--color-primary)" : "#fff")};
  border-radius: 20px;
  transition: all 150ms ease;
  font-weight: 600;
  &:hover {
    color: ${(p) => (!p.invert ? "var(--color-primary)" : "#fff")};
    background-color: ${(p) => (!p.invert ? "#fff" : "var(--color-primary)")};
  }
`;

const CartButton = styled(LoginButton)``;

const Navbar = () => {
  const dispatch = useDispatch();
  const [searchFocus, setSearchFocus] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [hide, setHide] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    //hide navbar on scroll down
    const transitionNavBar = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos && currentScrollPos > 60) {
        setHide(true);
      } else {
        setHide(false);
      }
      setPrevScrollPos(window.scrollY);
    };
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, [prevScrollPos]);

  const getIcon = (id) => {
    switch (id) {
      case 0:
        return <CompIcon />;
      case 1:
        return <PartsIcon />;
      case 2:
        return <SmartphonesIcon />;
      default:
        return <CompIcon />;
    }
  };

  return (
    <>
      <Container hide={hide}>
        <Wrapper>
          <Top>
            <TopLeft>
              <Logo to="/">
                <span
                  style={{
                    color: "var(--color-primary)",
                  }}
                >
                  {"{ "}
                </span>
                byJah
                <span
                  style={{
                    color: "var(--color-primary)",
                  }}
                >
                  {` }`}
                </span>
              </Logo>
            </TopLeft>
            <TopCenter>
              <SearchWrapper focus={searchFocus}>
                <SearchInput
                  onFocus={() => setSearchFocus(true)}
                  onBlur={() => setSearchFocus(false)}
                  placeholder="Search..."
                />
                <SearchIconWrapper>
                  <Search />
                </SearchIconWrapper>
              </SearchWrapper>
            </TopCenter>

            <Divider />
            <TopRight>
              <TopRightItem>
                <TopRightLabel>
                  <PersonOutlineOutlined
                    style={{
                      fontSize: "28px",
                      stroke: "#ffffff",
                      strokeWidth: 1,
                    }}
                  />
                  Account
                </TopRightLabel>
                <TopMenuDropdown side="left">
                  {user ? (
                    <LoginButtonsContainer>
                      <div
                        style={{ marginBottom: 16 }}
                      >{`Logged in as ${user.firstName} ${user.lastName}`}</div>
                      <LoginButton onClick={() => logout(dispatch)}>
                        Logout
                      </LoginButton>
                    </LoginButtonsContainer>
                  ) : (
                    <LoginButtonsContainer>
                      <Link
                        to="/login"
                        style={{ textDecoration: "none", width: "100%" }}
                      >
                        <LoginButton>Sign In</LoginButton>
                      </Link>
                      <hr></hr>
                      <span>New Here?</span>
                      <Link
                        to="/register"
                        style={{ textDecoration: "none", width: "100%" }}
                      >
                        <LoginButton invert>Register</LoginButton>
                      </Link>
                    </LoginButtonsContainer>
                  )}
                </TopMenuDropdown>
              </TopRightItem>
              <TopRightItem>
                <TopRightLabel>
                  <FavoriteBorder
                    style={{
                      fontSize: "28px",
                      stroke: "#ffffff",
                      strokeWidth: 1,
                    }}
                  />
                  Wishlist
                </TopRightLabel>
              </TopRightItem>
              <TopRightItem>
                <TopRightLabel>
                  <div style={{ position: "relative" }}>
                    <ShoppingCartOutlined
                      style={{
                        fontSize: "28px",
                        stroke: "#ffffff",
                        strokeWidth: 1,
                      }}
                    />
                    {cart.products.length > 0 && (
                      <CartBadge>
                        {cart.products.reduce((sum, p) => sum + p.amount, 0)}
                      </CartBadge>
                    )}
                  </div>
                  Cart
                </TopRightLabel>
                <TopMenuDropdown cart side="right">
                  {cart.products.length === 0 ? (
                    <div style={{ padding: 20, textAlign: "center" }}>
                      Your Cart is Empty
                    </div>
                  ) : (
                    <>
                      <NavCartItems>
                        {cart.products.map((p) => (
                          <NavCartItem key={p._id} item={p} />
                        ))}
                      </NavCartItems>
                      <CartTotalWrapper>
                        <CartTotal>
                          <div>Total</div>
                          <div>
                            {String(cart.total).slice(0, -2)},
                            {String(cart.total).slice(-2)} zł
                          </div>
                        </CartTotal>
                        <Link
                          to="/cart"
                          style={{ textDecoration: "none", width: "100%" }}
                        >
                          <CartButton>Go to Cart</CartButton>
                        </Link>
                      </CartTotalWrapper>
                    </>
                  )}
                </TopMenuDropdown>
              </TopRightItem>
            </TopRight>
          </Top>
        </Wrapper>
        <BottomWrapper>
          <Wrapper>
            <Bottom>
              {navbarCategories.map((c) => (
                <MenuItem
                  key={c.id}
                  onMouseEnter={() => setOverlay(true)}
                  onMouseLeave={() => setOverlay(false)}
                >
                  <Link
                    to={`/products?category=${c.category}`}
                    style={{
                      textDecoration: "none",
                      width: "100%",
                      height: "100%",
                      zIndex: "2",
                      color: "inherit",
                    }}
                  >
                    <MenuItemLabel>
                      <MenuItemIcon>{getIcon(c.id)}</MenuItemIcon>
                      {c.label}
                    </MenuItemLabel>
                  </Link>
                  <MenuDropdown>
                    <DropdownTitle>{c.title}</DropdownTitle>
                    <DropdownBottom>
                      <DropdownLinkList>
                        {c.links.map((l) => (
                          <DropdownLink key={l.title} to={l.to}>
                            {l.title}
                          </DropdownLink>
                        ))}
                      </DropdownLinkList>
                      <ImageContainer>
                        <Image src={c.img} />
                      </ImageContainer>
                    </DropdownBottom>
                  </MenuDropdown>
                </MenuItem>
              ))}
              <MenuItem
                onMouseEnter={() => setOverlay(true)}
                onMouseLeave={() => setOverlay(false)}
              >
                <Link
                  to="/products"
                  style={{
                    textDecoration: "none",
                    width: "100%",
                    height: "100%",
                    zIndex: "2",
                    color: "inherit",
                  }}
                >
                  <MenuItemLabel>
                    <MenuItemIcon>
                      <AccessIcon />
                    </MenuItemIcon>
                    All Products
                  </MenuItemLabel>
                </Link>
                {/* <MenuDropdown side="right">Dropdown</MenuDropdown> */}
              </MenuItem>
            </Bottom>
          </Wrapper>
        </BottomWrapper>
      </Container>
      <Overlay visible={overlay} />
    </>
  );
};

export default Navbar;
