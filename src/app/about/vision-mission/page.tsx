"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import { BASE_URL } from "@/lib/seo.config";
import { BreadcrumbJsonLd } from "next-seo";
import { motion } from "framer-motion";
import {
  Eye,
  Target,
  CheckCircle2,
  Users,
  Lightbulb,
  Shield,
  TrendingUp,
  Globe,
} from "lucide-react";

const VisionMissionPage = () => {
  const missionPoints = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Quality Research-Based Education",
      description:
        "Provide quality research based science education and academic programs to meet future challenges.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Career Preparation",
      description:
        "Prepare students for careers across a broad range of science and mathematics disciplines.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Full Potential Achievement",
      description:
        "Enable students and faculty to achieve their full potential in their quest for teaching and learning.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safe Environment",
      description:
        "Provide a safe environment for faculty, students and administration.",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Community Research",
      description:
        "Meet the emerging needs of the community through research.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Public Service",
      description:
        "Support public service activities through collaborative work with both government and non governmental institutions.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            name: "Home",
            item: `${BASE_URL}/`,
          },
          {
            name: "About",
            item: `${BASE_URL}/about`,
          },
          {
            name: "Vision & Mission",
            item: `${BASE_URL}/about/vision-mission`,
          },
        ]}
      />
      <Breadcrumb
        pageName="Vision & Mission"
        description="Shaping the future of science education and research excellence."
      />

      {/* Vision Section */}
      <section className="relative overflow-hidden pb-16 pt-20 bg-gray-50 dark:bg-black">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900/20 p-12 shadow-sm border border-blue-100 dark:border-blue-900/30 md:p-16">
              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl"></div>

              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center gap-3 rounded-md bg-blue-100 dark:bg-blue-950/50 px-5 py-2.5 backdrop-blur-sm">
                  <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Our Vision
                  </span>
                </div>

                <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
                  Vision of College of Science
                </h2>

                <p className="max-w-4xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl">
                  The college has the vision of becoming one of the best
                  researches and teaching learning colleges in the university
                  producing graduates that could be of a national model.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="pb-20 pt-8 bg-gray-50 dark:bg-black">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-3 rounded-md bg-blue-50 dark:bg-blue-950/30 px-5 py-2.5">
              <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Our Mission
              </span>
            </div>

            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Mission of the College
            </h2>

            <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
              The college of science is committed in providing high quality
              research based teaching-learning in science and mathematics that
              promote the success of its students.
            </p>
          </motion.div>

          {/* Mission Points Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {missionPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-lg bg-white p-8 shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:border-blue-100 dark:hover:border-blue-900/50 dark:bg-gray-dark"
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>

                <div className="relative z-10">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 transition-all duration-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 group-hover:scale-110">
                    {point.icon}
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                    {point.title}
                  </h3>

                  <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                    {point.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-100/20 dark:bg-blue-900/10 blur-2xl transition-all duration-300 group-hover:scale-150"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Commitment Banner */}
      <section className="pb-20 bg-gray-50 dark:bg-black">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900/20 p-12 text-center shadow-sm border border-blue-100 dark:border-blue-900/30"
          >
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>

            <div className="relative z-10">
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/50">
                <CheckCircle2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>

              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
                Committed to Excellence
              </h3>

              <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                Through dedication to quality education, innovative research,
                and community engagement, we strive to produce graduates who
                serve as national models of excellence.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default VisionMissionPage;
