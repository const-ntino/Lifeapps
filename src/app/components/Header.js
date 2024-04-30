import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [q, setQ] = useState("");

  const handleSearch = () => {
    if (q.trim() !== "") {
      const queryParams = new URLSearchParams({ q });
      window.location.href = `/search?${queryParams.toString()}`;
    }
  };

  return (
    <NavbarWrapper>
      <Container>
        <Link href="/">
          <BrandContainer>
            <Image
              src="/images/ecommerce.svg"
              alt="Logo"
              width={300}
              height={40}
            />
          </BrandContainer>
        </Link>
        <SearchContainer>
          <SearchInput
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Quero comprar algo específico..."
            aria-label="Search"
          />
          <SearchIcon>
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearch} />
          </SearchIcon>
        </SearchContainer>
        <Link href="/profile">
          <ProfileLink>
            <Image
              src="/images/profile_img.svg"
              alt="Profile"
              width={30}
              height={30}
              title="Profile"
            />
          </ProfileLink>
        </Link>
        <Link href="/cart">
          <CartLink>
            <Image
              src="/images/shopping_img.svg"
              alt="Shopping"
              width={30}
              height={30}
              title="Shopping Cart"
            />
          </CartLink>
        </Link>
      </Container>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.nav`
  background-color: #f8f9fa;
`;

const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  padding: 10px 20px;
  display: flex;
  align-items: center;
`;

const BrandContainer = styled.div`
  cursor: pointer;
  margin-top: 5px;
`;

const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: right;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  margin-right: 10px;
  max-width: 400px;
`;

const SearchIcon = styled.span`
  font-size: 25px;
  cursor: pointer;
  margin-right: 15px;
`;

const ProfileLink = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const CartLink = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;
