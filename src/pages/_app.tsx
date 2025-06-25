import "@/styles/globals.css";
import '../../i18n';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from "next/app";
import { NotificationProvider } from "@/hooks/notification";

function App({ Component, pageProps }: AppProps) {
  return <NotificationProvider>
    <Component {...pageProps} />
  </NotificationProvider>
}

export default appWithTranslation(App);