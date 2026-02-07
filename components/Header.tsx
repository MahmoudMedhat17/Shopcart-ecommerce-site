import Container from "@/components/Container";
import Logo from "@/components/Logo";
import HeaderMenu from "@/components/HeaderMenu";

const Header = () => {
    return (
        <header className="bg-white py-5 border-b-2">
            <Container className="flex justify-between items-center">
                <Logo />
                <HeaderMenu />
                <div>NavbtnsAdmin</div>
            </Container>
        </header>
    )
}

export default Header;