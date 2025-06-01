import Footer from "../modules/footer/Footer";
import NavBarWrapper from "../modules/NavBarWrapper/page";

export default async function ClientPagesLayout({ children }) {
    return (
        <>
            <NavBarWrapper />
            {children}
            <Footer />
        </>
    )
}
