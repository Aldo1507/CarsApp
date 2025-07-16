import { useEffect } from "react";
import classNames from "classnames";
import ReactDom from "react-dom";
import { X } from "lucide-react";

export default function Modal({ children, className, actionButon, onClose }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const classes = classNames(
    "w-[350px] sm:w-[500px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] fixed inset-64 bg-white p-10 h-fit rounded-md",
    className
  );

  return ReactDom.createPortal(
    <div className="relative">
      <div className="fixed inset-0 bg-slate-400 opacity-80"></div>
      <div className={classes}>
        <div
          className="absolute top-4 right-4 text-2xl text-gray-200 hover:text-gray-600 cursor-pointer p-1 bg-gray-300 rounded-full"
          onClick={() => onClose()}
        >
          <X size={18} />
        </div>

        <div className="flex flex-col justify-between h-full mt-4 gap-2">
          {children}
          <div className="flex justify-end border-t border-gray-300 pt-3 mt-5">
            {actionButon}
          </div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-content")
  );
}
