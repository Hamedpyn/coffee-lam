"use client"
import SideBar from "@/components/modules/SideBar/SideBar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

export default function HomeNavBar({ isLogin, role }) {
    const [isSideBar, setIsSideBar] = useState(false)
    const [cart, setCart] = useState([])
    let router = useRouter()
    const toggleMenu = (e) => {
        e.stopPropagation()
        setIsSideBar(prev => !prev)
    };
    useEffect(() => {
        isLogin && fetch("/api/auth/refresh")
            .then(res => {
                if (res.status === 401) {
                    return null;
                } else {
                    router.refresh();
                }
            })
    }, []);

    useEffect(() => {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(localCart);
    }, []);

    return (
        <>
            <nav className="homeNav">
                <ul className="flex items-center flex-row-reverse justify-between !px-4 !py-2">
                    <li onClick={toggleMenu} className="text-black cursor-pointer text-3xl">
                        <IoMdMenu />
                    </li>
                    <Link href="/">
                        <Image width={150} priority height={150} src="/images/logo.png" alt="Logo" />
                    </Link>
                    <li className="navbar_icons text-black text-3xl">
                        <Link href="/cart">
                            <FaShoppingCart />
                            <span>{cart?.length}</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <SideBar role={role} isLogin={isLogin} toggleMenu={toggleMenu} isTrue={isSideBar} setIsTrue={setIsSideBar} />
        </>
    )
}
