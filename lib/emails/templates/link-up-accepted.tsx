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
import { btnOrange, card, cardMeta, cardTitle, container, content, footer, footerLink, footerText, h1, header, logo, main, socialLink, socialsRow, text } from "../styles";

type Props = {
  requesterName: string;
  creatorName: string;
  linkUpTitle: string;
  linkUpDate: string;
  locationName: string;
  locationUrl: string;
  creatorSocials?: {
    instagramUrl?: string | null;
    tiktokUrl?: string | null;
    xUrl?: string | null;
    snapchatUrl?: string | null;
  } | null;
};

export const LinkUpAcceptedEmail = ({
  requesterName,
  creatorName,
  linkUpTitle,
  linkUpDate,
  locationName,
  locationUrl,
  creatorSocials,
}: Props) => (
  <Html>
    <Head />
    <Preview>You're in! {creatorName} accepted your Link Up request</Preview>
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
          <Heading style={h1}>You're in! 🎉</Heading>
          <Text style={text}>Hi {requesterName},</Text>
          <Text style={text}>
            <strong>{creatorName}</strong> accepted your request to join their
            Link Up.
          </Text>
          <Section style={card}>
            <Text style={cardTitle}>{linkUpTitle}</Text>
            <Text style={cardMeta}>
              📍 {locationName} · 🗓 {linkUpDate}
            </Text>
          </Section>
          {creatorSocials && Object.values(creatorSocials).some(Boolean) && (
            <>
              <Text style={text}>
                The creator shared their socials so you can connect:
              </Text>
              <Section style={socialsRow}>
                {creatorSocials.instagramUrl && (
                  <Link
                    href={`https://instagram.com/${creatorSocials.instagramUrl}`}
                    style={socialLink}
                  >
                    📸 Instagram
                  </Link>
                )}
                {creatorSocials.tiktokUrl && (
                  <Link
                    href={`https://tiktok.com/@${creatorSocials.tiktokUrl}`}
                    style={socialLink}
                  >
                    🎵 TikTok
                  </Link>
                )}
                {creatorSocials.xUrl && (
                  <Link
                    href={`https://x.com/${creatorSocials.xUrl}`}
                    style={socialLink}
                  >
                    𝕏 X
                  </Link>
                )}
                {creatorSocials.snapchatUrl && (
                  <Link
                    href={`https://snapchat.com/add/${creatorSocials.snapchatUrl}`}
                    style={socialLink}
                  >
                    👻 Snapchat
                  </Link>
                )}
              </Section>
            </>
          )}
          <Button href={locationUrl} style={btnOrange}>
            View the spot
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
