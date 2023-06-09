import React from "react";

interface ButtonMenuBarProps {
  open: boolean;
  onClick?: () => void;
}

const ButtonMenuBarMemo: React.FC<ButtonMenuBarProps> = ({ open, onClick }) => {
  return (
    <button className="bg-black/70 px-1 py-3 rounded-md" onClick={onClick}>
      <div className="h-[22px] w-11 relative flex justify-center z-30 cursor-pointer">
        <div
          className={`h-1 w-8 bg-stone-100  absolute rounded-sm  ${
            open
              ? "top-0 bottom-0 rotate-45 my-auto duration-500"
              : "top-0 duration-300"
          } `}
        />
        <div
          className={`h-1 w-8 bg-stone-100 absolute top-0 bottom-0 m-auto line-center duration-300 rounded-sm ${
            open ? " opacity-0" : "opacity-100 "
          }`}
        />
        <div
          className={`h-1 w-8 bg-stone-100 absolute  line-bottom rounded-sm ${
            open
              ? "top-0 bottom-0 -rotate-45 my-auto duration-500"
              : "bottom-0 duration-300"
          }`}
        />
      </div>
    </button>
  );
};

const MenuButtonMobile = React.memo(ButtonMenuBarMemo);

export default MenuButtonMobile;
