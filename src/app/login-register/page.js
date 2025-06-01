import AuthType from "@/components/templates/login-register/AuthType";
import styles from "@/styles/login-register.module.css";
import { authUser } from "@/utils/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const LoginOrRegister = async() => {
  const user = await authUser()
  if (user) redirect("/")
  return (
    <div className={` md:justify-normal justify-center md:items-normal items-center ${styles.login_register}`}>
      <div className={`w-full !px-2 lg:w-1/2`} data-aos="fade-up">
        <AuthType />
      </div>
      <section className="relative hidden lg:block w-full h-full">
        <Image
          src="/images/coffee-brain-caffeine-neuroscincces.webp"
          alt="Coffee and brain illustration"
          fill
          className="object-cover"
          priority
        />
      </section>
    </div>
  );
};

export default LoginOrRegister;
