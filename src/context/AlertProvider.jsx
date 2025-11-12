"use client";
import { createContext, useContext, useState, useCallback } from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export function AlertProvider({ children }) {
    const [alert, setAlert] = useState(null);

    const showAlert = useCallback((message, type = "info", duration = 3000) => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), duration);
    }, []);

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            {/* DaisyUI Toast */}
            {alert && (
                <div className="fixed top-5 right-5 z-[9999] animate-fade-in">
                    <div
                        className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border-l-4 transition-all duration-300
        ${alert.type === "success"
                                ? "bg-green-100 border-green-500 text-green-800"
                                : alert.type === "error"
                                    ? "bg-red-100 border-red-500 text-red-800"
                                    : alert.type === "warning"
                                        ? "bg-yellow-100 border-yellow-500 text-yellow-800"
                                        : "bg-blue-100 border-blue-500 text-blue-800"
                            }`}
                    >
                        <span className="font-medium">{alert.message}</span>
                    </div>
                </div>
            )}

        </AlertContext.Provider>
    );
}
