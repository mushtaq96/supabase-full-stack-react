import { useState } from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate()

    async function signUpNewUser() {
        console.log("inside handleRegister")
        try {
            const { user, error } = await supabase.auth.signUp({
                email,
                password,
                data: {
                    confirmation_sent_at: Date.now(),
                },
            });
            console.log(user)

            if (error) {
                console.error('Error Regsitering', error.message);
            } else if (user) {
                console.log('Registered successfully', user)
                navigate("/")
            }
        } catch (e) {
            console.error('Unexpected error', e)
        }
    }
    const togglePasswordVisiblity = () => {
        setPasswordVisible(!passwordVisible)
    }

    return (
        <div className="container">
            <div className="row justify-content center mt5">
                <div className="col-12 col-lg-6">
                    <div className="card">
                        <div className="card-holder">
                            <h5 className="text-center text-uppercase">Welcome! Register below</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={signUpNewUser}>
                                <div className="mb-4">
                                    <div className="col flex-auto">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg w-100 mt-1"
                                            name="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter email address"
                                        />
                                    </div>
                                    <div className="col flex-auto">
                                        <div className="input-group">
                                            <input type={passwordVisible ? "text" : "password"}
                                                className="form-control form-control-lg w-100 mt-1"
                                                name="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter your password"
                                            />
                                            <div className="input-group-append">
                                                <button type="button" className="btn btn-outline-secondary btn-sm mt-1 " onClick={togglePasswordVisiblity}>
                                                    {passwordVisible ? "Hide" : "Show"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-text">
                                        Enter your details to register
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg w-100">Sign Up</button>
                            </form>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}