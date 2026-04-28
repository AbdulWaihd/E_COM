import { TextInput } from "../../Shared/input-forms/TextInput";
import Button from "../../Shared/components/Button";
import api from "../../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Forgotpassword = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        mobileNumber: ""
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {

        const res = await api.post(
            "/ForgotPassword",
            {
                email: formData.email,
                mobileNumber: formData.mobileNumber
            }
        );

        if (res.data && res.data.success) {

            const userData = {
                email: res.data?.email,
                mobileNumber: res.data?.mobileNumber,
            };

            console.log(
                "User Data",
                res.data.user.email
            );

            navigate("/otpVerification");
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
                    className="mb-6 font-serif text-xl text-center"
                    style={{ color: "var(--text)" }}
                >
                    Fill details
                </h1>

                <div className="flex flex-col gap-4">

                    <TextInput
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter E-mail"
                    />

                    <TextInput
                        label="Mobile Number"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                    />

                    <Button
                        btnTxt="Forgot Password"
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

export default Forgotpassword;