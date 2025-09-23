import { createContext, useContext, type ReactNode, useState } from "react";

interface formTypes {
    visibleForm: boolean;
    setVisibleForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const FormContext = createContext<formTypes | undefined>(undefined);
 
export function FormProvider({children} : {children: ReactNode}) {
    const [visibleForm, setVisibleForm] = useState(false);

    return (
        <FormContext.Provider value={{visibleForm, setVisibleForm}}>
            {children}
        </FormContext.Provider>
    ) 
}

export function useFormContext() {
    const context = useContext(FormContext);
    if (!context) {
        throw 'Para su uso, debe usarse dentro de FormContext Provider!.';
    }
    return context;
}