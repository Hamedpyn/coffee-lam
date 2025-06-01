"use client";
import Link from "next/link";
import styles from "./table.module.css";
import totalStyles from "./totals.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import stateData from "@/utils/stateData";
import { useRouter } from "next/navigation";
import { TbShoppingCartX } from "react-icons/tb";

const Table = () => {
  let router = useRouter()
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState("");
  const [discountPercent, setDiscountPercent] = useState(null);
  const [originalTotal, setOriginalTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const stateOptions = stateData();
  const [stateSelectedOption, setStateSelectedOption] = useState({ label: "تهران", value: "تهران" });
  const [citySelectedOption, setCitySelectedOption] = useState({ label: "تهران", value: "تهران" });
  const [tempStateSelectedOption, setTempStateSelectedOption] = useState({ label: "تهران", value: "تهران" });
  const [tempCitySelectedOption, setTempCitySelectedOption] = useState({ label: "تهران", value: "تهران" });

  const [cityOptions, setCityOptions] = useState([]);
  const [changeAddress, setChangeAddress] = useState(false);

  const handleStateChange = (selected) => {
    setTempStateSelectedOption(selected);
    setTempCitySelectedOption(null);
    if (selected) {
      const matchedState = stateOptions.find((s) => s.label === selected.label);
      const cities = matchedState?.value.map((city) => ({ label: city, value: city }));
      setCityOptions(cities);
    } else {
      setCityOptions([]);
    }
  };

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    if (localCart) setCart(localCart);
  }, []);

  useEffect(() => {;
    let price = 0;
    if (cart.length) {
      price = cart.reduce((prev, current) => prev + current.price * current.count, 0);
    }
    setTotalPrice(price);
    setOriginalTotal(price);
  }, [cart]);

  const handleDiscountClick = async () => {
    if (discountPercent !== null) {
      // Remove discount
      setTotalPrice(originalTotal);
      setDiscount("");
      setDiscountPercent(null);
      return;
    }

    const res = await fetch(`/api/off/${discount}`);
    if (res.status === 404) {
      Swal.fire({
        title: "کد تخفیف مورد استفاده وجود ندارد",
        icon: "error",
        confirmButtonText: "فهمیدم",
      });
    } else if (res.status === 422) {
      Swal.fire({
        title: "کد تخفیف مورد استفاده منقضی شده است",
        icon: "error",
        confirmButtonText: "فهمیدم",
      });
    } else if (res.status === 200) {
      const discountCode = await res.json();
      Swal.fire({
        title: "کد تخفیف با موفقیت اعمال شد",
        icon: "success",
        confirmButtonText: "فهمیدم",
      });

      const newPrice = totalPrice - (totalPrice * discountCode) / 100;
      setOriginalTotal(totalPrice);
      setTotalPrice(newPrice);
      setDiscountPercent(discountCode);
    }
  };

  const setOrder = async (e) => {
    e.preventDefault();

    const product = cart.map((item) => ({
      id: item.id,
      count: item.count,
    }));

    const newOrder = {
      code: discount,
      product,
    };

    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    });

    if (res.status === 201) {
      Swal.fire({
        title: "سفارش شما با موفقیت ثبت شد",
        icon: "success",
        confirmButtonText: "فهمیدم",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/p-user/orders');
          localStorage.removeItem("cart");
        }
      });
    } else if (res.status === 404) {
      Swal.fire({
        title: "برای ثبت سفارش وارد حساب خود شوید",
        icon: "success",
        confirmButtonText: "فهمیدم",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login-register');
        }
      });
    }


  };

  const deleteFromBasket = (itemID) => {
    const updatedCart = cart.filter(item => item.id !== itemID);
    setCart(updatedCart);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };


  return (
    <>
      {!cart.length &&
        <div className={styles.cart_empty} data-aos="fade-up">
          <TbShoppingCartX />
          <p>سبد خرید شما در حال حاضر خالی است.</p>
          <span>قبل از تسویه حساب، باید چند محصول را به سبد خرید خود اضافه کنید.</span>
          <span>در صفحه &quot;فروشگاه&quot;، محصولات جالب زیادی خواهید یافت.</span>
          <div>
            <Link href="/category">بازگشت به فروشگاه</Link>
          </div>
        </div>
      }
      {cart.length > 0 &&
        <>
          <div className={styles.tabel_container}>
            <div className={styles.table_scroll_wrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>جمع جزء</th>
                    <th>تعداد</th>
                    <th>قیمت</th>
                    <th>محصول</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, i) => (
                    <tr key={i}>
                      <td>{(item.count * item.price).toLocaleString()} تومان</td>
                      <td className={styles.counter}>
                        <div>
                          <span
                            onClick={() =>
                              setCart((prevCart) =>
                                prevCart.map((el, index) =>
                                  index === i ? { ...el, count: el.count > 1 ? el.count - 1 : 1 } : el
                                )
                              )
                            }
                          >
                            -
                          </span>
                          <p>{item.count}</p>
                          <span
                            onClick={() =>
                              setCart((prevCart) =>
                                prevCart.map((el, index) =>
                                  index === i ? { ...el, count: el.count + 1 } : el
                                )
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </td>
                      <td className={styles.price}>{item.price.toLocaleString()} تومان</td>
                      <td className={styles.product}>
                        <img
                          src={item.img}
                          alt=""
                        />
                        <Link href={"/"}>{item.name}</Link>
                      </td>
                      <td onClick={() => deleteFromBasket(item.id)}>
                        <IoMdClose className={styles.delete_icon} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <section className="flex flex-col items-center !mt-5 justify-center">
              <button className={`!w-full ${styles.update_btn}`}>
                بروزرسانی سبد خرید
              </button>
              <div className="flex flex-wrap items-baseline justify-center gap-2">
                <button onClick={handleDiscountClick} className={styles.set_off_btn}>
                  {discountPercent !== null ? "حذف کد تخفیف" : "اعمال کوپن"}
                </button>
                <input
                  className="!py-[0.6rem] !px-4 rounded-md bg-white text-black w-[230px] border border-[#0000001a]"
                  type="text"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                  placeholder="کد تخفیف"
                  disabled={discountPercent !== null}
                />
              </div>
            </section>
          </div>

          <div className={totalStyles.totals}>
            <p className={totalStyles.totals_title}>جمع کل سبد خرید</p>
            <div className={totalStyles.subtotal}>
              <p>جمع جزء </p>
              <p>{originalTotal.toLocaleString()} تومان</p>
            </div>

            <p className={totalStyles.motor}>
              پیک موتوری: <strong>30,000</strong>
            </p>

            {citySelectedOption && (
              <div className={totalStyles.address}>
                <p>حمل و نقل </p>
                <span>
                  حمل و نقل به {stateSelectedOption?.label} (شهر {citySelectedOption?.label}).
                </span>
              </div>
            )}

            <p onClick={() => setChangeAddress((prev) => !prev)} className={totalStyles.change_address}>
              تغییر آدرس
            </p>

            {changeAddress && (
              <div className={totalStyles.address_details}>
                <Select
                  value={tempStateSelectedOption}
                  onChange={handleStateChange}
                  isClearable={true}
                  placeholder={"استان"}
                  isRtl={true}
                  isSearchable={true}
                  options={stateOptions.map((opt) => ({
                    label: opt.label,
                    value: opt.label,
                  }))}
                />
                <Select
                  value={tempCitySelectedOption}
                  onChange={setTempCitySelectedOption}
                  isClearable={true}
                  placeholder={"شهر"}
                  isRtl={true}
                  isSearchable={true}
                  options={cityOptions}
                  isDisabled={!tempStateSelectedOption}
                />
                <input type="number" placeholder="کد پستی" />
                <button
                  onClick={() => {
                    setStateSelectedOption(tempStateSelectedOption);
                    setCitySelectedOption(tempCitySelectedOption);
                    setChangeAddress(false);
                  }}
                >
                  بروزرسانی
                </button>
              </div>
            )}

            <div className={totalStyles.total}>
              <p>مجموع</p>
              <p>{totalPrice.toLocaleString()} تومان</p>
            </div>

            <div onClick={setOrder}>
              <button className={totalStyles.checkout_btn}>ادامه جهت تسویه حساب</button>
            </div>
          </div>
        </>
      }

    </>
  );
};

export default Table;
