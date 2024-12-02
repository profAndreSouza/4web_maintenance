"use client";
import { useState } from "react";
import { MdDashboard, MdForklift } from "react-icons/md";
import { FaBuilding, FaTools, FaUsers, FaClipboardList, FaCogs, FaBoxOpen, FaChevronDown, FaChevronUp } from "react-icons/fa";

export function NavBar() {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const toggleSubMenu = (text: string) => {
        setExpanded((prev) => ({ ...prev, [text]: !prev[text] }));
    };

    const links = [
        {
            target: "/",
            text: "Dashboard",
            icon: <MdDashboard />,
            subpages: [],
        },
        {
            target: "#",
            text: "Ambientes",
            icon: <FaBuilding />,
            subpages: [
                { target: "#ambientes-lista", text: "Lista de Ambientes" },
                { target: "#ambientes-cadastro", text: "Cadastrar Ambiente" },
            ],
        },
        {
            target: "#",
            text: "Manutenções",
            icon: <FaTools />,
            subpages: [
                { target: "#manutencoes-lista", text: "Lista de Manutenções" },
                { target: "#manutencoes-cadastro", text: "Cadastrar Manutenção" },
            ],
        },
        {
            target: "#",
            text: "Máquinas",
            icon: <MdForklift />,
            subpages: [
                { target: "/machine", text: "Listar" },
                { target: "/machine/create", text: "Cadastrar" },
            ],
        },
        {
            target: "#",
            text: "Usuários",
            icon: <FaUsers />,
            subpages: [],
        },
        {
            target: "#",
            text: "Estoque",
            icon: <FaBoxOpen />,
            subpages: [
                { target: "#estoque-lista", text: "Lista de Peças" },
                { target: "#estoque-cadastro", text: "Cadastrar Peça" },
            ],
        },
        {
            target: "#",
            text: "Equipes",
            icon: <FaCogs />,
            subpages: [],
        },
        {
            target: "#",
            text: "Relatórios",
            icon: <FaClipboardList />,
            subpages: [
                { target: "#relatorios-gerar", text: "Gerar Relatório" },
                { target: "#relatorios-historico", text: "Histórico de Relatórios" },
            ],
        },
    ];

    return (
        <nav className="flex flex-col space-y-4 p-4 bg-gray-800 text-white min-h-screen w-64">
            {links.map((link, index) => (
                <div key={index} className="flex flex-col">
                    {/* Main link */}
                    <button
                        onClick={() => toggleSubMenu(link.text)}
                        className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 transition-colors ${
                            link.subpages.length ? "cursor-pointer" : ""
                        }`}
                    >
                        <a
                            href={link.target}
                            className="flex items-center gap-4 w-full"
                        >
                            <span className="text-2xl">{link.icon}</span>
                            <span className="text-sm">{link.text}</span>
                        </a>
                        {link.subpages.length > 0 && (
                            <span className="text-lg">
                                {expanded[link.text] ? <FaChevronUp /> : <FaChevronDown />}
                            </span>
                        )}
                    </button>

                    {/* Subpages */}
                    {link.subpages.length > 0 && expanded[link.text] && (
                        <div className="ml-8 mt-2 flex flex-col space-y-2">
                            {link.subpages.map((subpage, subIndex) => (
                                <a
                                    key={subIndex}
                                    href={subpage.target}
                                    className="text-sm flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    {subpage.text}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    );
}
