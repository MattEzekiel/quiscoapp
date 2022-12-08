import Image from 'next/image';
import useQuiosco from "../hooks/useQuiosco";
function Categoria({categoria}) {
    const { categoriaActual, handleClickCategoria } = useQuiosco()
    const { nombre, icono, id } = categoria;
    return (
        <div className={`${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center gap-5 w-full border p-5 hover:bg-amber-400 transition`}>
            <Image
                width={70}
                height={70}
                src={`/assets/img/icono_${icono}.svg`}
                alt={"Imagen ícono"}
            />
            <button
                type={"button"}
                className={"text-2xl font-bold hover:cursor-pointer"}
                onClick={() => handleClickCategoria(id)}
            >
                { nombre }
            </button>
        </div>
    );
}

export default Categoria;