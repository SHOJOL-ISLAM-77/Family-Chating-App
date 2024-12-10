import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { AuthContextProvider, useAuth } from "../context/authContext";
import "../global.css";
import { MenuProvider } from "react-native-popup-menu";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated === "undefined") return;
    const inApp = segments[0] === "(app)";

    if (isAuthenticated && !inApp) {
      router.replace("/home");
    } else if (isAuthenticated === false) {
      router.replace("singIn");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

const RootLayout = () => {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <StatusBar style="dark" />
        <SafeAreaView style={{ flex: 1 }}>
          <MainLayout />
        </SafeAreaView>
      </AuthContextProvider>
    </MenuProvider>
  );
};

export default RootLayout;
