/**
 * Site-wide settings that can be toggled from admin panel
 */
export interface SiteSettings {
  settingsId: string;
  shopEnabled: boolean;
  updatedAt: string;
  updatedBy?: string;
}

