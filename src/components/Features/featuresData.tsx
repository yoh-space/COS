import { Feature } from "@/types/feature";
import { Monitor, Code2, Network, BrainCircuit, Megaphone, Users } from "lucide-react"; 

const featuresData: Feature[] = [
  {
    id: 1,
    icon: <Monitor className="w-10 h-10 text-primary" />,
    title: "Application Development",
    paragraph:
      "We design, build, and deploy robust, scalable, and user-centric applications for mobile, desktop, and cloud platforms. Our services cover the full software development lifecycle, from initial concept to ongoing maintenance and support.",
  },
  {
    id: 2,
    icon: <Code2 className="w-10 h-10 text-primary" />,
    title: "Web Development",
    paragraph:
      "Our web development services focus on creating responsive, secure, and high-performance websites and web applications. We utilize modern frameworks and ensure optimal user experience across all devices and browsers.",
  },
  {
    id: 3,
    icon: <Network className="w-10 h-10 text-primary" />,
    title: "System Development",
    paragraph:
      "We specialize in defining, designing, and implementing complex software systems tailored to your business needs. Our solutions streamline operations, improve data management, and seamlessly integrate with existing infrastructure for greater efficiency.",
  },
  {
    id: 4,
    icon: <BrainCircuit className="w-10 h-10 text-primary" />,
    title: "AI & ML Solutions",
    paragraph:
      "Leverage the power of artificial intelligence and machine learning to drive innovation. We build intelligent solutions, from predictive analytics and computer vision to natural language processing, that provide actionable insights and automate complex tasks.",
  }
];

export default featuresData;