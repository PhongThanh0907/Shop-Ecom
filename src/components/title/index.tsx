import React from "react";

interface TitleComponentProps {
  title: string;
}
const TitleMemo: React.FC<TitleComponentProps> = ({ title }) => {
  return (
    <div className="border-b border-gray-300 pb-3">
      <p className="text-xl font-semibold border-b-2 border-blue inline pb-3">
        {title}
      </p>
    </div>
  );
};

const TitleComponent = React.memo(TitleMemo);

export default TitleComponent;
