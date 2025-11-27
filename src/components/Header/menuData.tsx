import { Menu } from "@/types/menu";
import { Home, Info, Phone, BookOpen, GraduationCap, FlaskConical, Users, FileText, Building2 } from "lucide-react";

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
    newTab: false,
    icon: Info,
    submenu: [
      {
        id: 21,
        title: "Background",
        path: "/about",
        newTab: false,
        icon: Info,
      },
      {
        id: 22,
        title: "Vision & Mission",
        path: "/about",
        newTab: false,
        icon: Info,
      },
      {
        id: 23,
        title: "Dean's Message",
        path: "/about",
        newTab: false,
        icon: Users,
      },
    ],
  },
  {
    id: 3,
    title: "Academics",
    newTab: false,
    icon: GraduationCap,
    submenu: [
      {
        id: 31,
        title: "Chemistry",
        path: "/blog-sidebar",
        newTab: false,
        icon: FlaskConical,
      },
      {
        id: 32,
        title: "Industrial Chemistry",
        path: "/blog-sidebar",
        newTab: false,
        icon: FlaskConical,
      },
      {
        id: 33,
        title: "Mathematics",
        path: "/blog-sidebar",
        newTab: false,
        icon: BookOpen,
      },
      {
        id: 34,
        title: "Physics",
        path: "/blog-sidebar",
        newTab: false,
        icon: BookOpen,
      },
      {
        id: 35,
        title: "Statistics",
        path: "/blog-sidebar",
        newTab: false,
        icon: BookOpen,
      },
      {
        id: 36,
        title: "Biology",
        path: "/blog-sidebar",
        newTab: false,
        icon: BookOpen,
      },
    ],
  },
  {
    id: 4,
    title: "Research",
    path: "/pricing",
    newTab: false,
    icon: FlaskConical,
  },
  {
    id: 5,
    title: "Administration",
    newTab: false,
    icon: Building2,
    submenu: [
      {
        id: 51,
        title: "College Dean",
        path: "/about",
        newTab: false,
        icon: Users,
      },
      {
        id: 52,
        title: "Academic Vice Dean",
        path: "/about",
        newTab: false,
        icon: Users,
      },
      {
        id: 53,
        title: "Academic Council",
        path: "/about",
        newTab: false,
        icon: Users,
      },
    ],
  },
  {
    id: 6,
    title: "Staff",
    path: "/blog",
    newTab: false,
    icon: Users,
  },
  {
    id: 7,
    title: "Contact",
    path: "/contact",
    newTab: false,
    icon: Phone,
  },
];
export default menuData;
