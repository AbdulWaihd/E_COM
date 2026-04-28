import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../schema/LogInSchema";
import Button from "../../Shared/components/Button";
import { TextInput } from "../input-forms/TextInput";
import api from "../../api/api";


const LogIn = () => {
    const navigate = useNavigate();
    const [formData, setformData] = useState({
        email: "",
        password: "",
        mobileNumber: ""
    })


    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


 const handleSubmit = async () => {
    setSubmitted(true);
        try {
            const validationResult = loginSchema.safeParse(formData);
            if (!validationResult.success) {
                console.log("Validation errors:", validationResult.error);
                return;
            }
            const Res = await api.post("/api/core/account/login", {
                email: validationResult.data.email,
                password: validationResult.data.password,
                mobileNumber: validationResult.data.mobileNumber,
                rememberMe: true
            });
            if (Res.data && Res.data.success) {
                const userData = {
                    email: Res.data?.email,
                    mobileNumber: Res.data?.mobileNumber,
                };
                
                console.log("User Data", Res.data.user.email);
                localStorage.setItem("token", Res.data.token);
                localStorage.setItem("user", JSON.stringify(userData));
                
                navigate("/");
            } else {
            console.error("Login failed:", Res.data.message);
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] px-4">
            <div
                className="w-full max-w-md p-6 transition-shadow duration-300 rounded-lg shadow-md hover:shadow-2xl"
                style={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                }}
            >
                <h1
                    className="mb-6 font-serif text-3xl text-center"
                    style={{ color: "var(--text)" }}
                >
                    Sign Up
                </h1>

                <div className="flex flex-col gap-4">

                    <TextInput
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter E-mail"
                        error={
                            submitted && !formData.email
                                ? "Please enter your email"
                                : undefined
                        }
                    />
                    <TextInput
                        label="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        error={
                            submitted && !formData.mobileNumber
                                ? "Please enter your phone number"
                                : undefined
                        }
                    />

                    <TextInput
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        error={
                            submitted && !formData.password
                                ? "Please enter your password"
                                : undefined
                        }


                    />
                    
                    <Button
                    btnTxt="Forgot Password"
                    type="button"
                    onClick={()=> navigate("/forgotpassword")}
                    className="text-gray-500 -translate-y-1/2 f ext-sm right-2 top-1/2"
                    
                    />
                        

                    <Button
                        btnTxt="Log In"
                        type="button"
                        onClick={handleSubmit}
                        className="w-full py-2 font-semibold rounded-md"
                        style={{
                            backgroundColor: "var(--primary)",
                            color: "white",
                        }}
                    />

                </div>

            </div>
        </div>
    )
}
export default LogIn;