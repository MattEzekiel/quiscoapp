import Layout from "../layout/Layout";
import useQuiosco from "../hooks/useQuiosco";
import {useCallback, useEffect} from "react";
import {formatearDinero} from "../helpers";

function Total() {
    const { pedido, nombre, setNombre, crearOrden, total } = useQuiosco();
    
    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3;
    }, [pedido, nombre]);

    useEffect(() => {
        comprobarPedido();
    }, [comprobarPedido, pedido]);

    return (
        <Layout
            pagina={"Total y confirmar pedido"}
        >
            <h1 className={"text-4xl font-black"}>Total</h1>
            <p className={"text-2xl my-10"}>Confirmar pedido</p>
            <form
                onSubmit={crearOrden}
            >
                <div>
                    <label
                        htmlFor="nombre"
                        className={"block uppercase text-slate-800 font-bold text-xl"}
                    >Nombre</label>
                    <input
                        type="text"
                        name={"nombre"}
                        id={"nombre"}
                        placeholder={"Ingrese su nombre"}
                        className={"bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"}
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className={"mt-10"}>
                    <p className={"text-2xl"}>Total a pagar <span className={"font-bold"}>{formatearDinero(total)}</span></p>
                </div>
                <div className={"mt-5"}>
                    <input
                        type="submit"
                        value={"confirmar pedido"}
                        className={`w-full lg:w-auto px-5 py-2 rounded bg-indigo-600 font-medium text-white text-center uppercase ${comprobarPedido() ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>
        </Layout>
    );
}

export default Total;