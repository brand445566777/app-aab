import React from "react";
import { ScrollView, Text, View, Pressable, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAppVersion, useVersionDisplay } from "@/hooks/use-app-version";
// Import Native Advanced Ad Component
import { NativeAdvancedAd } from "@/components/NativeAdvancedAd";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useThemeContext } from "@/lib/theme-provider";

export default function SettingsScreen() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const { setColorScheme } = useThemeContext();
  const appVersion = useAppVersion();
  const versionDisplay = useVersionDisplay();

  const toggleTheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const handleAbout = () => {
    Alert.alert(
      "About",
      `Pakistan Emergency Helpline\n\nVersion ${appVersion}\n\nA comprehensive directory of emergency, security, hospital, and government helpline numbers across Pakistan.`,
      [{ text: "OK" }],
    );
  };

  const handleDisclaimer = () => {
    Alert.alert(
      "Disclaimer",
      "This app provides publicly available helpline numbers for informational purposes only.\n\nWe do not guarantee that all numbers will always be active or reachable. Numbers may change or become unavailable without notice.\n\nThe app developer is not responsible for inactive numbers, call failures, or service interruptions.\n\nThis app is not officially affiliated with any government authority.",
      [{ text: "OK" }],
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      "Privacy Policy",
      "Pakistan Emergency Helpline is committed to protecting user privacy. Our service is provided free of charge, supported by third-party advertising.\n\nThe app only allows users to dial publicly available helpline numbers using the device's default phone dialer. No account registration is required.\n\nData Collection & Usage: While the app does not collect or store personal contact details, names, or call logs on our servers, it utilizes industry-standard SDKs including Google AdMob, IronSource, and Unity Ads. These partners may automatically collect and process certain non-personal information, such as your Device Advertising ID, IP address, and device hardware specifications, to deliver and optimize relevant advertisements.\n\nUser Control: Users can manage or reset their advertising preferences through their Android device settings. By using this application, you acknowledge and consent to the data processing practices of our designated advertising partners as outlined in our full privacy documentation.",
      [{ text: "OK" }],
    );
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    onPress,
    rightElement,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View
        className="flex-row items-center gap-4 p-4 rounded-xl mb-2"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
        }}
      >
        <View
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: colors.primary + "20" }}
        >
          <MaterialIcons name={icon as any} size={20} color={colors.primary} />
        </View>

        <View className="flex-1">
          <Text
            className="font-semibold text-base"
            style={{ color: colors.foreground }}
          >
            {title}
          </Text>
          {subtitle && (
            <Text className="text-xs mt-1" style={{ color: colors.muted }}>
              {subtitle}
            </Text>
          )}
        </View>

        {rightElement}
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header */}
        <View className="mb-6">
          <Text
            className="text-3xl font-bold mb-1"
            style={{ color: colors.foreground }}
          >
            Settings
          </Text>
          <Text className="text-sm" style={{ color: colors.muted }}>
            ترتیبات
          </Text>
        </View>

        {/* Theme Section */}
        <View className="mb-4">
          <Text
            className="text-lg font-bold mb-3"
            style={{ color: colors.foreground }}
          >
            Appearance
          </Text>
          <SettingItem
            icon="brightness-4"
            title="Dark Mode"
            subtitle={colorScheme === "dark" ? "Enabled" : "Disabled"}
            onPress={toggleTheme}
            rightElement={
              <MaterialIcons
                name={colorScheme === "dark" ? "toggle-on" : "toggle-off"}
                size={24}
                color={colors.primary}
              />
            }
          />
        </View>

        {/* 1st Native Ad: Appearance aur Information ke darmiyan */}
        <View className="my-2">
          <NativeAdvancedAd />
        </View>

        {/* Information Section */}
        <View className="mb-4 mt-2">
          <Text
            className="text-lg font-bold mb-3"
            style={{ color: colors.foreground }}
          >
            Information
          </Text>
          <SettingItem
            icon="info"
            title="About"
            subtitle="App version and details"
            onPress={handleAbout}
            rightElement={
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={colors.muted}
              />
            }
          />
          <SettingItem
            icon="warning"
            title="Disclaimer"
            subtitle="Important information"
            onPress={handleDisclaimer}
            rightElement={
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={colors.muted}
              />
            }
          />
          <SettingItem
            icon="privacy-tip"
            title="Privacy Policy"
            subtitle="How we handle your data"
            onPress={handlePrivacy}
            rightElement={
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={colors.muted}
              />
            }
          />
        </View>

        {/* 2nd Native Ad: Information section ke baad aur footer se pehle */}
        <View className="my-2">
          <NativeAdvancedAd />
        </View>

        {/* Footer */}
        <View
          className="mt-6 pt-6 border-t"
          style={{ borderTopColor: colors.border }}
        >
          <Text className="text-xs text-center" style={{ color: colors.muted }}>
            Pakistan Emergency Helpline {versionDisplay}
          </Text>
          <Text
            className="text-xs text-center mt-2"
            style={{ color: colors.muted }}
          >
            All numbers are publicly available for emergency purposes only.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
