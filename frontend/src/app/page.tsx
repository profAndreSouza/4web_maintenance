import { FaBuilding } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdForklift } from "react-icons/md";
import { Footer } from "./components/footer";
import { Aside } from "./components/aside";
import { Card } from "./components/card";
import { DataTable as MyDataTable } from "./components/datatable";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MainChart } from "./components/mainchart";
        


export default function Home() {


  const cards = [
    {color: "bg-orange-200", qty:"100", text:"Ambientes", icon:<FaBuilding size={48} />},
    {color: "bg-blue-200", qty:"100", text:"Equipamentos", icon:<MdForklift size={48} />},
    {color: "bg-red-200", qty:"100", text:"O.S. Abertas", icon:<GrNotes size={48} />},
    {color: "bg-green-200", qty:"100", text:"O.S. Concluídas", icon:<IoMdCheckboxOutline size={48} />},
  ];

  const requisitions = [
    {place: "Sala 01", equipment:"Projetor", requested:"27-jul", completed:"-"},
    {place: "Sala 01", equipment:"Lousa", requested:"27-jul", completed:"27-jul"},
    {place: "Sala 02", equipment:"Mesa", requested:"28-jul", completed:"-"},
  ];
    
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex h-4/5">
        
        <Aside />

        <main className="flex-1 flex flex-col">

          <h1 className="text-4xl font-bold uppercase w-full
           bg-white/40 p-6 text-center">
            Sistema de Gestão de Manutenção</h1>

          <div className="max-h-svh overflow-y-auto">

            <div className="grid grid-cols-4 gap-4 p-6">
              {cards.map((props) => (
                <Card color={props.color}
                    qty={props.qty}
                    text={props.text}
                    icon={props.icon}
                />
              ))}
            </div>

            
            <div className="flex gap-2 p-6 pt-0">

            <div className="p-0  rounded-xl w-1/3">
              <MainChart />
            </div>
            <div className="m-6 mt-0 p-6 bg-white/40 rounded-xl flex-1">
              {/* <DataTable /> */}
              <DataTable value={requisitions} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                  <Column field="place" header="Ambiente" style={{ width: '25%' }}></Column>
                  <Column field="equipment" header="Equipamento" style={{ width: '25%' }}></Column>
                  <Column field="requested" header="Solicitado em" style={{ width: '25%' }}></Column>
                  <Column field="completed" header="Atendido em" style={{ width: '25%' }}></Column>
              </DataTable>

            </div>

            </div>

          </div>


        </main>

      </div>

      <Footer />

    </div>
  );
}
