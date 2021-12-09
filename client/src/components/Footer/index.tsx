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

              <Large>
                <a onClick={() => window.location.href = "/contact-us"} href="/contact-us" >Tell us everything</a>
              </Large>
              <Para>
                {`Do you have any question? Feel free to reach out.`}
              </Para>
            </Col>
            <Col lg={8} md={8} sm={12} xs={12}>
              <Title>{"Policy"}</Title>
              <Large key="privacy.html" left="true">
                <a onClick={() => window.location.href = "privacy.html"} href="privacy.html" >Application Security</a>
              </Large>
              <Large left="true" key="terms.html" >
                <a onClick={() => window.location.href = "terms.html"} href="terms.html" >Application Trems</a>
              </Large>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col lg={8} md={8} sm={12} xs={12}>
              <Title>{"Company"}</Title>
              <Large to="about.html">
                <a onClick={() => window.location.href = "about.html"} href="about.html" >About</a>
              </Large>
              <Large left="false">
                <a onClick={() => window.location.href = "/contact-us"} href="/contact-us" >Contact</a>
              </Large>

              <Large to="/browse-job">
                <a onClick={() => window.location.href = "/browse-job"} href="/browse-job" >Jobs</a>
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
