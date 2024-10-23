import { useState, MouseEvent, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux";
import { resetUser } from "../../../redux/slices/kanbanSlice";
import Loading from "../../Loading";
import { socket } from "../../../utils/constants/socket";

const LogoutPopover = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleLogout = () => {
    setIsLoading(true);

    setTimeout(() => {
      socket.disconnect();
      dispatch(resetUser());
      localStorage.removeItem("user");
      handleClose();
      navigate("/login");
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const mouseEvent = event as unknown as MouseEvent;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(mouseEvent.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left">
      <button className="flex items-center" onClick={handleClick}>
        <ChevronDown className="text-white" />
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute right-0 z-10 w-48 mt-4 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div className="p-4">
            <p className="text-sm text-gray-700">
              Are you sure you want to log out?
            </p>
            <div className="mt-4">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                {isLoading ? (
                  <Loading
                    size={24}
                    firstColor={"#fff"}
                    secondColor={"#d8d8d8"}
                  />
                ) : (
                  "Sign Out"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutPopover;
