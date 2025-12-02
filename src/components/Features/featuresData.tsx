import { Feature } from "@/types/feature";
import {
  GraduationCap,
  Microscope,
  BookOpen,
  Users,
  FlaskConical,
  Award,
} from "lucide-react";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: <GraduationCap className="h-10 w-10 text-blue-600 dark:text-blue-300" />,
    title: "Quality Education",
    paragraph:
      "We provide high-quality research-based teaching and learning in science and mathematics, preparing students for successful careers across diverse scientific disciplines with cutting-edge curriculum and experienced faculty.",
  },
  {
    id: 2,
    icon: <Microscope className="h-10 w-10 text-blue-600 dark:text-blue-300" />,
    title: "Research Excellence",
    paragraph:
      "Our college is committed to conducting innovative research that addresses societal needs and contributes to scientific advancement. We foster a culture of inquiry and discovery across all departments.",
  },
  {
    id: 3,
    icon: <FlaskConical className="h-10 w-10 text-blue-600 dark:text-blue-300" />,
    title: "State of the Art Laboratories",
    paragraph:
      "Equipped with modern facilities and advanced equipment, our laboratories provide students and researchers with hands-on experience in Chemistry, Physics, Biology, Mathematics, Statistics, and Industrial Chemistry.",
  },
  {
    id: 4,
    icon: <Users className="h-10 w-10 text-blue-600 dark:text-blue-300" />,
    title: "Community Engagement",
    paragraph:
      "We actively collaborate with government and non-governmental institutions to support public service activities, meet emerging community needs through research, and promote scientific literacy and development.",
  },
  {
    id: 5,
    icon: <BookOpen className="h-10 w-10 text-blue-600 dark:text-blue-300" />,
    title: "Diverse Programs",
    paragraph:
      "Offering comprehensive undergraduate and graduate programs in multiple scientific disciplines, we enable students to achieve their full potential through rigorous academic programs designed to meet future challenges.",
  },
  {
    id: 6,
    icon: <Award className="h-10 w-10 text-blue-600 dark:text-blue-300" />,
    title: "National Excellence",
    paragraph:
      "Striving to become one of the best research and teaching colleges in the university, we are dedicated to producing graduates who serve as national models of excellence in science and mathematics.",
  },
];

export default featuresData;