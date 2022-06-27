import styled from "styled-components";
import {
  LocationOn,
  Phone,
  Email,
  Facebook,
  Instagram,
  Twitter,
} from "@mui/icons-material";

const Container = styled.footer`
  width: 100%;
  background-color: whitesmoke;
  box-shadow: rgb(0 0 0 / 16%) 0px -4px 8px 0px, rgb(0 0 0 / 8%) 0px 0px 2px 1px;
  margin-top: 50px;
`;

const Wrapper = styled.div`
  width: calc(100% - 64px);
  max-width: 1444px;
  margin: auto;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const Logo = styled.h1`
  font-size: 3rem;
  margin-bottom: 10px;
`;
const LeftInfo = styled.div`
  font-size: 1rem;
`;
const SocialContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const SocialIcon = styled.div`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border: 2px solid var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 250ms ease;
  color: white;
  background-color: var(--color-primary);
  &:hover {
    color: var(--color-primary);
    background-color: white;
  }
`;

const Center = styled.div`
  flex: 2;
  margin: 0 30px;
`;

const CenterTitle = styled.h1`
  font-size: 1rem;
  margin-bottom: 10px;
  color: #666;
`;

const CenterList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  flex: 0 0 50%;
  margin-bottom: 8px;
`;

const Link = styled.a`
  display: inline-block;
  position: relative;
  text-decoration: none;
  color: black;
  overflow: hidden;
  padding-bottom: 2px;
  cursor: pointer;

  &::after {
    content: "";
    width: 100%;
    display: block;
    height: 2px;
    background-color: var(--color-primary);
    position: absolute;
    bottom: 0;
    left: 0;
    transition: all 150ms ease;
    animation: underlineRight 0.5s ease;
    animation-fill-mode: forwards;
  }
  @keyframes underlineLeft {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes underlineRight {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }
  &:hover::after {
    animation: underlineLeft 0.5s ease;
    animation-fill-mode: both;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>
            <span
              style={{
                color: "var(--color-primary)",
              }}
            >
              {`{ `}
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
          <LeftInfo>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure
            obcaecati molestias placeat officia laborum architecto labore
            quisquam? Ex fugit, ullam aliquid enim iure numquam laboriosam
            delectus ducimus harum voluptates.
          </LeftInfo>
          <SocialContainer>
            <SocialIcon>
              <Facebook />
            </SocialIcon>
            <SocialIcon>
              <Instagram />
            </SocialIcon>
            <SocialIcon>
              <Twitter />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <CenterTitle>Useful Links</CenterTitle>
          <CenterList>
            <ListItem>
              <Link href="#">Homepage</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Cart</Link>
            </ListItem>
            <ListItem>
              <Link href="#">{"Computers & Laptops"}</Link>
            </ListItem>
            <ListItem>
              <Link href="#">PC Parts</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Smartphones</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Accessories</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Account</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Order Tracking</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Wishlist</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Terms</Link>
            </ListItem>
          </CenterList>
        </Center>
        <Right>
          <CenterTitle>Contact</CenterTitle>
          <ContactItem>
            <LocationOn
              style={{
                marginRight: "10px",
                color: "var(--color-primary)",
              }}
            />
            ul. Street 31, 92-420 City
          </ContactItem>
          <ContactItem>
            <Phone
              style={{
                marginRight: "10px",
                color: "var(--color-primary)",
              }}
            />{" "}
            +48 123 456 789
          </ContactItem>
          <ContactItem>
            <Email
              style={{
                marginRight: "10px",
                color: "var(--color-primary)",
              }}
            />{" "}
            contact@byjah.com
          </ContactItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Footer;
