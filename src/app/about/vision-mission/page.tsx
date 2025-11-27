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
      <section className="relative overflow-hidden pb-16 pt-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className="relative overflow-hidden rounded-3xl p-12 shadow-2xl md:p-16"
              style={{
                background: "var(--theme-gradient-hero)",
              }}
            >
              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm">
                  <Eye className="h-6 w-6 text-white" />
                  <span className="text-lg font-semibold text-white">
                    Our Vision
                  </span>
                </div>

                <h2 className="mb-6 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                  Vision of College of Science
                </h2>

                <p className="max-w-4xl text-lg leading-relaxed text-white/95 md:text-xl">
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
      <section className="pb-20 pt-8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 text-center"
          >
            <div
              className="mb-4 inline-flex items-center gap-3 rounded-full px-6 py-3"
              style={{
                backgroundColor: "color-mix(in srgb, var(--theme-primary) 15%, transparent)",
              }}
            >
              <Target
                className="h-6 w-6"
                style={{ color: "var(--theme-primary)" }}
              />
              <span
                className="text-lg font-semibold"
                style={{ color: "var(--theme-primary)" }}
              >
                Our Mission
              </span>
            </div>

            <h2 className="mb-6 text-3xl font-bold text-black dark:text-white md:text-4xl">
              Mission of the College
            </h2>

            <p className="mx-auto max-w-3xl text-lg text-body-color">
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
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl dark:bg-gray-dark"
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, color-mix(in srgb, var(--theme-primary) 5%, transparent) 0%, color-mix(in srgb, var(--theme-secondary) 5%, transparent) 100%)`,
                  }}
                ></div>

                <div className="relative z-10">
                  <div
                    className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: "var(--theme-gradient-primary)",
                    }}
                  >
                    {point.icon}
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                    {point.title}
                  </h3>

                  <p className="text-base leading-relaxed text-body-color">
                    {point.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <div
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-all duration-300 group-hover:scale-150"
                  style={{
                    background: `radial-gradient(circle, color-mix(in srgb, var(--theme-primary) 10%, transparent) 0%, transparent 70%)`,
                  }}
                ></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Commitment Banner */}
      <section className="pb-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl p-12 text-center shadow-2xl"
            style={{
              background: "var(--theme-gradient-accent)",
            }}
          >
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>

            <div className="relative z-10">
              <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-white" />

              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Committed to Excellence
              </h3>

              <p className="mx-auto max-w-2xl text-lg text-white/90">
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
