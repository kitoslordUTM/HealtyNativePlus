import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}
