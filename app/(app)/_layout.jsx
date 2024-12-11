import { Stack } from "expo-router";
import React from "react";
import HomeHeader from "../../components/HomeHeader";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          header: () => <HomeHeader />,
        }}
      />
    </Stack>
  );
};

export default _layout;
