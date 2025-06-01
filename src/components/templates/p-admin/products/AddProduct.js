"use client";
import React, { useRef, useState } from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function AddProduct() {
  const router = useRouter();
  const fileInputRef = useRef();

  // State for values
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [tags, setTags] = useState("");
  const [img, setImg] = useState(null);

  // State for touched (blurred)
  const [touched, setTouched] = useState({
    name: false,
    price: false,
    shortDescription: false,
    longDescription: false,
    weight: false,
    tags: false,
    img: false,
  });

  // Validation
  const isValid = {
    name: name.trim() !== "",
    price: price.trim() !== "",
    shortDescription: shortDescription.trim() !== "",
    longDescription: longDescription.trim() !== "",
    weight: weight.trim() !== "",
    tags: tags.trim() !== "",
    img: img !== null,
  };

  const allValid = Object.values(isValid).every(Boolean);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getInputClass = (fieldName) => {
    if (!touched[fieldName]) return "";
    return isValid[fieldName] ? styles.valid : styles.invalid;
  };

  const addProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("shortDescription", shortDescription);
    formData.append("longDescription", longDescription);
    formData.append("weight", weight);
    formData.append("tags", tags.split("،"));
    formData.append("img", img);

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    if (res.status === 201) {
      Swal.fire({
        title: "محصول مورد نظر با موفقیت ایجاد شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
        setName("")
        setPrice("")
        setShortDescription("")
        setLongDescription("")
        setWeight("")
        setTags("")
        setImg("")
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setTouched({
          name: false,
          price: false,
          shortDescription: false,
          longDescription: false,
          weight: false,
          tags: false,
          img: false,
        });

      });
    }
  };

  return (
    <section className={styles.discount}>
      <p>افزودن محصول جدید</p>
      <div className={styles.discount_main}>
        <div>
          <label>نام محصول</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur("name")}
            className={getInputClass("name")}
            placeholder="لطفا نام محصول را وارد کنید"
            type="text"
          />
        </div>

        <div>
          <label>مبلغ محصول</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onBlur={() => handleBlur("price")}
            className={getInputClass("price")}
            placeholder="لطفا مبلغ محصول را وارد کنید"
            type="number"
          />
        </div>

        <div>
          <label>توضیحات کوتاه</label>
          <input
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            onBlur={() => handleBlur("shortDescription")}
            className={getInputClass("shortDescription")}
            placeholder="توضیحات کوتاه محصول"
            type="text"
          />
        </div>

        <div>
          <label>توضیحات بلند</label>
          <input
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            onBlur={() => handleBlur("longDescription")}
            className={getInputClass("longDescription")}
            placeholder="توضیحات بلند محصول"
            type="text"
          />
        </div>

        <div>
          <label>وزن</label>
          <input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            onBlur={() => handleBlur("weight")}
            className={getInputClass("weight")}
            placeholder="وزن محصول"
            type="number"
          />
        </div>

        <div>
          <label>تگ های محصول</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            onBlur={() => handleBlur("tags")}
            className={getInputClass("tags")}
            placeholder="مثال: قهوه،قهوه ترک، قهوه اسپرسو"
            type="text"
          />
        </div>

        <div>
          <label>تصویر محصول</label>
          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => {
              setImg(e.target.files[0])
              handleBlur("img")
            }}
            className={getInputClass("img")}
          />
        </div>
      </div>

      <button className="disabledStyles" onClick={addProduct} disabled={!allValid}>
        افزودن
      </button>
    </section>
  );
}

export default AddProduct;
