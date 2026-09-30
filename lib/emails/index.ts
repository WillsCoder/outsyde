import { Resend } from "resend";
import { render } from "@react-email/render";
import { format } from "date-fns";
import { WelcomeEmail } from "./templates/welcome-email";
import LinkUpRequestEmail from "./templates/link-up-request";
import { LinkUpAcceptedEmail } from "./templates/link-up-accepted";
import { LinkUpDeclinedEmail } from "./templates/link-up-declined";
import { ReviewPostedEmail } from "./templates/review-posted";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "Outsyde <no-reply@outsyde.org>";

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function send(to: string, subject: string, html: string) {
  try {
    await resend.emails.send({ from: FROM, to, subject, html });
  } catch (e) {
    console.error("[Email] Failed to send:", subject, e);
  }
}

// ─── Welcome ──────────────────────────────────────────────────────────────────

export async function sendWelcomeEmail(to: string, name: string) {
  const html = await render(WelcomeEmail({ name }));
  await send(to, "Welcome to Outsyde 🎉", html);
}

// ─── OTP (already exists in lib/email.ts — keep as-is) ───────────────────────

// ─── Link Up: new request ─────────────────────────────────────────────────────

export async function sendLinkUpRequestEmail(params: {
  creatorEmail: string;
  creatorName: string;
  requesterName: string;
  requesterBio?: string | null;
  linkUpId: string;
  linkUpTitle: string;
  linkUpDate: Date;
  locationName: string;
  message?: string | null;
  hasSocials?: boolean;
  notifyLinkUps: boolean;
}) {
  if (!params.notifyLinkUps) return;

  const baseUrl = process.env.NEXTAUTH_URL ?? "https://outsyde.org";
  const html = await render(
    LinkUpRequestEmail({
      creatorName: params.creatorName,
      requesterName: params.requesterName,
      requesterBio: params.requesterBio,
      linkUpTitle: params.linkUpTitle,
      linkUpDate: format(params.linkUpDate, "EEE, MMM d · h:mm a"),
      locationName: params.locationName,
      message: params.message,
      acceptUrl: `${baseUrl}/api/linkups/${params.linkUpId}/quick-accept`,
      declineUrl: `${baseUrl}/api/linkups/${params.linkUpId}/quick-decline`,
      hasSocials: params.hasSocials,
    }),
  );

  await send(
    params.creatorEmail,
    `${params.requesterName} wants to join your Link Up`,
    html,
  );
}

// ─── Link Up: accepted ────────────────────────────────────────────────────────

export async function sendLinkUpAcceptedEmail(params: {
  requesterEmail: string;
  requesterName: string;
  creatorName: string;
  linkUpTitle: string;
  linkUpDate: Date;
  locationName: string;
  locationSlug: string;
  isPlace: boolean;
  creatorSocials?: {
    instagramUrl?: string | null;
    tiktokUrl?: string | null;
    xUrl?: string | null;
    snapchatUrl?: string | null;
  } | null;
  notifyLinkUps: boolean;
}) {
  if (!params.notifyLinkUps) return;

  const baseUrl = process.env.NEXTAUTH_URL ?? "https://outsyde.org";
  const locationUrl = `${baseUrl}/${params.isPlace ? "places" : "events"}/${params.locationSlug}`;

  const html = await render(
    LinkUpAcceptedEmail({
      requesterName: params.requesterName,
      creatorName: params.creatorName,
      linkUpTitle: params.linkUpTitle,
      linkUpDate: format(params.linkUpDate, "EEE, MMM d · h:mm a"),
      locationName: params.locationName,
      locationUrl,
      creatorSocials: params.creatorSocials,
    }),
  );

  await send(
    params.requesterEmail,
    `You're in! ${params.creatorName} accepted your request`,
    html,
  );
}

// ─── Link Up: declined ────────────────────────────────────────────────────────

export async function sendLinkUpDeclinedEmail(params: {
  requesterEmail: string;
  requesterName: string;
  linkUpTitle: string;
  locationName: string;
  notifyLinkUps: boolean;
}) {
  if (!params.notifyLinkUps) return;

  const html = await render(
    LinkUpDeclinedEmail({
      requesterName: params.requesterName,
      linkUpTitle: params.linkUpTitle,
      locationName: params.locationName,
      browseUrl: `${process.env.NEXTAUTH_URL ?? "https://outsyde.org"}/places`,
    }),
  );

  await send(params.requesterEmail, "Update on your Link Up request", html);
}

// ─── Review posted ────────────────────────────────────────────────────────────

export async function sendReviewPostedEmail(params: {
  adminEmail: string;
  placeName: string;
  reviewerName: string;
  rating: number;
  body: string;
  placeSlug: string;
  notifyReviews: boolean;
}) {
  if (!params.notifyReviews) return;

  const html = await render(
    ReviewPostedEmail({
      placeName: params.placeName,
      reviewerName: params.reviewerName,
      rating: params.rating,
      body: params.body,
      placeUrl: `${process.env.NEXTAUTH_URL ?? "https://outsyde.org"}/places/${params.placeSlug}`,
    }),
  );

  await send(
    params.adminEmail,
    `New ${params.rating}★ review on ${params.placeName}`,
    html,
  );
}
