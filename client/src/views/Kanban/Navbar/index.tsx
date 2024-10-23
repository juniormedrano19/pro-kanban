import LogoutPopover from "../../../components/Popover/Logout";
import { getInitials } from "../../../helpers";
import { RootState, useAppSelector } from "../../../redux";
import { SquareDashedKanban } from "lucide-react";

export const Navbar = () => {
  const { user } = useAppSelector((state: RootState) => state.kanbanReducer);
  return (
    <div className="h-[70px] bg-black flex items-center justify-between px-4 md:px-12">
      <div>
        <div className="flex items-center justify-start space-x-2 h-[60px]">
          <span className="bg-black rounded-full w-8 h-8 flex items-center justify-center ">
            <SquareDashedKanban className="text-white" />
          </span>
          <p className="text-xl font-bold text-white">Pro Kanban</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="font-medium text-base bg-black border border-white text-white rounded-full w-[40px] h-[40px] flex items-center justify-center">
          <p>{getInitials(user)}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-white">{user}</p>
        </div>

        <LogoutPopover />
      </div>
    </div>
  );
};
