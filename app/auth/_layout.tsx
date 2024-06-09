import { Redirect, Slot } from "expo-router";
import React from "react";
import { useAuth } from "~/stores/authStore";

export default function AuthLayout() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Redirect href="/" />;
  }

  return <Slot />;
}
