import { useState } from "react";

export const useSidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggle = () => {
    setIsMinimized((prev) => !prev);
  };

  return { isMinimized, toggle };
};
