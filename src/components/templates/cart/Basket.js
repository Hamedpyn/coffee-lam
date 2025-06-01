"use client";

import { useEffect, useState } from "react";
import Table from "@/components/templates/cart/Table";
import styles from "@/styles/cart.module.css";
import Link from "next/link";
import { TbShoppingCartX } from "react-icons/tb";

export default function Basket() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) {
            setProducts(JSON.parse(stored));
        }
    }, []);

    return (
        <>
            {products.length ? (
                <main className={styles.cart} data-aos="fade-up">
                    <Table />
                </main>
            ) : (
                <div className={styles.cart_empty} data-aos="fade-up">
                    <TbShoppingCartX />
                    <p>سبد خرید شما در حال حاضر خالی است.</p>
                    <span>قبل از تسویه حساب، باید چند محصول را به سبد خرید خود اضافه کنید.</span>
                    <span>در صفحه &quot;فروشگاه&quot;، محصولات جالب زیادی خواهید یافت.</span>
                    <div>
                        <Link href="/category">بازگشت به فروشگاه</Link>
                    </div>
                </div>
            )}
        </>
    );
}
