import { View } from "react-native";
import React, { useState } from "react";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Stack } from "expo-router";
import { ThemeToggle } from "~/components/containers/theme-toggle";
import trpc, { TRPCOutput } from "~/lib/trpc";
import { useLogout } from "~/stores/authStore";

const HomePage = () => {
  const [text, setText] = useState("Expo");
  const { data } = trpc.hello.useQuery(text);
  const logout = useLogout();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Expo App",
          headerRight: () => <ThemeToggle />,
        }}
      />

      <View className="p-4">
        <Text className="text-2xl text-blue-500">{data || "Hello world!"}</Text>

        <Button className="mt-4" onPress={() => setText("Button")}>
          <Text>Test</Text>
        </Button>

        <Button
          className="mt-4"
          onPress={() => logout.mutate()}
          disabled={logout.isLoading}
          variant="ghost">
          <Text>Logout</Text>
        </Button>
      </View>
    </>
  );
};

export default HomePage;
