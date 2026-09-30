import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Button,
  Img,
} from "@react-email/components";
import {
  btnOrange,
  container,
  content,
  footer,
  footerLink,
  footerText,
  h1,
  header,
  logo,
  main,
  text,
} from "../styles";

type Props = {
  requesterName: string;
  linkUpTitle: string;
  locationName: string;
  browseUrl: string;
};

export const LinkUpDeclinedEmail = ({
  requesterName,
  linkUpTitle,
  locationName,
  browseUrl,
}: Props) => (
  <Html>
    <Head />
    <Preview>Update on your Link Up request</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={logo}>
            <Img
              src={"https://ik.imagekit.io/willsbucket/Outsyde/logo.png"}
              alt="logo"
              style={{ width: 80, height: 80 }}
            />
            <span style={{ color: "#FF5C2B" }}>ut</span>syde
          </Text>
        </Section>
        <Section style={content}>
          <Heading style={h1}>Request update</Heading>
          <Text style={text}>Hi {requesterName},</Text>
          <Text style={text}>
            Unfortunately your request to join{" "}
            <strong>&rdquo;{linkUpTitle}&rdquo;</strong> at {locationName}{" "}
            wasn&apos;t accepted this time.
          </Text>
          <Text style={text}>
            Don&apos;t worry — there are plenty more Link Ups to join in Lagos.
          </Text>
          <Button href={browseUrl} style={btnOrange}>
            Browse open Link Ups
          </Button>
        </Section>
        <Footer />
      </Container>
    </Body>
  </Html>
);

const Footer = () => (
  <Section style={footer}>
    <Text style={footerText}>Outsyde · Lagos, Nigeria</Text>
    <Link href="https://outsyde.org/profile/settings" style={footerLink}>
      Unsubscribe
    </Link>
  </Section>
);
