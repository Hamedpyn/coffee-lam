import Link from "next/link";
import styles from "./promote.module.css";
import Image from "next/image";

const Promote = () => {
  return (
    <div className={styles.readable}>
      <div data-aos="fade-up-right" className={styles.container}>
        <main className={`flex justify-center items-center flex-col sm:flex-row sm:justify-between w-full flex-wrap  ${styles.main}`}>
          <section className="flex justify-center items-center flex-col sm:flex-row sm:justify-between w-full">
            <div className="relative w-full h-[300px] sm:h-[400px]" data-aos="fade-right">
              <Image
                src="/images/clubset1.jpg"
                alt="باشگاه مشتریان ست"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 250px"
                className="object-cover"
              />
              <div className="hidden sm:block absolute bottom-0 bg-[#F3F3F3] !p-2 h-[100px]">
                <span>باشگاه مشتریان ست</span>
                <p>برای مشتریان وفادار قهوه ست</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span>خرید قهوه ، به سبک حرفه ای ها</span>
              <p>زیبایی امروز رو با قهوه “ست” کنید</p>
              <div className="relative w-[250px] h-[250px]" data-aos="fade-left">
                <Image
                  src="/images/coffee-image-1.jpg"
                  alt="خرید قهوه"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 250px"
                />
              </div>

            </div>
          </section>

        </main>

        <main className={`flex justify-center items-center flex-col sm:flex-row-reverse  sm:justify-between w-full flex-wrap  ${styles.main}`}>
          <section className="flex justify-center items-center flex-col sm:flex-row-reverse  sm:justify-between sm:gap-10 w-full">
            <div className="relative w-full h-[300px] sm:h-[400px]" data-aos="fade-right">
              <Image
                src="/images/Home32.jpg"
                alt="چرا قهوه ست"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <section data-aos="fade-up" className={`w-1/2 p-5 ${styles.why_coffee}`}>
              <Image
                src="/images/coffee-svg-2.svg"
                alt="لوگو قهوه ست"
                width={100}
                height={100}
                className={styles.logo}
              />

              <p className={styles.title}>چرا قهوه ست</p>
              <p>
                برخورداری از تجربه و قدمت کافی و آگاهی از ذایقه مصرف کنندگان
                راهنمای ما در برآورده ساختن نیاز مشتریان قهوه تخصصی (موج سوم) است
                .تجربه ای به قدمت چهار نسل و ارتباط مستمر با مصرف کنندگان قهوه
                ضامن این ویژگیها است.
              </p>
              <div>
                <Link href="/about-us">
                  <button className={styles.red_btn}>بیشتر بخوانید</button>
                </Link>
                <Link href="/category">
                  <button>فروشگاه</button>
                </Link>
              </div>
            </section>
          </section>

        </main>
      </div>
    </div>
  );
};

export default Promote;
