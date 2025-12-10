import { Feature } from "@/types/feature";
import {
  GraduationCap,
  Microscope,
  BookOpen,
  Users,
  FlaskConical,
  Award,
} from "lucide-react";

export const featuresData: Feature[] = [
  {
    id: 1,
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Quality Education",
    paragraph:
      "We provide high-quality research-based teaching and learning in science and mathematics, preparing students for successful careers across diverse scientific disciplines.",
  },
  {
    id: 2,
    icon: <Microscope className="h-6 w-6" />,
    title: "Research Excellence",
    paragraph:
      "Our college is committed to conducting innovative research that addresses societal needs and contributes to scientific advancement across all departments.",
  },
  {
    id: 3,
    icon: <FlaskConical className="h-6 w-6" />,
    title: "Modern Laboratories",
    paragraph:
      "Equipped with advanced facilities, our laboratories provide hands-on experience in Chemistry, Physics, Biology, Mathematics, Statistics, and Industrial Chemistry.",
  },
  {
    id: 4,
    icon: <Users className="h-6 w-6" />,
    title: "Community Engagement",
    paragraph:
      "We actively collaborate with institutions to support public service activities, meet community needs through research, and promote scientific literacy.",
  },
  {
    id: 5,
    icon: <BookOpen className="h-6 w-6" />,
    title: "Diverse Programs",
    paragraph:
      "Offering comprehensive undergraduate and graduate programs in multiple scientific disciplines to help students achieve their full potential.",
  },
  {
    id: 6,
    icon: <Award className="h-6 w-6" />,
    title: "National Excellence",
    paragraph:
      "Striving to become one of the best research and teaching colleges, producing graduates who serve as national models of excellence.",
  },
];

// Extended feature data with colors for the new design
export const extendedFeaturesData = [
  {
    ...featuresData[0],
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-500/10",
    shadowColor: "shadow-blue-500/20",
    hoverShadow: "hover:shadow-blue-500/30",
    stats: { value: "6", label: "Departments" },
  },
  {
    ...featuresData[1],
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-500/10",
    shadowColor: "shadow-purple-500/20",
    hoverShadow: "hover:shadow-purple-500/30",
    stats: { value: "200+", label: "Publications" },
  },
  {
    ...featuresData[2],
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-500/10",
    shadowColor: "shadow-emerald-500/20",
    hoverShadow: "hover:shadow-emerald-500/30",
    stats: { value: "15+", label: "Labs" },
  },
  {
    ...featuresData[3],
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/10",
    shadowColor: "shadow-amber-500/20",
    hoverShadow: "hover:shadow-amber-500/30",
    stats: { value: "50+", label: "Partners" },
  },
  {
    ...featuresData[4],
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-500/10",
    shadowColor: "shadow-rose-500/20",
    hoverShadow: "hover:shadow-rose-500/30",
    stats: { value: "12+", label: "Programs" },
  },
  {
    ...featuresData[5],
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-500/10",
    shadowColor: "shadow-cyan-500/20",
    hoverShadow: "hover:shadow-cyan-500/30",
    stats: { value: "95%", label: "Success" },
  },
];

export default featuresData;
