import { motion } from 'motion/react';

interface imagesTypes {
    image: string;
    name: string;
}

interface imagesTypes {
  image: string;
  name: string;
}

interface dataDetailProps {
  status: boolean;
  images: imagesTypes[];
}

export default function DetailCard({ images, setDetail }: { 
    images: imagesTypes[],
    setDetail: React.Dispatch<React.SetStateAction<dataDetailProps>>
}) {
    return (
        <motion.section className="w-full h-[70vh] fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-7 rounded-lg max-w-[1000px] shadow-2xl overflow-y-auto"
            initial={{opacity: 0, scale: 0, filter: 'blur(10px)'}}
            animate={{opacity: 1, scale: 1, filter: 'blur(0px)'}}
            exit={{opacity: 0, scale: 0, filter: 'blur(10px)'}}
        >
            <HeaderDetail setDetail={setDetail}></HeaderDetail>

            <p className="text-2xl mb-5">Detalles de los productos:</p>

            <div className="w-full h-auto flex items-start gap-2.5 flex-wrap">
                {images.map((image, index) => (
                    <ItemDetail key={index} image={image.image} name={image.name}></ItemDetail>
                ))}
            </div>
        </motion.section>
    )
}

function ItemDetail({ image, name }: imagesTypes) {
    return (
        <article className="grow max-w-[300px] aspect-square rounded overflow-hidden relative">
            <img src={image} alt="Imagen del producto" className="w-full h-full bg-top object-cover" />

            <span className="absolute w-full h-auto p-2 bottom-0 left-0 rounded bg-black/50 text-white">{name}</span>
        </article>
    )
}

function HeaderDetail({setDetail}: {setDetail: React.Dispatch<React.SetStateAction<dataDetailProps>>}) {

    function handleCloseDetail(e: React.MouseEvent<HTMLSpanElement>) {
        e.preventDefault();

        setDetail((prev) => {
           const Copyprev = {
                images: {...prev.images},
                status: prev.status
            };
        
            Copyprev.status = false;

            return Copyprev;
        })
    }

    return (
        <div className="w-full h-auto flex items-center justify-between gap-3.5 flex-wrap mb-5">
            <p className="text-3xl flex items-center gap-2 font-semibold">
                <i className="fa-solid fa-circle-info"></i>
                Pedido: #A2B2
            </p>

            <span className="p-1 px-3 rounded bg-orange-500 text-white text-xl hover:bg-orange-600
                transition-transform active:bg-orange-700 duration-100
                hover:scale-110 active:scale-95 cursor-pointer"
                onClick={(e) => {handleCloseDetail(e)}}
            >
                <i className="fa-solid fa-xmark"></i>
            </span>
        </div>
    )
}