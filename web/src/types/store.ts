// Store Item Types (STRICT ENUM)
export type StoreItemType = 
  | "physical_product"
  | "digital_product"
  | "workshop"
  | "live_class"
  | "bundle";

// Category
export interface Category {
  categoryId: string;
  name: string;
  slug: string;
  parentCategoryId: string | null;
  image?: string;
  description?: string;
  orderIndex: number;
  status: "active" | "inactive";
  createdAt: any;
  updatedAt: any;
}

// Brand
export interface Brand {
  brandId: string;
  name: string;
  logo?: string;
  description?: string;
  websiteUrl?: string;
  status: "active" | "inactive";
  createdAt: any;
  updatedAt: any;
}

// Variant Option
export interface VariantOption {
  name: string; // e.g., "Size", "Color"
  values: string[]; // e.g., ["S", "M", "L"]
}

// Variant
export interface Variant {
  variantId: string;
  itemId: string;
  optionValues: Record<string, string>; // e.g., { "Size": "M", "Color": "Red" }
  price: number;
  sku: string;
  barcode?: string;
  stockQuantity: number;
  status: "active" | "inactive";
  createdAt: any;
  updatedAt: any;
}

// Store Item (Base)
export interface StoreItem {
  itemId: string;
  itemType: StoreItemType;
  title: string;
  shortDescription?: string;
  fullDescription?: string; // Rich text
  categoryId: string; // Required
  brandId?: string | null;
  hasVariants: boolean;
  isDigital: boolean;
  
  // Pricing
  basePrice: number;
  compareAtPrice?: number;
  taxable: boolean;
  currency: string;
  
  // Inventory (for physical products, workshops, live classes)
  trackInventory: boolean;
  stockQuantity?: number;
  allowBackorder: boolean;
  lowStockThreshold?: number;
  
  // Variants
  variantOptions?: VariantOption[];
  variants?: Variant[];
  
  // Media
  images: string[];
  videos: string[];
  thumbnailImage?: string;
  
  // Product specifications (optional, for physical products)
  material?: string;
  dimensions?: string;
  weight?: string;
  warranty?: string;
  
  // Bundle (if itemType === "bundle")
  includedItems?: Array<{
    itemId: string;
    variantId?: string;
    quantity: number;
  }>;
  bundlePrice?: number;
  
  // Workshop/Live Class specific
  location?: string; // For workshops
  city?: string; // For workshops
  date?: any; // For workshops/live classes
  startTime?: string;
  endTime?: string;
  capacity?: number; // For workshops/live classes
  meetingUrl?: string; // For live classes
  
  // SEO
  seoTitle?: string;
  seoDescription?: string;
  slug: string;
  
  // System
  status: "draft" | "active" | "inactive";
  featured: boolean;
  createdAt: any;
  updatedAt: any;
}

// Homepage Section
export interface HomepageSection {
  sectionId: string;
  type: 
    | "hero_banner"
    | "featured_items"
    | "category_slider"
    | "new_arrivals"
    | "best_sellers"
    | "upcoming_workshops"
    | "live_classes"
    | "custom_html";
  title?: string;
  subtitle?: string;
  dataSource: "manual" | "auto";
  linkedCategoryId?: string;
  linkedItemIds?: string[];
  displayLimit: number;
  orderIndex: number;
  status: "active" | "inactive";
  createdAt: any;
  updatedAt: any;
}



