import Card from './card.tsx';
import { useData } from '../../context/DataContext.tsx';
import type { DataJsonTypes } from '../../context/interfaceData.tsx';
import { AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface imagesTypes {
    image: string;
    name: string;
}

interface dataDetailProps {
    status: boolean;
    images: imagesTypes[];
}

interface filterProps {
    inputValue: string;
    category: string;
}

export default function ContainerCard(
    { setDetail, filter }:
        {
            setDetail: React.Dispatch<React.SetStateAction<dataDetailProps>>,
            filter: filterProps
        }
) {
    const { data } = useData();
    const [Elements, setElements] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        if (!data) return;

        const mapped = data.map((item, idx) => {
            const showChildren = filterConditional(filter, item);

            return (
                showChildren && (
                    <Card
                        key={item.orden?.id_orden ?? idx}
                        cliente={item.cliente}
                        orden={item.orden}
                        productos={item.productos}
                        total={item.total}
                        accion={item.accion}
                        setDetail={setDetail} // 👈 aún lo pasas, pero ya no lo usas como dependencia
                    />
                )
            );
        });

        setElements(mapped);
    }, [data, filter]);

    return (
        <section className='mb-20 w-full h-auto flex items-start gap-5 flex-wrap justify-center'>
            <AnimatePresence initial={false}>
                {Elements}
            </AnimatePresence>
        </section>
    );
}

function filterConditional(filter: filterProps, item: DataJsonTypes): boolean {
    if (filter.inputValue === '' && filter.category === 'all' && item.cliente?.estado != 'Cancelado') {
        return true;
    } else if (filter.inputValue !== '' && filter.category === 'all') {
        return (item.orden?.id_orden ?? '')
            .toLowerCase()
            .startsWith(filter.inputValue.toLowerCase());
    } else if (filter.inputValue === '' && filter.category !== 'all') {
        return item.cliente?.estado === filter.category;
    } else if (filter.inputValue !== '' && filter.category !== 'all') {
        return (
            (item.orden?.id_orden ?? '')
                .toLowerCase()
                .startsWith(filter.inputValue.toLowerCase()) &&
            item.cliente?.estado === filter.category
        );
    }
    return false;
}
