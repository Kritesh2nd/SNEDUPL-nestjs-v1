export type ProductCategory =
  | 'SOJU'
  | 'WHISKY'
  | 'VODKA'
  | 'HERO_SERIES'
  | 'OTHER_DISTILLED'
  | 'NON_ALCOHOLIC'
  | 'UPCOMING';

export type BoardType = 'Board of Directors' | 'Management';

export interface TasteNote {
  label: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}
