import { XIcon } from "lucide-react";
import { useEffect, useRef } from "react";

interface ModalAlertProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export const Modal = ({ children, open = false, onClose }: ModalAlertProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.showModal();
    } else if (!open && modalRef.current) {
      modalRef.current.close();
    }
  }, [open]);

  return (
    <div>
      <dialog ref={modalRef} className=" w-[480px] h-[240px] rounded-xl p-6">
        <div className=" relative">
          <button
            className=" flex items-center justify-center  rounded-full  w-[28px] h-[28px] absolute right-[-3px] top-[-5px] hover:bg-[#eee]"
            onClick={onClose}
          >
            <XIcon className="w-[18px] h-[18px]" />
          </button>
          <div className="py-10 pl-6 pr-10">{children}</div>
        </div>
      </dialog>
    </div>
  );
};
