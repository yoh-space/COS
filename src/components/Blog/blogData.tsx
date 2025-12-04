import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    _id: 1,
    title: "Best UI components for modern websites",
    paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
    image: "/images/blog/blog-01.jpg",
    content: "Sample content for Best UI components for modern websites.",
    createdTime: "2025-01-01T00:00:00Z",
    author: {
      name: "Samuyl Joshi",
      image: "/images/blog/author-01.png",
      designation: "Graphic Designer",
    },
    image_url: "/images/blog/blog-01.jpg",
    created_at: "2025-01-01T00:00:00Z",
    views: 100,
    updated_at: "2025-01-02T00:00:00Z",
    excerpt: "A quick look at the best UI components.",
    slug: "best-ui-components",
    tags: ["creative"],

  },
  {
    _id: 2,
    title: "9 simple ways to improve your design skills",
    paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
    image: "/images/blog/blog-02.jpg",
    content: "Sample content for 9 simple ways to improve your design skills.",
    createdTime: "2025-02-01T00:00:00Z",
    author: {
      name: "Musharof Chy",
      image: "/images/blog/author-02.png",
      designation: "Content Writer",
    },
    image_url: "/images/blog/blog-02.jpg",
    created_at: "2025-02-01T00:00:00Z",
    views: 80,
    updated_at: "2025-02-02T00:00:00Z",
    excerpt: "Improve your design skills with these tips.",
    slug: "improve-design-skills",
    tags: ["computer"],

  },
  {
    _id: 3,
    title: "Tips to quickly improve your coding speed.",
    paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.",
    image: "/images/blog/blog-03.jpg",
    content: "Sample content for Tips to quickly improve your coding speed.",
    createdTime: "2025-03-01T00:00:00Z",
    author: {
      name: "Lethium Deo",
      image: "/images/blog/author-03.png",
      designation: "Graphic Designer",
    },
    image_url: "/images/blog/blog-03.jpg",
    created_at: "2025-03-01T00:00:00Z",
    views: 120,
    updated_at: "2025-03-02T00:00:00Z",
    excerpt: "Boost your coding speed with these tips.",
    slug: "improve-coding-speed",
    tags: ["design"],

  },
];
export default blogData;
