import React, { useContext, useEffect } from "react";
import { ItemsContext } from "../ItemsContext";
import supabase from "../supabaseClient";
import TodoItem from "./TodoItem";

export default function DoneList() {
    const { getInactiveItems, inactiveItems, loading } = useContext(ItemsContext);
    console.log({ inactiveItems });

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, } = await supabase.auth.getUser();
            // get the user currently logged in
            if (user !== null)
                getInactiveItems();
        };
        fetchUser();
    }, []);

    return (
        <div>
            {loading ? (
                "Loading..."
            ) : inactiveItems.length < 1 ? (
                <p className="text-center m-5"> Nothing to display ☹️ </p>
            ) : (
                inactiveItems.map((item, index) => (
                    <TodoItem data={item} key={index.toString()} />
                ))
            )}
        </div>
    );
}
