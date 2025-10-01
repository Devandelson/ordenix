import { useState } from "react";
import type { DataJsonTypes } from '../context/interfaceData.tsx';
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from 'motion/react';

// context
import { useFormContext } from '../context/formContext.tsx';
import { useData } from '../context/DataContext.tsx';

interface ProductoType {
    id: number | undefined;
    producto: string | undefined;
    unidad: number | undefined;
    precio: number | undefined;
    "moneda": string | undefined,
    "imagenes": string
}

export default function FormProduct() {
    const { visibleForm, setVisibleForm } = useFormContext();

    // Generar id único una sola vez
    const emptyData: DataJsonTypes = {
        cliente: { nombre: "", estado: "Pendiente" },
        orden: {
            id_orden: uuidv4().substring(0, 5),
            fecha: new Date().toISOString().split("T")[0],
            hora: new Date().toTimeString().slice(0, 5),
        },
        productos: [
            {
                id: 1,
                producto: '',
                unidad: undefined,
                precio: undefined,
                "moneda": 'USD',
                "imagenes": ''
            }
        ],
        total: { monto: 0, moneda: "USD" },
        accion: "¿Pago?",
    };

    const [valuesItemsProducts, setValuesItemsProducts] = useState<DataJsonTypes>(emptyData);
    const [products, setProducts] = useState(valuesItemsProducts.productos);

    // function add product
    function handleAddProduct() {
        setProducts((prev) => {
            if (prev) {
                const copyPrev = [...prev];

                // validation of prev item
                const productIndex = copyPrev.length - 1;
                const productSelect = copyPrev[productIndex];
                console.log(productSelect);

                const productoOk = productSelect
                    && productSelect.producto?.trim() !== ""
                    && productSelect.unidad !== undefined
                    && productSelect.precio !== undefined
                    && productSelect.moneda?.trim() !== ""
                    && productSelect.imagenes?.trim() !== "";

                if (!productoOk) {
                    Swal.fire({
                        text: 'No puedes crear otro producto, sin llenar el anterior!',
                        icon: 'warning'
                    })
                    return prev;
                }

                const idEmptyData = (copyPrev.length ?? 0) + 1;
                const dataNew = {
                    id: idEmptyData,
                    producto: '',
                    unidad: undefined,
                    precio: undefined,
                    "moneda": 'USD',
                    "imagenes": ''
                };

                copyPrev.push?.(dataNew);
                return copyPrev;
            }
        });
    }

    // handle values Products
    function handleInputValue(e: React.ChangeEvent<HTMLInputElement>, subKey: string) {
        const { name, value } = e.target;

        setValuesItemsProducts((prev) => {
            return {
                ...prev,
                [subKey]: {
                    ...(prev as any)[subKey],
                    [name]: value,
                },
            };
        });
    }

    // function of form visibility
    function handleVisibleForm() {
        setVisibleForm((prev) => prev == true ? false : true);
    }

    // function save data
    const { setData } = useData();
    const [reset, setReset] = useState('key1');

    function handleSaveData() {
        // save data
        setData((prev) => {
            if (prev) {
                // preparar y validar en un solo flujo
                const preparedData: DataJsonTypes = {
                    ...valuesItemsProducts,
                    productos: products
                };

                // Validar cliente
                const clienteOk = preparedData.cliente
                    && preparedData.cliente.nombre?.trim() !== ""
                    && preparedData.cliente.estado?.trim() !== "";

                // Validar orden
                const ordenOk = preparedData.orden
                    && preparedData.orden.id_orden?.trim() !== ""
                    && preparedData.orden.fecha?.trim() !== ""
                    && preparedData.orden.hora?.trim() !== "";

                // Validar producto (solo primer elemento)
                const primerProducto = preparedData.productos?.[0];
                const productoOk = primerProducto
                    && primerProducto.producto?.trim() !== ""
                    && primerProducto.unidad?.toString().trim() !== ''
                    && primerProducto.precio?.toString().trim() !== ''
                    && primerProducto.moneda?.trim() !== ""
                    && primerProducto.imagenes?.trim() !== "";

                // Si no pasa validación, no guardar nada
                if (!clienteOk || !ordenOk || !productoOk) {
                    Swal.fire({
                        text: 'Datos incompletos, no se agregó el registro.',
                        icon: 'warning'
                    });

                    return prev; // retornar el mismo estado sin cambios
                }

                const copyPrev = [...prev];
                copyPrev.push(preparedData);
                return copyPrev;
            }
        })

        // reset data
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "🚀 ¡Listo! Los cambios quedaron guardados sin problemas.",
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            setValuesItemsProducts(emptyData);
            setProducts(valuesItemsProducts.productos);
            setVisibleForm(false);
            setReset((prev) => prev == 'key1' ? 'key2' : 'key1');
        });
    }

    return (
        <AnimatePresence>
            {visibleForm && (
                <motion.div
                    className="w-full h-screen fixed z-30 p-6 bg-black/50 flex items-center justify-center top-0 left-0"
                    initial={{ y: -200, opacity: '0' }}
                    animate={{ y: 0, opacity: '1' }}
                    exit={{ y: -50, opacity: '0' }}
                    key={reset}
                >

                    <motion.section className="w-full max-w-[800px] m-auto bg-white shadow-md rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
                        initial={{ scale: 0, filter: 'blur(10px)' }}
                        animate={{ scale: 1, filter: 'blur(0px)' }}
                        exit={{ scale: 0, filter: 'blur(10px)' }}
                    >
                        <div className="w-full h-auto flex items-center gap-3.5 flex-wrap justify-between">
                            <h2 className="text-2xl font-bold">Formulario de pedidos</h2>

                            <span className="inline-block text-3xl font-bold
                            hover:scale-125 active:scale-95 transform transition duration-50 ease-in-out
                          hover:text-orange-600 cursor-pointer"
                                onClick={handleVisibleForm}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </span>
                        </div>

                        {/* Datos del Cliente */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Cliente</h3>
                            <Input placeholder="Nombre del cliente" name='nombre' functionChangeValue={(e) => { handleInputValue(e, 'cliente') }}></Input>
                        </div>

                        {/* Productos */}
                        <div className="mb-6">
                            <span className="w-full h-auto flex items-center gap-4 flex-wrap mb-2">
                                <h3 className="text-xl font-semibold">Productos</h3>

                                <p className="font-bold text-lg text-blue-600 cursor-pointer hover:text-blue-800 active:text-blue-950" onClick={handleAddProduct}><i className="fa-solid fa-boxes-stacked"></i> Agregar Producto</p>
                            </span>

                            <div className="space-y-4">
                                {/* Uploading data products */}
                                <AnimatePresence initial={false}>
                                    {
                                        products?.map((itemProduct, idx) => (
                                            <ItemProduct itemProduct={itemProduct} key={itemProduct.id} setProducts={setProducts}
                                                isDelete={(idx == 0 ? false : true)}
                                            ></ItemProduct>
                                        ))
                                    }
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="mb-6 flex items-center gap-4 flex-wrap">
                            <Input placeholder="Monto total" name='monto' functionChangeValue={(e) => { handleInputValue(e, 'total') }}></Input>
                            <Input placeholder="" name='moneda' defaultValue="USD" enable={false} functionChangeValue={(e) => { handleInputValue(e, 'total') }}></Input>
                        </div>

                        {/* Botón */}
                        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
                            onClick={handleSaveData}
                        >
                            Guardar Orden
                        </button>
                    </motion.section>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

type itemProps = {
    isDelete?: boolean;
    setProducts: React.Dispatch<React.SetStateAction<ProductoType[] | undefined>>;
    itemProduct: ProductoType
};

function ItemProduct({ isDelete = true, setProducts, itemProduct }: itemProps) {
    // handle values Products
    function handleInputValue(e: React.ChangeEvent<HTMLInputElement> | string, value: string) {
        let name = '';

        if (typeof e !== "string") {
            // ✅ caso evento
            name = e.target.name;
        } else {
            // ✅ caso string
            name = e;
        }

        setProducts((prev) => {
            if (prev) {
                const copyPrev = prev.map((item) => {
                    if (item.id == itemProduct.id) {
                        return {
                            ...item,
                            [name]: value, // actualización dinámica
                        };
                    }
                    return item;
                });
                return copyPrev;
            }
        });
    }

    function handleDeleteItem() {
        setProducts((prev) => {
            if (prev) {
                const copyPrev = [...prev];
                const positionElement = copyPrev.findIndex((item) => item.id == itemProduct.id);
                copyPrev.splice(positionElement, 1)

                return copyPrev;
            }
        });
    }

    // handle of the image
    const [image, setImage] = useState<File | null>(null);

    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                // TS piensa que puede ser ArrayBuffer o null
                const base64 = reader.result as string;
                resolve(base64);
            };

            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }

    // for input
    function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files?.[0]) {
            const file = e.target.files?.[0];
            const typeImage = file.type;

            if (!typeImage.startsWith('image/')) {
                Swal.fire({
                    text: 'Solamente se permiten imagenes.',
                    icon: 'error'
                });
                return false;
            }

            setImage(file);

            fileToBase64(file).then((value) => {
                handleInputValue(e, value);
            }).catch(() => {
                Swal.fire({
                    text: 'Ocurrio un error al convertir la imagen a base64.',
                    icon: 'error'
                });
                return false;
            });
        }
    }

    // for drag and drop
    const [classDragDrop, setClassDragDrop] = useState('');

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setClassDragDrop('bg-orange-400/50 !border-4');
    }

    function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setClassDragDrop('');
    }

    function handleOnDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setClassDragDrop('');

        // Archivos arrastrados
        if (e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            const typeImage = file.type;

            if (!typeImage.startsWith('image/')) {
                Swal.fire({
                    text: 'Solamente se permiten imagenes.',
                    icon: 'error'
                });
                return false;
            }

            setImage(file);

            fileToBase64(file).then((value) => {
                handleInputValue('imagenes', value);
            }).catch(() => {
                Swal.fire({
                    text: 'Ocurrio un error al convertir la imagen a base64.',
                    icon: 'error'
                });
                return false;
            });
        }
    }

    return (
        <motion.div
            className="flex flex-wrap gap-2.5 items-center border border-gray-200 border-b-gray-700 p-4 rounded"
            initial={{ y: -15, height: 0, opacity: 0, filter: 'blur(10px)' }}
            animate={{ y: 0, height: 'auto', opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -15, height: 0, opacity: 0, filter: 'blur(10px)' }}
        >
            <Input placeholder="Nombre del producto" name="producto"
                functionChangeValue={(e) => { handleInputValue(e, e.target.value) }}
                value={itemProduct.producto ?? ''}
            ></Input>
            <Input placeholder="Cantidad" typeInput="number" name="unidad"
                functionChangeValue={(e) => { handleInputValue(e, e.target.value) }}
                value={itemProduct.unidad ?? ''}
            ></Input>
            <Input placeholder="Precio, (solo el numero)" name="precio"
                functionChangeValue={(e) => { handleInputValue(e, e.target.value) }}
                value={itemProduct.precio ?? ''}
            ></Input>

            <div className="w-full mt-2 h-auto relative flex items-start gap-4 flex-wrap"
                onDragOver={(e) => { handleDragOver(e) }}
                onDragLeave={(e) => { handleDragLeave(e) }}
                onDrop={(e) => { handleOnDrop(e) }}
            >
                <label htmlFor="imgProduct" className="py-1.5 px-2 rounded bg-amber-700 text-white text-lg cursor-pointer hover:scale-110 transition-transform active:scale-[0.90] hover:bg-amber-900 inline-block">Subir imagen</label>
                <input type="file" name="imagenes" id="imgProduct" className="hidden" onChange={(e) => { handleImage(e) }} />

                <div className={`w-48 aspect-square rounded p-2 border-dashed border-3 border-gray-500 ${classDragDrop}`}>
                    {image && (
                        <img src={URL.createObjectURL(image)}
                            className="w-full h-full object-cover bg-top" alt="" />)}
                </div>
            </div>

            {isDelete && (
                <span className="p-2 rounded bg-red-400 text-white px-3 flex items-center gap-1.5 hover:scale-110 transition-transform duration-150 active:scale-[0.95] cursor-pointer"
                    onClick={handleDeleteItem}
                >
                    <i className="fa-solid fa-trash text-xl font-bold"></i>
                    Eliminar
                </span>
            )}
        </motion.div>
    )
}

// ------------------------- Elements General
function Input(
    {
        placeholder, typeInput = 'text', defaultValue = '',
        enable = true, name, value, functionChangeValue
    }
        :
        {
            placeholder: string, typeInput?: string, defaultValue?: string,
            enable?: boolean, name: string, value?: string | number,
            functionChangeValue?: (e: React.ChangeEvent<HTMLInputElement>) => void
        }
): React.ReactNode {
    const enableClass = enable ? '' : 'pointer-events-none bg-gray-400';

    return (
        <input
            type={typeInput}
            placeholder={placeholder}

            name={name}
            {...(value !== undefined
                ? { value }         // modo controlado
                : { defaultValue }) // modo no controlado
            }
            className={`border border-gray-300 rounded p-2 grow w-[300px] ${enableClass}`}
            onChange={(e) => { functionChangeValue?.(e) }}
        />
    )
}