import React from "react";
import { Stack } from "expo-router";
export { ErrorBoundary } from "expo-router";
import Providers from "./_providers";
import "~/global.css";

export default function RootLayout() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}
