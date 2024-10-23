import { useEffect, useState } from "react";
import { RootState, useAppSelector } from "../../../redux";
import { getInitials, getUserColors } from "../../../helpers";
import { socket } from "../../../utils/constants/socket";
import { BASE_URL, ENDPOINTS } from "../../../utils/constants/endpoints";
import { IUserConnected } from "../../../application/interfaces";
import TasksContainer from "./Task/TasksContainer";

export const Main = () => {
  const { user } = useAppSelector((state: RootState) => state.kanbanReducer);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [hoveredUserIndex, setHoveredUserIndex] = useState<number | null>(null);
  const { bgColor } = getUserColors(user);

  const handleMouseEnter = (index: number) => {
    setHoveredUserIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserIndex(null);
  };

  useEffect(() => {
    function fetchUsers() {
      fetch(`${BASE_URL}${ENDPOINTS.USERS}`)
        .then((res) => res.json())
        .then((data) => setOnlineUsers(data));
    }
    fetchUsers();
  }, [socket]);
  useEffect(() => {
    socket.on("USER_ADDED", (data) => {
      setOnlineUsers(data);
    });
  }, []);
  return (
    <div className="flex-1 bg-white md:bg-[#F7F7F7]">
      <div className="flex flex-col h-full">
        <div className="border border-b-gray-300 border-t-0 border-x-0">
          <div className="w-full flex justify-between items-center p-4 pr-10 bg-white">
            <h1 className="text-xl font-bold">Task Board </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {onlineUsers.length > 0 &&
                  onlineUsers.map((user: IUserConnected, index: number) => (
                    <div
                      key={index}
                      className={`relative rounded-full w-[32px] h-[32px] flex items-center justify-center bgColor opacity-[0.9] cursor-pointer ${bgColor}`}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className=" w-[10px] h-[10px] rounded-full absolute top-[20px] right-[-3px] bg-[#2ecc71]"></div>
                      <p className="text-xs font-bold text-white">
                        {getInitials(user.username)}
                      </p>
                      {hoveredUserIndex === index && (
                        <div className="absolute bottom-[50%] left-[30%] transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-1 px-2 z-10 shadow-lg">
                          {user.username}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 h-full p-10 flex flex-col gap-4 overflow-x-scroll">
          <TasksContainer />
        </div>
      </div>
    </div>
  );
};
