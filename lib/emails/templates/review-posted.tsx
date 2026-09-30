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
  Img
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
  quoteBlock,
  quoteText,
  text,
} from "../styles";

type Props = {
  placeName: string;
  reviewerName: string;
  rating: number;
  body: string;
  placeUrl: string;
};

export const ReviewPostedEmail = ({
  placeName,
  reviewerName,
  rating,
  body,
  placeUrl,
}: Props) => (
  <Html>
    <Head />
    <Preview>
      {reviewerName} left a {String(rating)}★ review on {placeName}
    </Preview>
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
          <Heading style={h1}>New review on {placeName}</Heading>
          <Text style={text}>
            <strong>{reviewerName}</strong> left a {"★".repeat(rating)}
            {"☆".repeat(5 - rating)} review:
          </Text>
          <Section style={quoteBlock}>
            <Text style={quoteText}>&rdquo;{body}&rdquo;</Text>
          </Section>
          <Button href={placeUrl} style={btnOrange}>
            View on Outsyde
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
