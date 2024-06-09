import { Redirect, Stack } from "expo-router";
import React from "react";
import { useAuth } from "~/stores/authStore";

export default function MainLayout() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Redirect href="/auth/login" />;
  }

  return <Stack />;
}
