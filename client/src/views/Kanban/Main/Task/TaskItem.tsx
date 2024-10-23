import { Calendar1Icon, EditIcon, Trash2Icon } from "lucide-react";
import { getInitials, getUserColors } from "../../../../helpers";
import { useState } from "react";
import { toast } from "sonner";
import { socket } from "../../../../utils/constants/socket";
import { IDraggingUser } from "../../../../application/interfaces";

interface ITaskItem {
  title: string;
  description: string;
  date: string;
  user: string;
  id: string;
  draggingUsers?: IDraggingUser[];
}

export const TaskItem = ({ title, description, date, user, id,  draggingUsers = [] }: ITaskItem) => {

  const isDragging = draggingUsers.find(item => item.taskId === id);
  const { bgColor } = getUserColors(user);
  const [showTooltip, setShowTooltip] = useState(false);
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  const handleDelete = () => {
    socket.emit("deleteTask", { id });
    toast.success("Task has been deleted");
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    socket.emit("editTask", {
      id,
      title: editedTitle,
      description: editedDescription,
      date,
      user,
    });
    toast.success("Task has been updated");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(title);
    setEditedDescription(description);
  };

  return (
<div className={`bg-white cursor-pointer border rounded-[14px] shadow-custom-shadow w-[254px] h-auto
      ${isDragging 
        ? 'border-red-500 border-2' 
        : 'border-[#E3E3E3]'
      }`}
    >
        {isDragging && (
        <div className="bg-red-500 text-white text-xs py-1 px-2 rounded-t-[10px] text-center">
          {isDragging.username} is moving this task
        </div>
      )}
      <div>
        {isEditing ? (
          <div className="p-5 flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="editTitle" className="text-xs text-gray-500">
                Title
              </label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full border border-gray-300  px-2 py-2 mb-2 focus:outline-none font-bold text-sm rounded-md"
                placeholder="Edit title"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="editTitle" className="text-xs text-gray-500">
                Description
              </label>
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full border border-gray-300  px-2 py-2 mb-2 resize-none focus:outline-none text-sm rounded-md"
                placeholder="Edit description"
              />
            </div>

            <div className="flex justify-between items-center gap-2">
              <button
                onClick={handleSave}
                className="bg-black text-white border-2 border-black px-4 py-2 rounded-xl text-sm font-bold w-[50%]"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-white text-black border-2 border-black px-4 py-2 rounded-xl text-sm font-bold w-[50%]"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="p-5 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h3 className="font-bold">{title}</h3>
                <p className="text-xs text-[#828282] leading-[18px]">
                  {description}
                </p>
              </div>
            </div>
            <div className="border border-t-[#E3E3E3] border-b-0 border-x-0 p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`${bgColor} relative rounded-full w-[30px] h-[30px] flex items-center justify-center opacity-[0.9] cursor-pointer`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <p className="text-xs font-bold text-white">
                    {getInitials(user)}
                  </p>
                  {showTooltip && (
                    <div className="absolute bottom-[110%] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-1 px-2 z-10 shadow-lg ">
                      {user}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar1Icon className="w-[13px] h-[13px] text-[#828282]" />
                  <p className="text-xs text-[#828282]">{date}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <EditIcon
                  className="w-[16px] h-[16px] cursor-pointer text-blue-500"
                  onClick={handleEdit}
                />
                <Trash2Icon
                  className="w-[16px] h-[16px] text-red-600 cursor-pointer"
                  onClick={handleDelete}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
