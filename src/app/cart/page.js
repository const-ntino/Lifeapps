"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getProductsFromStorage());

    fetch(`https://api-prova-frontend.solucoeslifeapps.com.br/products/`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  const getProducts = () =>
    cart.map(({ id, quantity }) => {
      const product = products.find((product) => product.id === id);
      return product ? { ...product, ...{ quantity } } : product;
    });

  const getProductsFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const totalProducts = () => cart.length;

  const thereAreProductsOnCart = () => cart.length > 0;

  const totalprice = () => {
    const sum = getSum();
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(sum);
  };

  const totalAcquisition = () => {
    const price = getSum();
    const total = price + 40;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(total);
  };

  const getSum = () => {
    let sum = 0;
    const productsInCart = getProducts().filter(Boolean);

    productsInCart.forEach(({ price, promotional_price, quantity }) => {
      sum += (promotional_price || price) * quantity;
    });

    return sum;
  };

  const removeProduct = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    localStorage.setItem(
      "cart",
      JSON.stringify(cart.filter((item) => item.id !== id))
    );
  };

  const logSelectedOption = (event, id) => {
    const quantity = parseInt(event.target.value);
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const cleanCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  return (
    <Container>
      <Header />

      <Content>
        <CartSection>
          <Breadcrumbs>
            <Link href="/">Home</Link> / <span>Carrinho</span>
          </Breadcrumbs>
          <Title>Carrinho</Title>
          <Total>
            Total ({totalProducts()} produtos) <strong>{totalprice()}</strong>
          </Total>
          <ProductList>
            {products.length > 0 &&
              getProducts().map(
                (product) =>
                  product && (
                    <Product key={product.id}>
                      <Image src={product.image} />
                      <ProductInfo>
                        <ProductName>{product.name}</ProductName>
                        <ProductDescription>
                          {product.description}
                        </ProductDescription>
                        <PriceContainer>
                          <QuantitySelect
                            value={product.quantity}
                            onChange={(e) => logSelectedOption(e, product.id)}
                          >
                            {[...Array(5).keys()].map((i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </QuantitySelect>
                          <ProductPrice>
                            {product.promotional_price ? (
                              <>
                                <DiscountPrice>
                                  R$ {product.price},00{" "}
                                </DiscountPrice>
                                <PromotionalPrice>
                                  R$ {product.promotional_price},00
                                </PromotionalPrice>
                              </>
                            ) : (
                              <RegularPrice>R$ {product.price},00</RegularPrice>
                            )}
                          </ProductPrice>
                        </PriceContainer>
                        <RemoveButton onClick={() => removeProduct(product.id)}>
                          Remover
                        </RemoveButton>
                      </ProductInfo>
                    </Product>
                  )
              )}
          </ProductList>
        </CartSection>
        {thereAreProductsOnCart() && (
          <SummarySection>
            <Sub>RESUMO</Sub>
            <SummaryItem>
              <SummaryLabel>Subtotal de produtos</SummaryLabel>
              <SummaryValue>{totalprice()}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryLabel>Entrega</SummaryLabel>
              <SummaryValue>R$ 40,00</SummaryValue>
            </SummaryItem>
            <SummaryTotal>
              <SummaryLabel>Total</SummaryLabel>
              <SummaryValue>{totalAcquisition()}</SummaryValue>
            </SummaryTotal>
            <Button onClick={cleanCart}>Finalizar a compra</Button>
            <Button onClick={cleanCart}>Limpar carrinho</Button>
          </SummarySection>
        )}
      </Content>
      <Footer />
    </Container>
  );
};

export default CartPage;

const Container = styled.div`
  height: 100%;
`;

const Content = styled.div`
  max-width: 1200px;
  padding: 1rem 3%;
  display: flex;
  flex-direction: row;
`;

const Breadcrumbs = styled.p`
  margin-bottom: 1rem;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CartSection = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
`;

const Sub = styled.h1`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Total = styled.p`
  margin-bottom: 1rem;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  margin-right: 15%;
`;

const Product = styled.li`
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
`;

const Image = styled.img`
  width: 100%;
  max-width: 300px;
  height: 300px;
  object-fit: cover;
  margin-right: 1rem;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.h2`
  margin-bottom: 0.5rem;
`;

const ProductDescription = styled.p`
  margin-bottom: 0.5rem;
`;

const QuantitySelect = styled.select`
  margin-right: 1rem;
  padding: 0.2rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f7f7f7;
  color: #333;
  cursor: pointer;
`;

const ProductPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RegularPrice = styled.p`
  font-weight: bold;
`;

const DiscountPrice = styled.p`
  font-weight: bold;
  text-decoration: line-through;
  color: #999;
  margin-right: 5px;
`;

const PromotionalPrice = styled.p`
  font-weight: bold;
`;

const RemoveButton = styled.button`
  border: none;
  font-size: 1rem;
  background-color: transparent;
  color: red;
  cursor: pointer;
`;

const SummarySection = styled.div`
  padding: 1rem;
  margin-top: 1rem;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 300;
`;

const SummaryLabel = styled.p``;

const SummaryValue = styled.p``;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin: 1rem auto 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: #004197;
  color: #fff;
  cursor: pointer;
  height: 35px;
  width: 100%;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;
