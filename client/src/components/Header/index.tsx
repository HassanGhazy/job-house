import { Row} from "antd";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import { Button } from "../../common/Button";
import {
  HeaderSection,
  LogoContainer,
  NotHidden,
  CustomNavLinkSmall,
  Span,
} from "./styles";

const HeaderJob = () => {

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      const element = document.getElementById(id) as HTMLDivElement;
      element.scrollIntoView({
        behavior: "smooth",
      });
    };
    return (<>
     <CustomNavLinkSmall onClick={() => scrollTo("about")}>
          <Span>{"About"}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("mission")}>
          <Span>{"Mission"}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("product")}>
          <Span>{"Work"}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall
          style={{ width: "180px" }}
          onClick={() => scrollTo("contact")}
        >
          <Span>
            <Button>{"Contact"}</Button>
          </Span>
        </CustomNavLinkSmall>
      </>
    );
  };

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          <LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="logo.svg" width="101px" height="64px" />
          </LogoContainer>
          <NotHidden>
            <MenuItem />
          </NotHidden>
        </Row>
      </Container>
    </HeaderSection>
  );
};

export default HeaderJob;
