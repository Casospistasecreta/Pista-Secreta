import wendelImage from "@assets/1.png";
import universitarioImage from "@assets/2.png";
import donaOdeteImage from "@assets/caso-dona-odete.jpg";

const baseUrl = import.meta.env.BASE_URL;

export const QUIZ_CASE_IMAGES: Record<string, string> = {
  "wendel-jr": wendelImage,
  universitario: universitarioImage,
  "dona-odete": donaOdeteImage,
  rasputin: `${baseUrl}investigacao/caso-rasputin/card.webp`,
  "peao-envenenado": `${baseUrl}investigacao/caso-peao-envenenado/card.webp`,
  "justin-nobaind": `${baseUrl}investigacao/caso-justin-nobaind/card.webp`,
};
