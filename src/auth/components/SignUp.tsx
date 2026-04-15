import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupSchema } from "../schema/SignUpSchema";
import Button from "../../Shared/components/Button";
import { TextInput } from "../input-forms/TextInput";
import api from "../../api/api";
import { TextSelectInput } from "../input-forms/TextSelectInput";
const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        profileId: "0",
        fullname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: ""

    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = async ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async () => {
        setSubmitted(true);
        const result = signupSchema.safeParse(formData);
        console.log("Validation result:", result);

        try {
            await api.post(`/api/core/userprofile`, {
                profileId: formData.profileId,
                fullname: formData.fullname,
                email: formData.email,
                phone: formData.phone,
                age: formData.age,
                gender: formData.gender,
                password: formData.password,
                confirmpassword: formData.confirmPassword,
            });

            console.log("User created");

            const loginRes = await api.post("/api/core/account/login", {
                email: formData.email,
                password: formData.password,
                mobileNumber: formData.phone,
                rememberMe: true
            });

            localStorage.setItem("token", loginRes.data.token);
            const userData = {
                email: loginRes.data.user?.email,
                mobileNumber: loginRes.data.user?.mobileNumber,
            };
            localStorage.setItem("user", JSON.stringify(userData));

            navigate("/");
        }
        catch (error) {
            console.log(error);
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
                        label="Full Name"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        error={
                            // for first render 
                            // submitted && !formData.fullname---->   false && true → false
                            submitted && !formData.fullname
                                ? "Please enter your full name"
                                : undefined
                        }
                    />

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
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        error={
                            submitted && !formData.phone
                                ? "Please enter your phone number"
                                : undefined
                        }
                    />

                    <TextInput
                        label="Age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter your age"
                        error={
                            submitted && !formData.age
                                ? "Please enter your age"
                                : undefined
                        }
                    />

                    <TextSelectInput
                        label="Gender"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        error={
                            submitted && !formData.gender
                                ? "Please select gender"
                                : undefined
                        }
                        options={[
                            { value: "", label: "Select Gender" },
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },
                            { value: "other", label: "Other" },
                        ]}
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

                    <TextInput
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        error={submitted && !formData.confirmPassword
                            ? "Please confirm your password"
                            : undefined
                        }
                    />


                    <Button
                        btnTxt="Sign Up"
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
    );

};

export default SignUp;