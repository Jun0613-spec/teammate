"use client";

import React, { useState } from "react";

import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";

import { AuthFlow } from "@/types/auth";

const AuthScreen = () => {
  const [state, setState] = useState<AuthFlow>("signIn");

  return (
    <div className="h-full flex items-center justify-center bg-[#6264A7] dark:bg-[#3f3f6d]">
      <div className="md:h-auto md:w-[420px]">
        {state === "signIn" ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
