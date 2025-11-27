export type Brand = {
  id: number;
  name: string;
  href: string;
  icon?: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
};
 