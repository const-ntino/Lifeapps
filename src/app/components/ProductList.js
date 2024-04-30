import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const PER_PAGE = 6;
const Filters = [
  {
    name: "Tênis",
  },
  {
    name: "Camisetas",
  },
  {
    name: "Calças",
  },
];

export default function ProductList({ products }) {
  const [filter, setFilter] = useState("");
  const [q, setQ] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(1);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  const handleOrderByChange = (e) => {
    setOrderBy(e.target.value || null);
  };

  const getProductsWithFilters = products.filter((product) => {
    if (filter && product.category !== filter) return false;
    if (q && !product.name.toUpperCase().includes(q.toUpperCase()))
      return false;
    return true;
  });

  const sortedProducts = orderBy
    ? getProductsWithFilters.slice().sort((a, b) => {
        if (orderBy === "ASC") return a.price - b.price;
        return b.price - a.price;
      })
    : getProductsWithFilters;

  const offset = (page - 1) * PER_PAGE;
  const productsToShow = sortedProducts.slice(offset, offset + PER_PAGE);

  const totalPages = Math.ceil(sortedProducts.length / PER_PAGE);

  return (
    <Container>
      <ButtonGroup>
        <Button
          onClick={() => {
            setFilter("");
            setSelectedButtonIndex(null);
          }}
          selected={selectedButtonIndex === null}
        >
          Todos os produtos
        </Button>
        {Filters.map(({ name }, index) => (
          <Button
            key={name}
            onClick={() => {
              setFilter(name);
              setSelectedButtonIndex(index);
            }}
            selected={selectedButtonIndex === index}
          >
            {name}
          </Button>
        ))}
      </ButtonGroup>
      <Items>
        <p>{sortedProducts.length} Produtos</p>
        <Dropdown>
          <DropdownContent value={orderBy} onChange={handleOrderByChange}>
            <PlaceholderOption value="" disabled selected>
              Ordenar por
            </PlaceholderOption>
            <option value="ASC">Menor preço</option>
            <option value="DESC">Maior preço</option>
          </DropdownContent>
        </Dropdown>
      </Items>
      <ProductContainer>
        {productsToShow.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <ProductLink>
              {product.discount_percentage && (
                <PriceBadge>{product.discount_percentage}% OFF</PriceBadge>
              )}
              <ProductImage
                className="product-img-top"
                src={product.image}
                alt={product.name}
                width={380}
                height={470}
              />
              <ProductBody>
                <ProductTitle>{product.name}</ProductTitle>
                {product.promotional_price ? (
                  <ProductText>
                    <s>R$ {product.price}</s> R$ {product.promotional_price}
                  </ProductText>
                ) : (
                  <ProductText>R$ {product.price}</ProductText>
                )}
              </ProductBody>
            </ProductLink>
          </Link>
        ))}
      </ProductContainer>

      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            selected={page === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </Pagination>
    </Container>
  );
}

const Container = styled.div`
  margin: 4rem auto;
  max-width: 1300px;
  padding: 0 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  flex: 1;
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: none;
  background-color: ${({ selected }) => (selected ? "#004197" : "#f7f7f7")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  cursor: pointer;
`;

const Items = styled.div`
  max-width: 1250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Dropdown = styled.div`
  display: inline-block;
  width: 150px;
`;

const DropdownContent = styled.select`
  top: 100%;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
`;

const PlaceholderOption = styled.option``;

const ProductContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const ProductLink = styled.div`
  flex: 1;
  text-decoration: none;
  margin: 10px;
  position: relative;
`;

const PriceBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 30px;
  background-color: #e74c3c;
  color: white;
  font-size: 1rem;
  text-align: center;
  line-height: 32px;
`;

const ProductImage = styled(Image)`
  margin-bottom: 0.5rem;
  max-height: 470px;
  max-width: 380px;
  object-fit: cover;
`;

const ProductBody = styled.div`
  margin-bottom: 0.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductTitle = styled.h5`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ProductText = styled.p`
  margin-bottom: 0;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;

  button {
    margin: 0 0.5rem;
    padding: 0.5rem;
    border: none;
    background-color: #f7f7f7;
    cursor: pointer;
  }
`;
