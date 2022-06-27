import styled from "styled-components";
import { useState, useEffect } from "react";
import { LoginButton, LoginButtonsContainer } from "../components/Navbar";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { login, register } from "../actions/user";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  min-height: calc(100vh - 200px);
  position: relative;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  max-width: 420px;
`;
const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 20px;
  border-radius: 20px;
  box-shadow: var(--box-shadow);
  margin-bottom: 20px;
  width: 100%;
  min-height: 80%;
  overflow: hidden;
  position: relative;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 8px;
  text-transform: uppercase;
  margin-bottom: 10px;
  color: #fff;
  text-shadow: 4px 3px 5px rgba(0, 0, 0, 1);
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const InputBox = styled.div`
  width: 100%;
  margin-bottom: 25px;
  position: relative;
  display: flex;
  align-items: center;
  label {
    position: absolute;
    font-size: 1.1rem;
    padding-left: 20px;
    transition: all 250ms ease;
    font-weight: 300;
    pointer-events: none;
  }
`;

const Input = styled.input`
  padding: 0 20px;
  border-radius: 20px;
  border: none;
  font-size: 1.1rem;
  width: 100%;
  height: 40px;
  border: 1px rgb(204, 204, 204) solid;

  &:focus {
    outline: none;
  }

  &:required ~ label::after {
    content: "*";
  }

  &:focus ~ label,
  &:valid ~ label {
    transform: translateY(-2rem);
    color: white;
    font-size: 1rem;
    padding-left: 10px;
  }
`;

const Circle = styled.div`
  width: 200%;
  height: 100%;
  top: -30%;
  border-radius: 50%;
  background-color: var(--color-primary);
  position: absolute;
  z-index: -1;
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname: location } = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }, [location]);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
    navigate("/");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    register({ firstName, lastName, email, password }, dispatch);
    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Card>
          <Circle />
          {location === "/login" ? (
            <Form onSubmit={handleLogin}>
              <Title>Sign In</Title>
              <InputWrapper>
                <InputBox>
                  <Input
                    type="text"
                    required="required"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>E-mail</label>
                </InputBox>
                <InputBox>
                  <Input
                    type="password"
                    required="required"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label>Password</label>
                </InputBox>
              </InputWrapper>
              <LoginButtonsContainer>
                <LoginButton type="submit">Sign In</LoginButton>
                <hr></hr>
                <span>Don't have an account?</span>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <LoginButton invert>Register</LoginButton>
                </Link>
              </LoginButtonsContainer>
            </Form>
          ) : (
            <Form onSubmit={handleRegister}>
              <Title>Register</Title>
              <InputWrapper>
                <InputBox>
                  <Input
                    type="text"
                    required="required"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label>First Name</label>
                </InputBox>
                <InputBox>
                  <Input
                    type="text"
                    required="required"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label>Last Name</label>
                </InputBox>
                <InputBox>
                  <Input
                    type="text"
                    required="required"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>E-mail</label>
                </InputBox>
                <InputBox>
                  <Input
                    type="password"
                    required="required"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label>Password</label>
                </InputBox>
              </InputWrapper>
              <LoginButtonsContainer>
                <LoginButton type="submit">Register</LoginButton>
                <hr></hr>
                <span>Already have an account?</span>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <LoginButton invert>Sign In</LoginButton>
                </Link>
              </LoginButtonsContainer>
            </Form>
          )}
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Login;
