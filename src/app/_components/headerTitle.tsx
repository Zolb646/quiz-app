import { BsStars } from "react-icons/bs";

export const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-2">
      <BsStars className="size-6" />
      <h1 className="text-2xl font-bold">
        {title ? title : "Article Quiz Generator"}
      </h1>
    </div>
  );
};
