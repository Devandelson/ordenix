import logo from '../assets/logo.png';
import women from '../assets/woman.png';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface filterProps {
    inputValue: string;
    category: string;
}

export const Menu = function (
    { setFilter, activeButtonMenu, setActiveButtonMenu }:
        {
            setFilter: React.Dispatch<React.SetStateAction<filterProps>>,
            activeButtonMenu: string,
            setActiveButtonMenu: React.Dispatch<React.SetStateAction<string>>
        }
) {
    return (
        <section className='w-full h-auto p-2 bg-white fixed bottom-0 left-0 z-10 flex items-center justify-between gap-3.5 flex-wrap'>
            <div className='flex items-center gap-2.5'>
                <img src={logo} alt="Logo de la app" className='size-15 object-contain' />
                <h1 className='text-2xl font-bold'>Ordenix</h1>
            </div>

            <MenuRegular setFilter={setFilter} activeButtonMenu={activeButtonMenu} setActiveButtonMenu={setActiveButtonMenu}></MenuRegular>

            <div className='flex items-center gap-3'>
                <img src={women} alt="imagen de usuario" className='size-12 object-contain' />

                <span className='text-ms font-semibold flex flex-col'>
                    <p>Maria</p>
                    <p className='text-blue-400'>Administrador</p>
                </span>
            </div>
        </section>
    )
}

// -- differents components for menu (responsive)
function MenuRegular(
    { setFilter, activeButtonMenu, setActiveButtonMenu }:
        {
            setFilter: React.Dispatch<React.SetStateAction<filterProps>>,
            activeButtonMenu: string,
            setActiveButtonMenu: React.Dispatch<React.SetStateAction<string>>
        }
) {
    // function filter for category select
    function handleCategory(category: string) {
        setActiveButtonMenu(category);
        setFilter(prev => ({ ...prev, category: category }));
    }

    // function for indicate the button select
    function isSelect(category: string) {
        if (category.toLocaleLowerCase() == activeButtonMenu.toLocaleLowerCase()) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <ul className='list-none flex items-center flex-wrap gap-2.5 max-md:hidden'>
            <ButtonMenu titulo='En proceso' icon='fa-solid fa-spinner' isActive={isSelect('Pendiente')}
                onClick={() => {
                    handleCategory('Pendiente')
                }}></ButtonMenu>

            <ButtonMenu titulo='Todo' isActive={isSelect('all')} icon='fa-solid fa-boxes-stacked'
                onClick={() => {
                    handleCategory('all')
                }}
            ></ButtonMenu>

            <ButtonMenu titulo='Completado' icon='fa-solid fa-check-to-slot' isActive={isSelect('Completo')}
                onClick={() => {
                    handleCategory('Completo')
                }}></ButtonMenu>

            <ButtonMenu titulo='Cancelado' icon='fa-solid fa-ban' isActive={isSelect('Cancelado')}
                onClick={() => {
                    handleCategory('Cancelado')
                }}></ButtonMenu>
        </ul>
    )
}

export const CategoryResponsive = function (
    { setFilter, activeButtonMenu, setActiveButtonMenu }:
        {
            setFilter: React.Dispatch<React.SetStateAction<filterProps>>,
            activeButtonMenu: string,
            setActiveButtonMenu: React.Dispatch<React.SetStateAction<string>>
        }
) {
    // function filter for category select
    function handleCategory(category: string) {
        setActiveButtonMenu(category);
        setFilter(prev => ({ ...prev, category: category }));
    }

    // function for indicate the button select
    function isSelect(category: string) {
        if (category.toLocaleLowerCase() == activeButtonMenu.toLocaleLowerCase()) {
            return true;
        } else {
            return false;
        }
    }

    const [activeMenu, setActiveMenu] = useState(false);
    function handleMenu() {
        setActiveMenu((prev) => prev == false ? true : false);
    }

    const classActiveMenu = activeMenu == true ? '-rotate-180' : '';

    return (
        <div className='md:hidden w-full h-auto mb-5 relative text-center'>
            <p className='text-3xl font-semibold' onClick={handleMenu}>Categorias <i className={`fa-solid fa-angle-down transition-transform duration-150 cursor-pointer ${classActiveMenu}`}></i></p>
            <AnimatePresence>
                {activeMenu && (
                    <motion.span className='flex flex-col gap-1.5 w-45 p-3 bg-white rounded mt-2 overflow-hidden absolute left-1/2 -translate-x-1/2 top-full shadow-lg'
                        initial={{ height: 0, opacity: 0, y: 20 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: 20 }}
                    >
                        <ButtonMenu titulo='En proceso' icon='fa-solid fa-spinner' isActive={isSelect('Pendiente')}
                            onClick={() => {
                                handleCategory('Pendiente')
                            }}></ButtonMenu>

                        <ButtonMenu titulo='Todo' isActive={isSelect('all')} icon='fa-solid fa-boxes-stacked'
                            onClick={() => {
                                handleCategory('all')
                            }}
                        ></ButtonMenu>

                        <ButtonMenu titulo='Completado' icon='fa-solid fa-check-to-slot' isActive={isSelect('Completo')}
                            onClick={() => {
                                handleCategory('Completo')
                            }}></ButtonMenu>

                        <ButtonMenu titulo='Cancelado' icon='fa-solid fa-ban' isActive={isSelect('Cancelado')}
                            onClick={() => {
                                handleCategory('Cancelado')
                            }}></ButtonMenu>
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    )
}

// --------- Buttons
type ButtonFilterProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    titulo: string;
    isActive?: boolean;
    icon: string
};

function ButtonMenu({ titulo, isActive = false, icon, ...Events }: ButtonFilterProps) {
    const classActive = isActive ? '!bg-green-700' : '';

    return (
        <button className={`${classActive} p-2 px-3 bg-gray-500 text-white rounded text-lg font-semibold hover:bg-green-700 hover:scale-110 transition-all cursor-pointer active:bg-green-800 flex gap-1.5 items-center active:scale-[0.90]      
        max-md:text-sm
        `} {...Events}>
            <i className={icon}></i>
            {titulo}
        </button>
    )
}