import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

const SingleBlog = ({ blog, compact = false }: { blog: Blog; compact?: boolean }) => {
  const { title, image, author, tags, content, createdTime } = blog;
  return (
    <>
      <div className={`group shadow-one hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark relative overflow-hidden rounded-xs bg-white duration-300 ${compact ? 'h-96' : ''}`}>
        <Link href={`/blog/${blog.slug}`}
          className="relative block aspect-37/22 w-full"
        >
          <span className="bg-primary absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white capitalize">
            {tags[0]}
          </span>
          <Image
            src={image || "/images/blog/blog-01.jpg"}
            alt="image"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        </Link>
        <div className={compact ? "p-4" : "p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8"}>
          <h3>
            <Link
              href={`/blog/${blog.slug}`}
              className={`hover:text-primary dark:hover:text-primary mb-3 block font-bold text-black dark:text-white ${compact ? 'text-lg' : 'text-xl sm:text-2xl'}`}
            >
              {title}
            </Link>
          </h3>
          {/* Show excerpt or paragraph for card preview, not full content */}
          <p className={`text-gray-700 dark:text-gray-300 font-medium ${compact ? 'mb-4 text-sm line-clamp-2' : 'mb-6 text-base line-clamp-3'}`}>
            {blog.excerpt || "No summary available."}
          </p>
          <div className={`flex items-center ${compact ? 'flex-col gap-2' : ''}`}>
            <div className={`border-body-color/10 flex items-center dark:border-white/10 ${compact ? 'w-full justify-center' : 'mr-5 border-r pr-5 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5'}`}>
              <div className={compact ? "mr-2" : "mr-4"}>
                <div className={`relative overflow-hidden rounded-full ${compact ? 'h-8 w-8' : 'h-10 w-10'}`}>
                  <Image src={author.image} alt="author" fill />
                </div>
              </div>
              <div className="w-full">
                <h4 className={`text-dark mb-1 font-medium dark:text-white ${compact ? 'text-xs' : 'text-sm'}`}>
                  By {typeof author.name === 'object' ? JSON.stringify(author.name) : author.name}
                </h4>
                {!compact && <p className="text-body-color text-xs">{typeof author.designation === 'object' ? JSON.stringify(author.designation) : author.designation}</p>}
              </div>
            </div>
            {!compact && (
              <div className="inline-block">
                <h4 className="text-dark mb-1 text-sm font-medium dark:text-white">
                  Date
                </h4>
                <p className="text-body-color text-xs">{createdTime}</p>
              </div>
            )}
            {compact && (
              <p className="text-body-color text-xs text-center">{createdTime}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
