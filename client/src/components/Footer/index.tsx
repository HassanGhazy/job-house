import { Row, Col } from "antd";
import { SvgIcon } from "../../common/SvgIcon";
import Container from "../../common/Container";
import {
  FooterSection,
  Title,
  NavLink,
  Extra,
  LogoContainer,
  Para,
  Large,
  FooterContainer,
  Language,
} from "./styles";

interface SocialLinkProps {
  href: string;
  src: string;
}

const Footer = () => {

  const SocialLink = ({ href, src }: SocialLinkProps) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  return (
    <>
      <FooterSection>
        <Container>
          <Row justify="space-between">
            <Col lg={10} md={10} sm={12} xs={12}>
              <Language>{"Contact"}</Language>
              <Large to="contact-us.html">{"Tell us everything"}</Large>
              <Para>
                {`Do you have any question? Feel free to reach out.`}
              </Para>
            </Col>
            <Col lg={8} md={8} sm={12} xs={12}>
              <Title>{"Policy"}</Title>
              <Large to="privacy.html" left="true">
                {"Application Security"}
              </Large>
              <Large left="true" key="terms.html" to="/terms.html">
                {"Application Trems"}
              </Large>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col lg={8} md={8} sm={12} xs={12}>
              <Title>{"Company"}</Title>
              <Large to="about.html">
                {"About"}
              </Large>
              <Large left="false" to="/contact-us.html">
                {"Contact"}
              </Large>
           
                <Large to="/browse-job">
                {"Jobs"}
              </Large>
          
            </Col>
            
          </Row>
        </Container>
      </FooterSection>
      <Extra>
        <Container border={true}>
          <Row
            justify="space-between"
            align="middle">
            <NavLink to="/">
              <LogoContainer>
                <SvgIcon
                  src="logo.svg"
                  aria-label="homepage"
                  width="101px"
                  height="64px"
                />
              </LogoContainer>
            </NavLink>
            <FooterContainer>
              <SocialLink
                href="https://github.com/HassanGhazy/job-house"
                src="github.svg"
              />
            </FooterContainer>
          </Row>
        </Container>
      </Extra>
    </>
  );
};

export default Footer;
