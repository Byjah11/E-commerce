import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";
import BrowseProducts from "./pages/BrowseProducts";
import Cart from "./pages/Cart";
import Success from "./pages/Success";

const Container = styled.main``;

const Page = styled.main`
  width: calc(100% - 64px);
  max-width: 1444px;
  margin: auto;
  margin-top: 20px;
`;

function App() {
  return (
    <Container>
      <Navbar />
      <Page>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/products" element={<BrowseProducts />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Page>
      <Footer />
    </Container>
  );
}

export default App;
