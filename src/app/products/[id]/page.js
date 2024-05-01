"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";

const ProductDetail = ({ params }) => {
  const [product, setProduct] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (params && params.id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(
            `https://api-prova-frontend.solucoeslifeapps.com.br/products/${params.id}`
          );
          const data = await response.json();
          setProduct(data);
          setFavoriteProperty();
        } catch (error) {
          console.error("Erro ao buscar dados da API:", error);
        }
      };
      fetchProduct();
    }
  }, [params]);

  const addToCart = () => {
    if (product.id) {
      const products = JSON.parse(localStorage.getItem("cart")) || [];
      const existsOnStorage = products.find((prod) => prod.id === product.id);

      if (!existsOnStorage) {
        products.push({ id: product.id, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(products));
      }

      console.log("Product ID:", product.id);
      console.log("Product ID (typeof):", typeof product.id);
      router.push("/cart");
    } else {
      console.error("ID do produto não está definido.");
    }
  };

  return (
    <Container>
      <Header />
      <ProductContainer $canDisplayProduct={Object.keys(product).length !== 0}>
        <Breadcrumbs>
          <Link href="/">Home</Link> / <Link href="/products">Produtos</Link> /{" "}
          {product.name}
        </Breadcrumbs>
        <ProductWrapper>
          <ProductImage src={product.image} alt={product.name} />
          <ProductInfo>
            <ProductTitle>
              {product.name}
              <FavoriteIcon>
                <FontAwesomeIcon icon={faSolidHeart} />
              </FavoriteIcon>
            </ProductTitle>
            <ProductPrice>R$ {product.price},00</ProductPrice>

            <ProductActions>
              <ProductDescription>
                <span>Descrição:</span> <br />
                {product.description}
              </ProductDescription>
              <AddToCartButton onClick={addToCart}>
                ADICIONAR AO CARRINHO
              </AddToCartButton>
            </ProductActions>
          </ProductInfo>
        </ProductWrapper>
      </ProductContainer>
      <Footer />
    </Container>
  );
};

export default ProductDetail;

const Container = styled.div`
  height: 100vh;
`;

const ProductContainer = styled.div`
  display: ${({ $canDisplayProduct }) =>
    $canDisplayProduct ? "block" : "none"};
  margin: 4rem 5%;
`;

const Breadcrumbs = styled.p`
  margin-bottom: 1rem;
`;

const ProductWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: 500px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  margin: 0 8%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductTitle = styled.h1`
  display: flex;
  justify-content: space-between;
`;

const ProductActions = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-around;
  margin-bottom: 1rem;
`;

const FavoriteIcon = styled.span`
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 1rem;
`;

const ProductPrice = styled.h2`
  margin-right: 1rem;
  color: red;
`;

const ProductDescription = styled.p`
  margin-bottom: 1rem;

  span {
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
`;

const AddToCartButton = styled.button`
  height: 40px;
  padding: 0.5rem 1rem;
  background-color: #004197;
  color: #fff;
  border: none;
  cursor: pointer;
`;
