"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";

const Home = () => {
  const [products, setProducts] = useState([]);

  const API_URL = "https://api-prova-frontend.solucoeslifeapps.com.br/products";

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <Banner />
      <ProductList products={products} />
      <Footer />
    </>
  );
};

export default Home;
