import Image from "next/image";
import { FaBuilding, FaTools, FaUsers } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { IoMdCheckbox, IoMdCheckboxOutline } from "react-icons/io";
import { MdDashboard, MdForklift } from "react-icons/md";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex">
        <aside className="w-64 p-6 bg-white/40">
          <Image src={"/image/logo.png"} className="w-full"
           alt="Logo" width={240} height={240} />

          <nav className="space-y-4 flex flex-col mt-8">
            <a href="" className="flex items-center gap-4
                                 hover:font-semibold">
              <MdDashboard />
              Dashboard
            </a>
            <a href="" className="flex items-center gap-4
                                 hover:font-semibold">
              <FaBuilding />
              Ambientes</a>
            <a href="" className="flex items-center gap-4
                                 hover:font-semibold">
              <MdForklift />
              Equipamentos</a>
            <a href="" className="flex items-center gap-4
                                 hover:font-semibold">
              <FaTools />
              Manutenções</a>
            <a href="" className="flex items-center gap-4
                                 hover:font-semibold">
              <FaUsers />
              Usuário</a>
          </nav>
        </aside>

        <main className="flex-1 flex flex-col">

          <h1 className="text-4xl font-bold uppercase w-full
           bg-white/40 p-6 text-center">
            Sistema de Gestão de Manutenção</h1>

          <div>
            <div className="grid grid-cols-4 gap-4 p-6">

              <div className="bg-orange-200 p-6 flex 
                              gap-2 rounded-xl">
                <div className="flex-1 flex flex-col">
                  <strong className="text-3xl font-bold">200</strong>
                  <span className="text-sm text-zinc-500">Ambientes</span>
                </div>
                <FaBuilding size={48} />

              </div>
                

              <div className="bg-blue-200 p-6 flex 
                              gap-2 rounded-xl">
                <div className="flex-1 flex flex-col">
                  <strong className="text-3xl font-bold">200</strong>
                  <span className="text-sm text-zinc-500">Equipamentos</span>
                </div>
                <MdForklift size={48} />

              </div>
                

              <div className="bg-red-200 p-6 flex 
                              gap-2 rounded-xl">
                <div className="flex-1 flex flex-col">
                  <strong className="text-3xl font-bold">200</strong>
                  <span className="text-sm text-zinc-500">O.S. Abertas</span>
                </div>
                <GrNotes size={48} />

              </div>
                

              <div className="bg-green-200 p-6 flex 
                              gap-2 rounded-xl">
                <div className="flex-1 flex flex-col">
                  <strong className="text-3xl font-bold">200</strong>
                  <span className="text-sm text-zinc-500">O.S. Concluídas</span>
                </div>
                <IoMdCheckboxOutline size={48} />

              </div>
            </div>
          </div>


        </main>

      </div>
      <footer 
      className="p-6 bg-white/40 text-center 
              text-red-900 text-sm">
        Todos os direitos reservados &copy; 2024
      </footer>
    </div>
  );
}
