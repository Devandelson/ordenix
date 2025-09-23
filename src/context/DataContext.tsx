import React, { createContext, useContext, type ReactNode } from "react";
import { useEffect, useState } from "react";
import dataJSON from './data.tsx';
import { type DataJsonTypes } from './interfaceData.tsx';

interface DataContexType {
    data: DataJsonTypes[] | undefined;
    setData: React.Dispatch<React.SetStateAction<DataJsonTypes[] | undefined>>;
}

const DataContext = createContext<DataContexType>({
    data: undefined,
    setData: () => {}
});

export function DataProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<DataJsonTypes[] | undefined>(undefined);

    // cargar desde localStorage o JSON
    useEffect(() => {
        const saved = localStorage.getItem("data");

        if (saved) {
            setData(JSON.parse(localStorage.getItem('data') ?? '[]'));
        } else {
            setData(dataJSON ?? []); // primera vez, carga el JSON del archivo
        }
    }, []);

    // guardar en localStorage cada vez que cambien
    useEffect(() => {
        if (data) {
            localStorage.setItem("data", JSON.stringify(data));
        }
    }, [data]);

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    const context = useContext(DataContext);

    if (!context) {
        throw new Error('useData debe usarse dentro de un DataProvider');
    }

    return context;
}