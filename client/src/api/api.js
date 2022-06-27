import axios from "axios";

const API = axios.create({ baseURL: "https://x-kom-server.herokuapp.com" });

// User Authentication
export const login = (formData) => API.post("/users/login", formData);
export const register = (formData) => API.post("/users/register", formData);

// Products

export const fetchProducts = (query) =>
  API.get(
    `/products?${Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&")}`
  );

export const fetchProduct = (id) => API.get(`/products/${id}`);

// Stripe

export const createCheckoutSession = async (items) => {
  try {
    const { data } = await API.post("/stripe/create-checkout-session", items);
    console.log(data.url);
    window.location = data.url;
  } catch (error) {
    console.log(error);
  }
};
