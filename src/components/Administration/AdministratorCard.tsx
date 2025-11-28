import Image from "next/image";
import { Administrator } from "@/types/administrator";

interface AdministratorCardProps {
    administrator: Administrator;
}

const AdministratorCard = ({ administrator }: AdministratorCardProps) => {
    const { title, name, imagePath, accountabilityStatement, duties } = administrator;

    return (
        <div className="mb-10 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px]">
            <div className="mb-8 flex flex-col items-center md:flex-row md:items-start md:gap-8">
                {/* Administrator Image */}
                <div className="mb-6 w-full flex-shrink-0 md:mb-0 md:w-80">
                    <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '535/239' }}>
                        <Image
                            src={imagePath}
                            alt={`${title}${name ? ` - ${name}` : ""}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 320px"
                            className="object-contain"
                            priority={false}
                        />
                    </div>
                    {name && (
                        <p className="mt-3 text-center text-lg font-semibold text-black dark:text-white md:text-left">
                            {name}
                        </p>
                    )}
                </div>

                {/* Title and Description */}
                <div className="flex-1">
                    <h3 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                        {title}
                    </h3>

                    {accountabilityStatement && (
                        <p className="mb-4 text-base font-medium text-body-color">
                            {accountabilityStatement}
                        </p>
                    )}
                </div>
            </div>

            {/* Duties and Responsibilities */}
            <div>
                <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">
                    Duties and Responsibilities
                </h4>
                <ul className="list-inside space-y-3 text-base font-medium text-body-color">
                    {duties.map((duty, index) => (
                        <li key={index} className="flex items-start">
                            <svg
                                className="mr-3 mt-1 h-6 w-6 flex-shrink-0 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span>{duty}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdministratorCard;
