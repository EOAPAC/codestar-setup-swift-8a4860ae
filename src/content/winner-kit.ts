import sealAsset from "@/assets/ea-winner-seal-full-1200.png.asset.json";
import bannerAsset from "@/assets/ea-winner-social-Linkedin_Post-2.png.asset.json";
import squareAsset from "@/assets/ea-winner-social-IG_Post-2.png.asset.json";
import storyAsset from "@/assets/ea-winner-social-IG_story-2.png.asset.json";
import signatureAsset from "@/assets/ea-winner-emailsig-full-600x200-2.png.asset.json";
import certificateUrl from "@/assets/ea-winner-certificate.png";

export type WinnerKitFile = {
  id: string;
  name: string;
  /** Same file is used for the tile preview and for the download. */
  url: string;
  filename: string;
  alt: string;
  /** object-fit for the tile preview. */
  fit: "contain" | "cover";
  /** One-line guidance on where to use the asset. */
  description: string;
};

export const winnerKitFiles: WinnerKitFile[] = [
  {
    id: "seal",
    name: "Winner badge",
    url: sealAsset.url,
    filename: "entrepreneur-awards-winner-badge.png",
    alt: "Entrepreneur Awards winner badge",
    fit: "contain",
    description: "Put this in your website footer or on your homepage.",
  },
  {
    id: "banner",
    name: "LinkedIn banner",
    url: bannerAsset.url,
    filename: "entrepreneur-awards-linkedin-banner.png",
    alt: "LinkedIn banner graphic",
    fit: "cover",
    description: "The header image across the top of your LinkedIn profile.",
  },
  {
    id: "square",
    name: "Square post",
    url: squareAsset.url,
    filename: "entrepreneur-awards-square-post.png",
    alt: "Square social post graphic",
    fit: "contain",
    description: "Post this to Instagram, LinkedIn or Facebook.",
  },
  {
    id: "story",
    name: "Story graphic",
    url: storyAsset.url,
    filename: "entrepreneur-awards-story.png",
    alt: "Vertical story graphic",
    fit: "contain",
    description: "For Instagram and LinkedIn stories.",
  },
  {
    id: "signature",
    name: "Email signature",
    url: signatureAsset.url,
    filename: "entrepreneur-awards-email-signature.png",
    alt: "Email signature strip graphic",
    fit: "contain",
    description: "Add this under your name in every email you send.",
  },
  {
    id: "certificate",
    name: "Certificate",
    url: certificateUrl,
    filename: "entrepreneur-awards-certificate.png",
    alt: "Entrepreneur Awards certificate",
    fit: "contain",
    description: "Print it, frame it, or send it to anyone who asks.",
  },
];
