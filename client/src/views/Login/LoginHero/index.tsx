import { SquareDashedKanban } from "lucide-react";
import { format } from "date-fns";

export const LoginBgHero = () => {
  const currentYear = format(new Date(), "yyyy");
  return (
    <div className="hidden lg:flex flex-col justify-between bg-[#ffe85c] lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg">
      <div className="flex items-center justify-start space-x-3">
        <span className="bg-black rounded-full w-8 h-8 flex items-center justify-center">
          <SquareDashedKanban className="text-white" />
        </span>
        <a href="#" className="font-medium text-xl">
          Pro Kanban
        </a>
      </div>
      <div className="space-y-5">
        <h1 className="lg:text-3xl xl:text-5xl xl:leading-snug font-extrabold">
        Enter username to discover new Kanban board!
        </h1>

        <p className="text-lg">Are you ready?</p>
      </div>
      <p className="font-medium">© {currentYear} Urpi Kanban</p>{" "}
    </div>
  );
};
