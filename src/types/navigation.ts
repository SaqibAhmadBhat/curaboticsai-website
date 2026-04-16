export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface NavConfig {
  mainNav: NavLink[];
  footerNav: Record<string, NavLink[]>;
}
