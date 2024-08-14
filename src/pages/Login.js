import React, { useContext, useState } from "react";
import { ItemsContext } from "../ItemsContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const { loading, logInAccount } = useContext(ItemsContext);


    const handleLogin = (e) => {
        e.preventDefault();
        logInAccount(email);
    };

    return (
        <div className="container">
            <div className="row justify-content center mt5">
                <div className="col-12 col-lg-6">
                    <div className="card">
                        <div className="card-holder">
                            <h5 className="text-center text-uppercase">Log INN</h5>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-4">
                                    <label htmlFor="exampleInputEmail1" className="form-label">
                                        Email Address
                                    </label>
                                    <input type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        name="email"
                                        required
                                        className="form-control form-control-lg w-100 mt-1"
                                    />
                                    <div className="form-text">
                                        Enter your email to get your magic link
                                    </div>
                                </div>
                                <button disabled={loading} type="submit" className="btn btn-primary btn-lg w-100">
                                    {loading ? "loading...." : "Submit"}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}