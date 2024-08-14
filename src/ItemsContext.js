import React, { createContext, useState } from "react";
import supabase from "./supabaseClient";

// intialize context
export const ItemsContext = createContext();

export function ItemsContextProvider({ children }) {
    const [activeItems, setActiveItems] = useState([]);
    const [inactiveItems, setInactiveItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);

    // Authentication function for logging in new/old user with supabase magic link
    const logInAccount = async (email) => {
        setLoading(true);
        try {
            // supabase method to send the magic link to the email provided
            const { error } = await supabase.auth.signInWithOtp({
                email
            });

            if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block

            alert("Check your email for your magic login link/otp!");

        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ItemsContext.Provider value={{ activeItems, inactiveItems, loading, adding, logInAccount }}>
            {children}
        </ItemsContext.Provider>
    );
}