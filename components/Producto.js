import Image from "next/image";
import {formatearDinero} from "../helpers";
import useQuiosco from "../hooks/useQuiosco";
function Producto({producto}) {
    const { nombre, imagen, precio } = producto;
    const { handleSetProducto, handleChangeModal } =useQuiosco();

    return (
        <div className={"broder p-3"}>
            <Image
                src={`/assets/img/${imagen}.jpg`}
                alt={`Imagen ${nombre}`}
                width={400}
                height={500}
            />
            <div className={"p-5"}>
                <h3 className={"text-2xl font-bold"}>{nombre}</h3>
                <p className={"mt-5 font-black text-4xl text-amber-500"}>
                    { formatearDinero(precio) }
                </p>
                <button
                    type={"button"}
                    className={"bg-indigo-600 hover:bg-indigo-800 text-white w-full uppercase font-bold mt-5 p-3"}
                    onClick={() => {
                        handleChangeModal();
                        handleSetProducto(producto);
                    }}
                >
                    Agregar
                </button>
            </div>
        </div>
    );
}

export default Producto;