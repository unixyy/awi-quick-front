import { useState, useEffect } from "react";

interface PopupProps {
  title: string;
  success: boolean;
  body?: string;
}

export default function Popup(props: PopupProps) {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!showPopup) {
    return null;
  }

  let bgColorClass;
  if (props.success) bgColorClass = "bg-green-100";
  else bgColorClass = "bg-red-100";

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className={`p-6 rounded-md shadow-lg ${bgColorClass}`}>
        <h2 className="text-lg font-medium mb-4">{props.title}</h2>
        <p className="text-gray-700">{props.body}</p>
      </div>
    </div>
  );
}
