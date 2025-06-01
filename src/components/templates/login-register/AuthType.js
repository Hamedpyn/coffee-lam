"use client"
import { useState } from "react";

import Login from "@/components/templates/login-register/Login";
import Register from "@/components/templates/login-register/Register";

export default function AuthType() {
    const [authType, setAuthType] = useState("LOGIN");

    const showRegisterForm = () => setAuthType("REGISTER");
    const showLoginForm = () => setAuthType("LOGIN");
    return (
        <>
            {authType === "LOGIN" ? (
                <Login showRegisterForm={showRegisterForm} />
            ) : (
                <Register showLoginForm={showLoginForm} />
            )}
        </>
    )
}
