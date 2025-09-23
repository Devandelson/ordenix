import { useFormContext } from '../context/formContext.tsx';

interface filterProps {
    inputValue: string;
    category: string;
}

export default function Filter(
    { setFilter }:
        { setFilter: React.Dispatch<React.SetStateAction<filterProps>> }
) {
    function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
        setFilter(prev => ({ ...prev, inputValue: e.target.value }));
    }

    const { setVisibleForm } = useFormContext();
    function handleVisibleForm() {
        setVisibleForm((prev) => prev == true ? false : true);
    }

    return (
        <div className="w-full h-auto flex items-center justify-between gap-3.5 flex-wrap mt-5">
            <section className="w-full h-auto flex items-center gap-2.5 bg-white border-3 border-gray-200 p-2 text-black rounded-md max-w-[700px] text-xl">
                <i className="fa-solid fa-magnifying-glass text-3xl"></i>
                <input type="text" placeholder="Buscar id de orden" className="outline-none font-semibold grow"
                    onChange={(e) => { handleInputValue(e) }}
                />
            </section>

            <button className="p-2 px-3 bg-cyan-500 text-white rounded text-lg font-semibold hover:bg-cyan-700 hover:scale-110 transition-all cursor-pointer active:bg-cyan-800 flex gap-1.5 items-center active:scale-[0.90] max-md:text-sm"
                onClick={handleVisibleForm}
            >
                + Crear pedido
            </button>
        </div>
    )
}