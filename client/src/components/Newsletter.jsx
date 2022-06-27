import styled from "styled-components";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
const Container = styled.div`
  width: 100%;
  border-radius: 50px;
  box-shadow: var(--box-shadow);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background-color: var(--lightgrey);
  position: relative;
  overflow: hidden;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 1;
`;
const Title = styled.label`
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 8px;
  text-transform: uppercase;
  margin-bottom: 10px;
  color: #fff;
  text-shadow: 4px 3px 5px rgba(0, 0, 0, 1);
`;
const Desc = styled.div`
  color: #eee;
  margin-bottom: 20px;
  padding: 0 50px;
  font-size: 1.1rem;
  text-align: center;
  max-width: 400px;
  text-shadow: 4px 3px 5px rgba(0, 0, 0, 1);
`;
const Form = styled.form`
  display: flex;
  border-radius: 20px;
  background-color: #fff;
  width: 600px;
  box-shadow: rgb(0 0 0 / 32%) 0px 4px 8px 0px, rgb(0 0 0 / 16%) 0px 0px 2px 1px;
`;
const Input = styled.input`
  flex: 1;
  border-radius: 20px;
  padding: 12px 20px;
  border: none;
  outline: none;
  font-size: 1rem;
`;
const Button = styled.button`
  border-radius: 20px;
  border: none;
  padding: 8px 16px;
  background-color: var(--color-primary);
  cursor: pointer;
  color: #fff;
  &:hover {
    background-color: rgb(26, 26, 26);
  }
`;

const Circle = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-color: var(--color-primary);
  position: absolute;
`;

const Newsletter = () => {
  return (
    <Container>
      <FormContainer>
        <Title>Newsletter</Title>
        <Desc>Join our newsletter to get notified about upcoming sales.</Desc>
        <Form>
          <Input type="text" placeholder="Your Email Here" />
          <Button type="submit">
            <ForwardToInboxIcon />
          </Button>
        </Form>
      </FormContainer>

      <Circle />
    </Container>
  );
};

export default Newsletter;
