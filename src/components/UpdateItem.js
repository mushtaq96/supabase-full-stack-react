import React, { useContext, useState } from 'react';
import { ItemsContext } from '../ItemsContext';

export default function UpdateItem({ existingItem, id, open, setOpen }) {
    const [newItem, setNewItem] = useState('');
    const [loading, setLoading] = useState(false);
    const { updateItem } = useContext(ItemsContext);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateItem({ item: newItem, id });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setNewItem("");
            setOpen(false);
        };
    }
    return (
        <>
            {open && (
                <div className="update-modal">
                    <div className="col-12 col-md-6 col-xl-4">
                        <div className="card">
                            <div className="card-header d-flex justify-content-end">
                                <button className="icon-btn text-danger" onClick={() => { setNewItem(""); setOpen(false); }}>
                                    X
                                </button>
                                <div className="card-body">
                                    <form onSubmit={handleUpdate}>
                                        <div className="col w-100">
                                            <input type="text"
                                                className="form-control form-control-lg"
                                                name="item"
                                                required
                                                value={newItem || existingItem}
                                                onChange={(e) => setNewItem(e.target.value)}
                                                placeholder="Enter new item"
                                            />
                                        </div>
                                        <div>
                                            <button className="btn btn-primary w-100 mt-3" disabled={loading}>
                                                {loading ? "Updating..." : "Update Item"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}