export const title = document.querySelector("title")?.innerText;

const getContent = (selector: string) => document.querySelector<HTMLMetaElement>(selector)?.content;

export const originUrl =
  getContent("meta[property='ms:origin-url']") ||
  "https://video-game-music.net";

export const graphqlUrl =
  getContent("meta[property='ms:graphql-url']") ||
  "https://video-game-music.net/graphql";

export const recaptchaKey = getContent("meta[property='ms:recaptcha-key']");

export const googleAnalyticsId = getContent(
  "meta[property='ms:google-analytics-id']"
);

export const appleAffiliateToken = getContent(
  "meta[property='ms:apple-affiliate-token']"
);

export const twitterAccount =
  getContent("meta[property='ms:twitter-account']") || "vgm_net";
