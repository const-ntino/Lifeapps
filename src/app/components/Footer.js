import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const filters = [
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

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <div>
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
        </div>
        <FooterLinks>
          <Link href="/">
            <FooterLink>Home</FooterLink>
          </Link>
          {filters.map((filter, index) => (
            <Link
              key={index}
              href={{ pathname: "", query: { filter: filter.name } }}
            >
              <FooterLink>{filter.name}</FooterLink>
            </Link>
          ))}
        </FooterLinks>
      </Container>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  background-color: #f8f9fa;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const BrandContainer = styled.div`
  cursor: pointer;
  margin-top: 5px;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FooterLink = styled.div`
  margin-left: 10px;
  color: #333;
  text-decoration: none;
  margin: 10px;

  &:hover {
    text-decoration: underline;
  }
`;
