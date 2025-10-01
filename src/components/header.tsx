import { useData } from '../context/DataContext.tsx';
import { useMemo } from 'react';

export default function Header() {
    const { data } = useData();

    const { pendingCount, totalEarnings } = useMemo(() => {
        if (!data) return { pendingCount: 0, totalEarnings: 0 };

        let pendingCount = 0;
        let totalEarnings = 0;

        for (const item of data) {
            if (item.cliente?.estado === "Pendiente") {
                pendingCount++;
            } else if (item.cliente?.estado !== "Cancelado") {
                totalEarnings += Number(item.total?.monto);
            }
        }

        return { pendingCount, totalEarnings };
    }, [data]);
    
    return (
        <header className="w-full h-auto flex items-center justify-between gap-3.5 flex-wrap
        max-md:flex-col
        ">
            <section className="flex items-center gap-3 text-4xl">
                <i className="fa-solid fa-list-check text-5xl"></i>
                <h2>Ordenes</h2>
            </section>

            <section className="flex flex-col font-semibold text-end text-2xl max-md:text-center">
                <p>Ordenes pendientes: {pendingCount}</p>
                <p>Ganancias de encargo: $ {totalEarnings.toLocaleString()} US</p>
            </section>
        </header>
    )
}

// max-md: