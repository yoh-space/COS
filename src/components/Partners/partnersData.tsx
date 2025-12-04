import { Brand } from "@/types/brand";
import { FlaskConical, Atom, Calculator, Dna, BarChart3, GraduationCap } from "lucide-react";

const partnersData: Brand[] = [
  {
    id: 1,
    name: "Chemistry",
    href: "https://cos.yotech.space/academics/chemistry",
    icon: FlaskConical
  },
  {
    id: 2,
    name: "Physics",
    href: "https://cos.yotech.space/academics/physics",
    icon: Atom
  },
  {
    id: 3,
    name: "Mathematics",
    href: "https://cos.yotech.space/academics/mathematics",
    icon: Calculator
  },
  {
    id: 4,
    name: "Biology",
    href: "https://cos.yotech.space/academics/biology",
    icon: Dna
  },
  {
    id: 5,
    name: "Statistics",
    href: "https://cos.yotech.space/academics/statistics",
    icon: BarChart3
  },
  {
    id: 6,
    name: "Industrial Chemistry",
    href: "https://cos.yotech.space/academics/industrial-chemistry",
    icon: GraduationCap
  },
];

export default partnersData;
