
import  {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";
import Toast from "../components/Toast.tsx";

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
};

type AppContextType = {
    showToast: (toastMessage: ToastMessage) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => {
                    setToast(toastMessage);
                },
            }}
        >
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(undefined)}
                />
            )}
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
};
