
import { useMemo } from "react";
import { FaTelegramPlane, FaTwitter, FaFacebookF } from "react-icons/fa";

type SharePostProps = {
  slug: string;
};

const SharePost = ({ slug }: SharePostProps) => {
  // Construct the full blog post URL
  const postUrl = useMemo(() => `https://www.yotech.space/blog-details/${slug}`
  , [slug]);

  return (
    <>
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(postUrl)}`}
        aria-label="share-telegram"
        className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xs bg-gray-light text-body-color duration-300 hover:bg-primary hover:text-white dark:bg-gray-dark dark:hover:bg-primary sm:ml-3"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaTelegramPlane size={18} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`}
        aria-label="share-twitter"
        className="mb-3 ml-3 inline-flex h-9 w-9 items-center justify-center rounded-xs bg-gray-light text-body-color duration-300 hover:bg-primary hover:text-white dark:bg-gray-dark dark:hover:bg-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaTwitter size={18} />
      </a>
      <a
        href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
        aria-label="share-facebook"
        className="mb-3 ml-3 inline-flex h-9 w-9 items-center justify-center rounded-xs bg-gray-light text-body-color duration-300 hover:bg-primary hover:text-white dark:bg-gray-dark dark:hover:bg-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebookF size={18} />
      </a>
    </>
  );
};

export default SharePost;
