import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";
import {
  btnGray,
  btnGreen,
  btnOrange,
  btnRow,
  card,
  cardMeta,
  cardTitle,
  container,
  content,
  footer,
  footerLink,
  footerText,
  h1,
  header,
  hint,
  link,
  logo,
  main,
  quoteBlock,
  quoteText,
  text,
} from "../styles";

type Props = {
  creatorName: string;
  requesterName: string;
  requesterBio?: string | null;
  linkUpTitle: string;
  linkUpDate: string;
  locationName: string;
  message?: string | null;
  acceptUrl: string;
  declineUrl: string;
  hasSocials?: boolean;
};

export const LinkUpRequestEmail = ({
  creatorName,
  requesterName,
  requesterBio,
  linkUpTitle,
  linkUpDate,
  locationName,
  message,
  acceptUrl,
  declineUrl,
  hasSocials,
}: Props) => (
  <Html>
    <Head />
    <Preview>{requesterName} wants to join your Link Up</Preview>
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
          <Heading style={h1}>New Link Up request</Heading>
          <Text style={text}>Hi {creatorName},</Text>
          <Text style={text}>
            <strong>{requesterName}</strong> wants to join your Link Up:
          </Text>
          <Section style={card}>
            <Text style={cardTitle}>{linkUpTitle}</Text>
            <Text style={cardMeta}>
              📍 {locationName} · 🗓 {linkUpDate}
            </Text>
          </Section>
          {requesterBio && (
            <Section style={quoteBlock}>
              <Text style={quoteText}>"{requesterBio}"</Text>
            </Section>
          )}
          {message && (
            <Section style={quoteBlock}>
              <Text style={{ ...quoteText, fontStyle: "normal" }}>
                <strong>Their message:</strong> {message}
              </Text>
            </Section>
          )}
          {hasSocials && (
            <Text style={hint}>
              They've shared their socials — log in to view them.
            </Text>
          )}
          <Section style={btnRow}>
            <Button href={acceptUrl} style={btnGreen}>
              Accept
            </Button>
            <Button href={declineUrl} style={btnGray}>
              Decline
            </Button>
          </Section>
          <Text style={hint}>
            Or manage all requests in your{" "}
            <Link href="https://outsyde.org/profile/linkups" style={link}>
              Link Ups dashboard
            </Link>
            .
          </Text>
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
      Unsubscribe from notifications
    </Link>
  </Section>
);

export default LinkUpRequestEmail;
