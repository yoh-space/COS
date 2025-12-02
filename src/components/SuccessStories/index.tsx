"use client";

import { useState, useEffect } from 'react';
import { Award, MapPin, Calendar, Star, GraduationCap } from 'lucide-react';
import Image from 'next/image';

interface SuccessStory {
  id: string;
  title: string;
  studentName: string;
  graduationYear: number;
  degree: string;
  currentPosition: string;
  company: string | null;
  story: string;
  image: string | null;
  achievements: string[];
  featured: boolean;
}

const SuccessStories = () => {
  const [stories, setStories] = useState<SuccessStory[]>([]);

  // Fallback data
  const fallbackStories: SuccessStory[] = [
    {
      id: '1',
      title: 'From Chemistry Student to Research Scientist',
      studentName: 'Dr. Alemayehu Tadesse',
      graduationYear: 2018,
      degree: 'BSc Chemistry',
      currentPosition: 'Senior Research Scientist',
      company: 'Ethiopian Institute of Agricultural Research',
      story: 'After graduating with a BSc in Chemistry from BDU College of Science, I pursued advanced research in agricultural chemistry. Today, I lead a team developing sustainable fertilizers that have improved crop yields for thousands of Ethiopian farmers.',
      image: null,
      achievements: [
        'Published 15 peer-reviewed papers',
        'Led 3 major research projects',
        'Received National Science Award 2023'
      ],
      featured: true,
    },
    {
      id: '2',
      title: 'Mathematics Graduate Becomes Tech Entrepreneur',
      studentName: 'Hanan Mohammed',
      graduationYear: 2019,
      degree: 'BSc Mathematics',
      currentPosition: 'CEO & Founder',
      company: 'EduTech Solutions Ethiopia',
      story: 'My mathematics background from BDU gave me the analytical skills to identify gaps in educational technology. I founded EduTech Solutions, which now serves over 50,000 students across Ethiopia with innovative learning platforms.',
      image: null,
      achievements: [
        'Founded successful EdTech startup',
        'Served 50,000+ students',
        'Featured in Forbes Africa 30 Under 30'
      ],
      featured: true,
    },
    {
      id: '3',
      title: 'Physics Graduate Advances Renewable Energy',
      studentName: 'Dawit Bekele',
      graduationYear: 2017,
      degree: 'MSc Physics',
      currentPosition: 'Renewable Energy Engineer',
      company: 'Ethiopian Electric Power',
      story: 'The solid foundation in physics I received at BDU enabled me to specialize in renewable energy systems. I now work on large-scale solar and wind projects that are transforming Ethiopia\'s energy landscape.',
      image: null,
      achievements: [
        'Designed 5 major solar installations',
        'Contributed to 200MW renewable capacity',
        'International Energy Conference speaker'
      ],
      featured: false,
    },
  ];

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/api/cms/success-stories?status=published&featured=true&limit=6');
        if (response.ok) {
          const data = await response.json();
          if (data.stories && data.stories.length > 0) {
            setStories(data.stories);
          } else {
            setStories(fallbackStories);
          }
        } else {
          setStories(fallbackStories);
        }
      } catch (error) {
        console.error('Failed to fetch success stories:', error);
        setStories(fallbackStories);
      }
    };

    fetchStories();
  }, [fallbackStories]);

  const displayStories = stories.length > 0 ? stories : fallbackStories;

  return (
    <section id="success-stories" className="py-16 md:py-20 lg:py-28 bg-gray-light dark:bg-bg-color-dark">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px]">
            Success Stories
          </h2>
          <p className="text-base text-body-color mt-4 max-w-3xl mx-auto">
            Discover how our graduates are making a difference in their fields and contributing to society through their achievements and innovations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayStories.slice(0, 6).map((story) => (
            <div
              key={story.id}
              className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-dark shadow-one hover:shadow-two transition-all duration-300"
            >
              {story.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    <Star size={12} />
                    Featured
                  </div>
                </div>
              )}

              {story.image ? (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.studentName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Award size={48} className="text-primary/30" />
                </div>
              )}

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 line-clamp-2">
                    {story.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-body-color mb-2">
                    <span className="font-semibold text-primary">{story.studentName}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-body-color mb-3">
                    <div className="flex items-center gap-1">
                      <GraduationCap size={14} />
                      <span>{story.degree}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{story.graduationYear}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-black dark:text-white mb-1">
                    {story.currentPosition}
                  </p>
                  {story.company && (
                    <div className="flex items-center gap-1 text-xs text-body-color">
                      <MapPin size={12} />
                      <span>{story.company}</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-body-color leading-relaxed mb-4 line-clamp-3">
                  {story.story}
                </p>

                {story.achievements.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-black dark:text-white">Key Achievements:</p>
                    <div className="space-y-1">
                      {story.achievements.slice(0, 2).map((achievement, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span className="text-xs text-body-color">{achievement}</span>
                        </div>
                      ))}
                      {story.achievements.length > 2 && (
                        <p className="text-xs text-primary font-medium">
                          +{story.achievements.length - 2} more achievements
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-base text-body-color">
            Join our growing community of successful graduates making an impact worldwide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;