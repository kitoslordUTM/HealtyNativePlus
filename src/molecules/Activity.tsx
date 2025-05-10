import {
  View,
  ActivityIndicator,
} from "react-native";

export default function Activity() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator
        color="#0A2240"
        size={"large"}
        style={{ alignContent: "center", justifyContent: "center" }}
      />
    </View>
  );
}
