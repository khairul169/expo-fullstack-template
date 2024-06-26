import { View } from "react-native";
import React, { useState } from "react";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Stack } from "expo-router";
import { ThemeToggle } from "~/components/containers/theme-toggle";
import trpc from "~/lib/trpc";
import { useLogout } from "~/stores/authStore";

const HomePage = () => {
  const [text, setText] = useState("Expo");
  const { data: user } = trpc.auth.user.useQuery();
  const { data: hello } = trpc.hello.useQuery(text);
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
        <Text className="text-2xl text-blue-500">
          {hello || "Hello world!"}
        </Text>

        <Text>{user?.username}</Text>

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
