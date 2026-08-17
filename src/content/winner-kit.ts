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
};

export const winnerKitFiles: WinnerKitFile[] = [
  {
    id: "seal",
    name: "Winner badge",
    url: sealAsset.url,
    filename: "entrepreneur-awards-winner-badge.png",
    alt: "Entrepreneur Awards winner badge",
    fit: "contain",
  },
  {
    id: "banner",
    name: "LinkedIn banner",
    url: bannerAsset.url,
    filename: "entrepreneur-awards-linkedin-banner.png",
    alt: "LinkedIn banner graphic",
    fit: "cover",
  },
  {
    id: "square",
    name: "Square post",
    url: squareAsset.url,
    filename: "entrepreneur-awards-square-post.png",
    alt: "Square social post graphic",
    fit: "contain",
  },
  {
    id: "story",
    name: "Story graphic",
    url: storyAsset.url,
    filename: "entrepreneur-awards-story.png",
    alt: "Vertical story graphic",
    fit: "contain",
  },
  {
    id: "signature",
    name: "Email signature",
    url: signatureAsset.url,
    filename: "entrepreneur-awards-email-signature.png",
    alt: "Email signature strip graphic",
    fit: "contain",
  },
  {
    id: "certificate",
    name: "Certificate",
    url: certificateUrl,
    filename: "entrepreneur-awards-certificate.png",
    alt: "Entrepreneur Awards certificate",
    fit: "contain",
  },
];
