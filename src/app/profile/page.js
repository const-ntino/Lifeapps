"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const API_URL = "https://api-prova-frontend.solucoeslifeapps.com.br/products";

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
      setFavorites(getFavoritesProductsFromStorage());
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((favorite) => favorite !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const addToCart = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existsOnCart = cart.find((product) => product.id === id);

    if (!existsOnCart) {
      cart.push({ id, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const getFavoritesProducts = () => {
    return products.filter((product) =>
      favorites.includes(parseInt(product.id))
    );
  };

  return (
    <>
      <Header />
      <Container>
        <Title>Meus Favoritos</Title>
        <p>Total ({getFavoritesProducts().length} produtos)</p>

        <ul>
          {getFavoritesProducts().map((product) => (
            <li key={product.id}>
              <div>
                <img src={product.image} className="list-img-cart" alt="" />
              </div>
              <div>
                <div>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => removeFavorite(product.id)}
                  >
                    Remover dos Favoritos
                  </button>
                  <button type="button" onClick={() => addToCart(product.id)}>
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
      <Footer />
    </>
  );
};

export default ProductList;

const Container = styled.div`
  height: 100vh;
  margin: 0 auto;
  max-width: 1200px;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;
