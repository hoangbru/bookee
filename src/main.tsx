import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistor, { store } from "./store";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./context/AppContext.tsx";
import { IntlProvider } from "react-intl";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <IntlProvider locale="vi">
    <Provider store={store}>
      <AppProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster />
          <IntlProvider locale="vi">
            <App />
          </IntlProvider>
        </PersistGate>
      </AppProvider>
    </Provider>
  </IntlProvider>
);
