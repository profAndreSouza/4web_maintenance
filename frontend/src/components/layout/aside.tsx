import Image from "next/image";
import { NavBar } from "./navbar";

export function Aside() {
    return (
        <aside className=" bg-gray-900 text-white flex flex-col items-center p-6">
            {/* Logo */}
            <Image
                src="/image/logo.png"
                alt="Logo"
                width={180}
                height={180}
                className="mb-8"
            />

            {/* Navegação */}
            <NavBar />
        </aside>
    );
}
