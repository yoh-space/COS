import { Brand as BrandType } from "@/types/brand";
import partnersData from "./partnersData";

const Partners = () => {
  return (
    <section className="pt-16 bg-gray-50 dark:bg-slate-900">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
                Academic Excellence Across Disciplines
              </h2>
              <p className="text-base text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
                Discover our comprehensive range of scientific departments and their specialized programs
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center rounded-2xl bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-white/5 px-8 py-8 shadow-lg shadow-gray-200/50 dark:shadow-none sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]">
              {partnersData.map((brand) => (
                <SingleBrand key={brand.id} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;

const SingleBrand = ({ brand }: { brand: BrandType }) => {
  const { href, name, icon: Icon } = brand;

  return (
    <div className="flex w-1/2 items-center justify-center px-3 py-[15px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl opacity-70 transition-all duration-300 hover:opacity-100 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:scale-105 dark:opacity-60 dark:hover:opacity-100 group"
      >
        <Icon size={40} strokeWidth={1.5} className="text-gray-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
        <span className="text-sm font-medium text-gray-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-center">
          {name}
        </span>
      </a>
    </div>
  );
};
