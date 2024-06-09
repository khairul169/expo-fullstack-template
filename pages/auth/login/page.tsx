import { Platform, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Input } from "~/components/ui/input";
import { useZodForm } from "~/hooks/useZodForm";
import { LoginSchema, loginSchema } from "~/shared/schema/auth.schema";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import trpc from "~/lib/trpc";
import { setLoggedIn } from "~/stores/authStore";

const defaultValues: LoginSchema = {
  username: "admin",
  password: "admin",
};

const LoginPage = () => {
  const form = useZodForm(loginSchema, defaultValues);
  const login = trpc.auth.login.useMutation({
    onSuccess(data) {
      setLoggedIn("id" in data ? data.id : null);
    },
  });

  const onSubmit = form.handleSubmit(values => {
    login.mutate({ ...values, platform: Platform.OS });
  });

  return (
    <>
      <Stack.Screen options={{ title: "Login" }} />

      <View className="p-4">
        <Input placeholder="Username" {...form.register("username")} />
        <Input
          className="mt-4"
          placeholder="Password"
          secureTextEntry
          {...form.register("password")}
        />

        <Button className="mt-4" onPress={onSubmit}>
          <Text>Login</Text>
        </Button>
      </View>
    </>
  );
};

export default LoginPage;
