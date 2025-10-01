import { motion } from 'motion/react';
import { type DataJsonTypes } from '../../context/interfaceData.tsx';
import { useData } from '../../context/DataContext.tsx';
import Swal from 'sweetalert2';

interface imagesTypes {
    image: string;
    name: string;
}

interface dataDetailProps {
    status: boolean;
    images: imagesTypes[];
}

interface CardTypes extends DataJsonTypes {
    setDetail: React.Dispatch<React.SetStateAction<dataDetailProps>>;
}

// type for the arrayImages.
interface arrayImagesTypes {
    image: string;
    name: string;
}

export default function Card({
    cliente,
    orden,
    productos,
    total = {
        monto: 5000,
        moneda: 'USD'
    },
    accion,
    setDetail
}: CardTypes) {
    const arrayImages: arrayImagesTypes[] = [];
    productos?.map((product) => {
        arrayImages.push(
            {
                image: product.imagenes,
                name: product.producto ?? ''
            }
        )
    })

    return (
        <motion.article className="max-w-[350px] w-full bg-white rounded-2xl shadow-lg p-5 text-gray-800 overflow-hidden"
            initial={{ width: 0, opacity: 0, scale: 0 }}
            animate={{ width: 'auto', opacity: 1, scale: 1 }}
            exit={{ width: 0, opacity: 0, scale: 0 }}
        >
            <Header name={cliente?.nombre} status={cliente?.estado} dateLarge={orden?.fecha} dateShort={orden?.hora} IdOrder={orden?.id_orden}></Header>

            <hr className="mb-3 border-gray-200" />

            <Table dataObject={productos}></Table>

            <hr className="mb-4 border-gray-200" />

            {/* Total */}
            <div className="flex items-center justify-between mb-4">
                <div className="text-base font-semibold">Total:</div>
                <div className="text-xl font-bold">${total?.monto?.toLocaleString()} {total?.moneda}</div>
            </div>

            <FooterCard status={cliente?.estado} IdOrden={orden?.id_orden} setDetail={setDetail} accion={accion} images={arrayImages}></FooterCard>
        </motion.article>
    )
};

// ---------- Header CARD
type HeaderProps = {
    name?: string;
    status?: string;
    dateLarge?: string;
    dateShort?: string;
    IdOrder?: string;
};

function Header({
    name = "Maria Merdeces",
    status = "Completo",
    dateLarge = "2025-09-03",
    dateShort = "8:50 PM",
    IdOrder = "A3B2"
}: HeaderProps) {
    {/* Header */ }
    const WordInitial = name?.slice(0, 1);

    let clasStatusBg = '';
    let clasStatusText = '';

    if (status == 'Pendiente') {
        clasStatusBg = 'bg-yellow-100 text-yellow-800';
        clasStatusText = 'bg-yellow-500';
    } else if (status == 'Cancelado') {
        clasStatusBg = 'bg-red-100 text-red-800';
        clasStatusText = 'bg-red-500';
    } else {
        clasStatusBg = 'bg-green-100 text-green-800';
        clasStatusText = 'bg-green-500';
    }

    return (
        <header className="w-full h-auto mb-4">
            <div className="flex items-start justify-between gap-3 mb-1">
                <section className="flex items-center gap-3">
                    <span className={`text-white rounded p-2 px-3 ${clasStatusText}`}> {WordInitial} </span>
                    <div>
                        <h3 className="text-lg font-bold leading-tight"> {name} </h3>
                    </div>
                </section>

                <section className="flex flex-col items-end gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${clasStatusBg}`}>
                        <svg className="w-3.5 h-3.5 mr-2" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {status}
                    </span>
                    <span className="text-sm font-semibold">{dateShort}</span>
                </section>
            </div>

            <p className="text-sm text-gray-500">ID orden:{IdOrder} · {dateLarge}</p>
        </header>
    )
}

// --------------- Info of the card
interface Producto {
    id: number | undefined;
    producto: string | undefined;
    unidad: number | undefined;
    precio: number | undefined;
    "moneda"?: string | undefined,
    "imagenes"?: string
}

interface TableProps {
    dataObject?: Producto[] | undefined;
}

function Table({
    dataObject = [
        {
            id: 1,
            producto: "Cabello de rapuncel",
            unidad: 7,
            precio: 500
        }
    ]
}: TableProps) {
    {/* Table */ }
    return (
        <div className="overflow-x-auto mb-3 h-auto max-h-60 min-h-60 overflow-y-auto">
            <table className="w-full text-sm text-gray-700">
                <thead className="text-gray-600">
                    <tr>
                        <th className="text-left pr-2 w-1/12">Uds</th>
                        <th className="text-left pr-2 w-8/12">Productos</th>
                        <th className="text-right w-3/12">Precio</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {dataObject?.map((producto) => (
                        <tr key={producto.id}>
                            <td className="py-2">{producto.unidad}</td>
                            <td className="py-2">{producto.producto}</td>
                            <td className="py-2 text-right">{producto.precio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

// -------------- Footer of the card
function FooterCard({ status = 'Completo', setDetail, images, accion, IdOrden }: {
    status?: string,
    setDetail: React.Dispatch<React.SetStateAction<dataDetailProps>>,
    images: arrayImagesTypes[],
    accion: string,
    IdOrden: string | undefined;
}) {
    {/* Footer */ }
    let clasStatus = '';

    if (status == 'Pendiente') {
        clasStatus = 'bg-yellow-700 hover:bg-yellow-800 text-white';
    } else {
        clasStatus = 'bg-green-700 hover:bg-green-800 text-gray pointer-events-none';
    }

    function handleShowDetail(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        setDetail((prev) => {
            const Copyprev = {
                images: { ...prev.images },
                status: prev.status
            };

            Copyprev.images = images;
            Copyprev.status = true;

            return Copyprev;
        })
    }

    // action of complete the pay or no
    const { setData } = useData();
    function handlePay(e: React.MouseEvent<HTMLButtonElement>, status: string) {
        e.preventDefault();

        if (status.toLowerCase() == 'pendiente') {
            desitionPay(setData, (IdOrden ?? ''));
        }
    }

    return (
        <div className="flex items-center justify-between gap-3" >
            {
                status != 'Cancelado' ?
                    (<ButtonPending clasStatus={clasStatus} accion={accion} handlePay={handlePay} status={status} handleShowDetail={handleShowDetail}></ButtonPending>) : (<ButtonCancel idOrden={IdOrden}></ButtonCancel>)
            }
        </div>
    )
}

// -------- buttonsFooter
type buttonsProsGeneral = {
    clasStatus: string;
    accion?: string;
}

type buttonPending = buttonsProsGeneral & {
    handleShowDetail: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handlePay: (e: React.MouseEvent<HTMLButtonElement>, status: string) => void;
    status: string;
};

function ButtonPending({ handleShowDetail, handlePay, clasStatus, accion, status }: buttonPending) {
    return (
        <>
            <button className="px-5 py-3 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition transform active:scale-95 grow" type="button"
                onClick={(e) => { handleShowDetail(e) }}
            >
                Mas detalles
            </button>

            <button className={`px-5 py-3 rounded-lg font-semibold transition transform active:scale-95 grow ${clasStatus}`} type="button" onClick={(e) => { handlePay(e, status) }}>
                {accion}
            </button>
        </>
    )
}


function ButtonCancel({ idOrden }: { idOrden: string | undefined }) {
    const { setData } = useData();
    function handleDeleteProduct() {
        Swal.fire({
            title: "¿Deseas eliminar este registro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminalo"
        }).then((result) => {
            if (result.isConfirmed) {
                setData((prev) => {
                    if (prev) {
                        const copyPrev = [...prev];
                        const positionElement = copyPrev.findIndex((item) => item.orden?.id_orden == idOrden);
                        copyPrev.splice(positionElement, 1);

                        return copyPrev;
                    }
                })

                Swal.fire({
                    text: 'El registro se eliminó correctamente.',
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    text: 'Acción cancelada',
                    icon: 'info'
                });
            }
        });


    }

    return (
        <button className={`px-5 py-3 rounded-lg font-semibold transition transform active:scale-95 grow bg-red-700 hover:bg-red-800 text-white`} type="button" onClick={handleDeleteProduct}>
            Eliminar
        </button>
    )
}

// ---- funtion of pay
function desitionPay(setData: React.Dispatch<React.SetStateAction<DataJsonTypes[] | undefined>>, IdOrden: string) {
    Swal.fire({
        title: "¿Qué deseas hacer con este pedido?",
        icon: "question",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "💳 Pago",
        denyButtonText: "❌ Cancelado",
        cancelButtonText: "↩️ Volver"
    }).then((result) => {
        if (result.isConfirmed) {
            setData((prev) => {
                const copyPrev = [...(prev ?? [])];
                copyPrev.map((item) => {
                    if (item.orden?.id_orden?.toLocaleLowerCase() === IdOrden.toLocaleLowerCase()) {
                        if (item.cliente) {
                            item.cliente.estado = 'Completo';
                            item.accion = 'Pago';
                        }
                    }
                })
                
                return copyPrev;
            })

            Swal.fire({
                title: "¡Pedido completado!",
                text: "El pago fue registrado con éxito.",
                icon: "success",
                confirmButtonText: "👌 Entendido"
            });
        } else if (result.isDenied) {
            setData((prev) => {
                const copyPrev = [...(prev ?? [])];
                copyPrev.map((item) => {
                    if (item.orden?.id_orden?.toLocaleLowerCase() === IdOrden.toLocaleLowerCase()) {
                        if (item.cliente) {
                            item.cliente.estado = 'Cancelado';
                        }
                    }
                })

                return copyPrev;
            })

            Swal.fire({
                title: "Pedido cancelado",
                text: "Este pedido ha sido marcado como cancelado.",
                icon: "error",
                confirmButtonText: "🚫 Aceptar"
            });
        } else {
            Swal.fire({
                title: "Acción cancelada",
                text: "No se realizó ningún cambio en el pedido.",
                icon: "info",
                confirmButtonText: "👍 Entendido"
            });
        }
    });
}