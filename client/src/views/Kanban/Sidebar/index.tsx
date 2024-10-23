import {Kanban } from "lucide-react";
import { ITEMS_DASHBOARD } from "../../../utils/constants/items-dashboard";


const icons = {
  Kanban: <Kanban className="w-[20px] h-[20px]"/>,
};

export const Sidebar = () => {
  return (
    <div className="hidden lg:flex  w-[250px] h-screen border border-r-gray-300 border-y-0 border-l-0  flex-col">
    
      <div className="border-b-0 border-x-0 flex-1">
        <div className="p-6 h-full">
        {ITEMS_DASHBOARD.map((item, index: number) => (
          <div key={index} className="flex gap-2 items-center">
            {icons[item.icon]}
            <p>{item.title}</p>
          </div>
        ))}
        </div>
       
      </div>
    </div>
  );
};
