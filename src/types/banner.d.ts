// banner.d.ts

export interface BannerSlide {
  title: string;
  description: string;
  backgroundColor: string; // e.g., hex code or CSS color string
}

export const bannerSlides: BannerSlide[];
