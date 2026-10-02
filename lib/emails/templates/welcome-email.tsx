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
  listBlock,
  listItem,
  logo,
  main,
  text,
} from "../styles";

type Props = {
  name: string;
};

export const WelcomeEmail = ({ name }: Props) => (
  <Html>
    <Head />
    <Preview>Welcome to Outsyde — Nigeria&apos;s best spots await</Preview>
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
          <Heading style={h1}>We outside. 🎉</Heading>
          <Text style={text}>Hi {name},</Text>
          <Text style={text}>
            Welcome to Outsyde — Nigeria&apos;s guide to the best bars,
            restaurants, beaches, events, and experiences in the city.
          </Text>
          <Text style={text}>Here&apos;s what you can do:</Text>
          <Section style={listBlock}>
            <Text style={listItem}>
              📍 <strong>Discover</strong> — Browse 200+ curated spots across
              Lagos
            </Text>
            <Text style={listItem}>
              🎵 <strong>Events</strong> — Find what&apos;s happening this
              weekend
            </Text>
            <Text style={listItem}>
              🤝 <strong>Link Up</strong> — Find people to go out with
            </Text>
            <Text style={listItem}>
              ⭐ <strong>Review</strong> — Share your experiences
            </Text>
          </Section>
          <Button href="https://outsyde.org" style={btnOrange}>
            Start exploring Nigeria
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
    <Link href="https://outsyde.org" style={footerLink}>
      outsyde.ng
    </Link>
  </Section>
);
