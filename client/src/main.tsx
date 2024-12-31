import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import App from "./App.tsx";

const theme = createTheme({});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider defaultColorScheme='auto' theme={theme}>
      <Notifications />
      <App />
    </MantineProvider>
  </QueryClientProvider>
);
