import styled from "styled-components";
import Image from "next/image";
import banner from "../../../public/images/banner.png";

export default function Banner() {
  return (
    <Wrapper>
      <Row>
        <Column>
          <ImageWrapper>
            <Image src={banner} priority alt="Hero banner" />
          </ImageWrapper>
        </Column>
      </Row>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Column = styled.div`
  flex: 1;
  padding: 0;
`;

const ImageWrapper = styled.div`
  width: 100%;
`;
