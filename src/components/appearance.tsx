"use client";

import React from "react";
import { RefreshCw } from "lucide-react";
import { useTheme } from "next-themes";
import { FaCheck } from "react-icons/fa6";

import Hint from "./hint";

import { cn } from "@/lib/utils";

const Appearance = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="flex gap-12">
        <Hint label="Light" side="top">
          <button
            className={cn(
              "rounded-full size-16 bg-white border-neutral-500 border-2 flex items-center justify-center relative",
              theme === "light" && "border-sky-600"
            )}
            onClick={() => setTheme("light")}
          >
            {theme === "light" && (
              <FaCheck className="text-sky-600 size-6  absolute right-0 top-0" />
            )}
          </button>
        </Hint>
        <Hint label="Dark" side="top">
          <button
            className={cn(
              "rounded-full size-16 bg-black border-2  border-neutral-500 flex items-center justify-center relative",
              theme === "dark" && "border-sky-600"
            )}
            onClick={() => setTheme("dark")}
          >
            {theme === "dark" && (
              <FaCheck className="text-sky-600 size-6 absolute right-0 top-0" />
            )}
          </button>
        </Hint>
        <Hint label="System" side="top">
          <button
            className={cn(
              "rounded-full size-16 bg-black text-white border-2 border-neutral-500 flex items-center justify-center relative",
              theme === "system" && "border-sky-600"
            )}
            onClick={() => setTheme("system")}
          >
            {theme === "system" && (
              <FaCheck className="text-sky-600 size-6 absolute top-0 right-0" />
            )}
            <RefreshCw className="text-white" size={20} />
          </button>
        </Hint>
      </div>
    </>
  );
};

export default Appearance;
