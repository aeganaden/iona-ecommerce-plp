"use client";

import React from "react";
import HeaderNavigationContext from "./header-navigation-context";

function HeaderNavigationProvider({ children }: { children: React.ReactNode }) {
  return <HeaderNavigationContext>{children}</HeaderNavigationContext>;
}

export default HeaderNavigationProvider;
