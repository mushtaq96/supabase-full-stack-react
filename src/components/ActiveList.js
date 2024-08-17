import React, { useContext, useEffect } from "react";
import { ItemsContext } from "../ItemsContext";
import supabase from "../supabaseClient";
import TodoItem from "./TodoItem";
import UpdateItem from "./UpdateItem";

export default function ActiveList() {
    const { getActiveItems, activeItems, loading } = useContext(ItemsContext);
    const [openModal, setOpenModal] = React.useState(false);
    const [updateData, setUpdateData] = React.useState({
        item: "",
        id: null,
    });

    useEffect(() => {
        console.log("Attempting to fetch user data...");
        const fetchUser = async () => {
            try {
                const { data: { user }, } = await supabase.auth.getUser();
                console.log("User data fetched successfully:", user);
                if (user !== null) {
                    getActiveItems();
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUser();
    }, []);

    console.log("this is typeof of activeItems", typeof activeItems);
    console.log("this is activeItems", activeItems);

    return (
        <div>
            {loading ? (
                "Loading..."
            ) : activeItems.length < 1 ? (
                <p className="text-center m-5"> Nothing to display ☹️ </p>
            ) : (
                activeItems.map((todo) => (
                    <TodoItem
                        handleEdit={(prevValue) => {
                            setOpenModal(true);
                            setUpdateData({
                                item: prevValue.item,
                                id: prevValue.id,
                            });
                        }}
                        data={todo}
                        key={todo.id}// use as unique identifier
                    />
                ))
            )}

        </div>
    );
}
