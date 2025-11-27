import { Brand } from "@/types/brand";
import { Atom, Boxes, Smartphone, Rocket, Layers, Paintbrush } from "lucide-react";

const brandsData: Brand[] = [
  { id: 1, name: "React", href: "https://react.dev/", icon: Atom },
  { id: 2, name: "Next.js", href: "https://nextjs.org/", icon: Boxes },
  { id: 3, name: "React Native", href: "https://reactnative.dev/", icon: Smartphone },
  { id: 4, name: "Expo", href: "https://expo.dev/", icon: Rocket },
  { id: 5, name: "Vue.js", href: "https://vuejs.org/", icon: Layers },
  { id: 6, name: "Tailwind CSS", href: "https://tailwindcss.com/", icon: Paintbrush },
];

export default brandsData;
