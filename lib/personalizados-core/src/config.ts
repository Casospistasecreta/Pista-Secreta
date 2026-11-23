export const PERSONALIZED_PRODUCTS = {
  digital: {
    priceCents: 24700,
    checkoutUrl: "",
  },
  physical: {
    priceCents: 34700,
    digitalAddonPriceCents: null,
    checkoutUrl: "",
    shippingNoteKey: "personalized.physical.shippingNote",
    freightCheckoutUrl: "",
  },
  exclusive: {
    minimumPriceCents: 79700,
    maximumPriceCents: 130000,
    checkoutUrl: "",
  },
} as const;

export const PERSONALIZED_UPLOAD_LIMITS = {
  maxFiles: 5,
  maxFileBytes: 10 * 1024 * 1024,
  maxTotalBytes: 30 * 1024 * 1024,
  acceptedExtensions: [".jpg", ".jpeg", ".png", ".webp", ".pdf", ".txt", ".rtf", ".docx"],
} as const;
