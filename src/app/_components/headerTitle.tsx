import { BsStars } from "react-icons/bs";

export const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Icon scales on small, medium, large screens */}
      <BsStars className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />

      {/* Title text scales on small, medium, large screens */}
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
        {title ? title : "Article Quiz Generator"}
      </h1>
    </div>
  );
};
