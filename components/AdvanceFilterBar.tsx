import { View } from "react-native";
import { AdvancedFilterBarProps } from "./utils";

export function AdvancedFilterBar({ Filter }: AdvancedFilterBarProps) {
  return (
    <>
      <View >{Filter}</View>
    </>
  );
}
