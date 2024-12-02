import React from "react";

interface LayoutProps {
    children: React.ReactNode;
    aside: React.ReactNode;
    footer: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, aside, footer }) => {
    return (
        <div className="h-screen flex flex-col bg-gray-100 text-gray-800">
            {/* Layout principal */}
            <div className="flex flex-1">
                {/* Menu lateral */}
                {aside}

                {/* Conteúdo principal */}
                <main className="flex-1 flex flex-col bg-white shadow-lg">
                    <header className="bg-gray-900 text-white text-center py-4">
                        <h1 className="text-2xl font-semibold uppercase">
                            Sistema de Gestão de Manutenção
                        </h1>
                    </header>
                    <div className="flex-1 p-6">{children}</div>
                </main>
            </div>

            {/* Rodapé */}
            <footer className="bg-gray-900 text-white text-center py-4">
                {footer}
            </footer>
        </div>
    );
};

export default Layout;
