import React, { createContext, useState } from "react";
import supabase from "./supabaseClient";

// intialize context
export const ItemsContext = createContext();

export function ItemsContextProvider({ children }) {
    const [activeItems, setActiveItems] = useState([]);
    const [inactiveItems, setInactiveItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);

    // function to get the current URL
    const getURL = () => {
        let url = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
        // Make sure to include `https://` when not localhost.
        url = url.startsWith('http') ? url : `https://${url}`
        // Make sure to include a trailing `/`.
        url = url.endsWith('/') ? url : `${url}/`
        return url
    }

    // Authentication function for logging in new/old user with supabase magic link
    const logInAccount = async (email) => {
        setLoading(true);
        try {
            // supabase method to send the magic link to the email provided
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    redirectTo: getURL(),
                }
            });

            if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block

            alert("Check your email for your magic login link/otp!");

        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    // get all active items by the user
    const getActiveItems = async () => {
        setLoading(true);
        try {
            // get the user currently logged in
            const { data: { user }, } = await supabase.auth.getUser();
            console.log(user)

            const { data, error } = await supabase
                .from("todo") //the table you want to work with
                .select("item, done, id") //columns to select from the database
                .eq("user_id", user?.id) //comparison function to return only data with the user id matching the current logged in user
                .eq("done", false) //check if the done column is equal to false
                .order("id", { ascending: false }); // sort the data so the last item comes on top;

            if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block
            // console.log("this is type of data", typeof data)
            // console.log("this is data", data)
            if (data) setActiveItems(data);

        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    // get all completed items by the user
    const getInactiveItems = async () => {
        setLoading(true);
        try {
            // get the user currently logged in
            const { data: { user }, } = await supabase.auth.getUser();

            const { error, data } = await supabase
                .from("todo") //the table you want to work with
                .select("item, done, id") //columns to select from the database
                .eq("user_id", user?.id) //comparison function to return only data with the user id matching the current logged in user
                .eq("done", true) //check if the done column is equal to true
                .order("id", { ascending: false }); // sort the data so the last item comes on top

            if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block

            if (data) setInactiveItems(data);

        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    // add new row to the database
    const addItem = async (item) => {
        setAdding(true);
        try {
            // get the user currently logged in
            const { data: { user }, } = await supabase.auth.getUser();
            console.log(user)

            const newItem = { item, user_id: user.id };
            const { error } = await supabase
                .from("todo")
                .insert(newItem);

            if (error) throw error;

            await getActiveItems(); //get the new active items list

        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setAdding(false);
        }
    };

    const updateItem = async ({ item, id }) => {
        console.log("inside ItemsContext updating item, item, id", typeof item, id);
        setLoading(true);
        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            console.log(user?.id); // Check if this logs the correct user ID
            if (authError) throw authError;

            const { error } = await supabase
                .from("todo")
                .update({
                    item
                })
                .eq("user_id", user?.id)
                .eq("id", id)

            if (error) throw error;

            await getActiveItems();
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        };
    }

    // delete row from the database
    const deleteItem = async (id) => {
        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            console.log(user?.id); // Check if this logs the correct user ID
            if (authError) throw authError;

            const { error } = await supabase
                .from("todo")
                .delete() //delete the row
                .eq("user_id", user?.id) //check if the item being deleted belongs to the user
                .eq("id", id) //the id of row to delete


            if (error) throw error;

            await getInactiveItems(); //get the new completed items list
            await getActiveItems(); //get the new active items list
        } catch (error) {
            alert(error.error_description || error.message);
        }
    };


    // change value of done to true
    const markAsDone = async (id) => {
        setLoading(true);
        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            console.log(user?.id); // Check if this logs the correct user ID
            const { error } = await supabase
                .from("todo")
                .update({ done: true })
                .eq("user_id", user?.id)
                .eq("id", id); //match id to toggle

            if (error) throw error;

            await getActiveItems();
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <ItemsContext.Provider value={{ activeItems, inactiveItems, loading, adding, logInAccount, addItem, updateItem, deleteItem, getActiveItems, getInactiveItems, markAsDone }}>
            {children}
        </ItemsContext.Provider>
    );
}