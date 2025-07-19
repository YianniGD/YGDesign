

export interface Artwork {
  id: string;
  title: string;
  imageUrl: string; // Can be a URL or an SVG string
  imageWidth: number;
  imageHeight: number;
  description: string;
  tags: string[];
  category: string;
  creationDate: string; // e.g., "2023" or "2023-05-15"
  dimensions: string; // e.g., "100cm x 75cm"
  medium: string; // e.g., "Oil on canvas"
  toolsUsed?: string[];
  dataAiHint?: string; // For placeholder images, max two words
  additionalImageUrls?: (string | undefined)[]; // Can be URLs or SVG strings
  additionalImageCaptions?: (string | undefined)[]; // Captions for additional images
  interactiveDisplay?: {
    contentImageUrl: string;
    // Optional: Define the natural width of the content image if known, for styling
    contentImageNaturalWidth?: number;
  };
  specialDetailImage?: string; // For a unique image display on the detail page
  imageCaption?: string; // Special description to appear under the image(s)
  showLogoSwitcher?: boolean;
  showMotifSwitcher?: boolean;
  downloadablePdfUrl?: string; // New field for PDF link
}
