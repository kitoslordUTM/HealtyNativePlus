import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

export default function RootLayout() {
  return (
   <Provider store={store}>
    <GluestackUIProvider>
      <Stack />
    </GluestackUIProvider>
    </Provider>
  );
}
