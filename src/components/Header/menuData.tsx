import { Menu } from "@/types/menu";
import { Home, Info, Phone, BookOpen, Layers, FileText, LogIn, UserPlus, Briefcase } from "lucide-react";

const menuData: (Menu & { icon?: any })[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
    icon: Home,
  },
  {
    id: 2,
    title: "About",
    path: "/about",
    newTab: false,
    icon: Info,
  },
  {
    id: 34,
    title: "Services",
    path: "/pricing",
    newTab: false,
    icon: Briefcase,
  },
  {
    id: 33,
    title: "Blog",
    path: "/blog-sidebar",
    newTab: false,
    icon: BookOpen,
  },
  {
    id: 3,
    title: "Contact",
    path: "/contact",
    newTab: false,
    icon: Phone,
  },
  {
    id: 4,
    title: "Pages",
    newTab: false,
    icon: Layers,
    submenu: [
      {
        id: 41,
        title: "About Page",
        path: "/about",
        newTab: false,
        icon: Info,
      },
      {
        id: 42,
        title: "Contact Page",
        path: "/contact",
        newTab: false,
        icon: Phone,
      },
      {
        id: 43,
        title: "Blog Grid Page",
        path: "/blog",
        newTab: false,
        icon: FileText,
      },
      {
        id: 44,
        title: "Blog Sidebar Page",
        path: "/blog-sidebar",
        newTab: false,
        icon: BookOpen,
      },
      {
        id: 45,
        title: "Blog Details Page",
        path: "/blog-details",
        newTab: false,
        icon: FileText,
      },
      {
        id: 46,
        title: "Sign In Page",
        path: "/sign-in",
        newTab: false,
        icon: LogIn,
      },
      {
        id: 47,
        title: "Sign Up Page",
        path: "/sign-up",
        newTab: false,
        icon: UserPlus,
      }
    ],
  },
];
export default menuData;
