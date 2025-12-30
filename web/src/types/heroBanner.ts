export type ActionType = "page" | "category" | "product" | "course" | "url";
export type ButtonStyle = "primary" | "secondary" | "outline";
export type TextAlignment = "left" | "center";
export type ImagePosition = "left" | "right";
export type ThemeMode = "light" | "dark";
export type BackgroundType = "solid" | "gradient" | "image";

export interface CTA {
  buttonText: string;
  buttonStyle: ButtonStyle;
  actionType: ActionType;
  actionTarget: string; // URL, itemId, categoryId, etc.
}

export interface HeroBanner {
  heroId: string;
  heroName: string;
  enabled: boolean;
  displayOrder: number;
  
  // Content
  eyebrowText?: string;
  mainHeading: string;
  subheading?: string;
  
  // Primary CTA (Required)
  primaryCta: CTA;
  
  // Secondary CTA (Optional)
  secondaryCta?: CTA;
  
  // Visual
  heroImage?: string;
  imageAltText?: string;
  
  // Layout & Style
  textAlignment: TextAlignment;
  imagePosition: ImagePosition;
  themeMode: ThemeMode;
  backgroundType: BackgroundType;
  backgroundColor?: string; // For solid or gradient
  backgroundGradient?: string; // For gradient (e.g., "from-blue-500 to-purple-500")
  backgroundImage?: string; // For image background
  
  // Responsive
  hideImageOnMobile: boolean;
  
  // System
  status: "active" | "inactive";
  createdAt: any;
  updatedAt: any;
}
