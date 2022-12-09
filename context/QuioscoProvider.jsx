import {createContext, useEffect, useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import categoria from "../components/Categoria";

const QuioscoContext = createContext(null);

const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [paso, setPaso] = useState(1);
    const [nombre, setNombre] = useState('');
    const [total, setTotal] = useState(0);
    const router = useRouter();

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias');
        setCategorias(data);
    }

    useEffect(() => {
       obtenerCategorias();
    }, []);

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias]);

    const handleClickCategoria = id => {
        const categoria = categorias.filter( cat => cat.id === id );
        setCategoriaActual(categoria[0]);
        if (router.pathname !== '/') {
            router.push('/');
        }
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal);
    }

    const handleAgregarPedido = ({categoriaID, ...producto}) => {
        if (pedido.some(productoState => productoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState);

            setPedido(pedidoActualizado);

            toast.success("Guardado correctamente");

        } else {
            setPedido([...pedido, producto]);
            toast.success("Agregado al pedido");
        }

        setModal(false);
    }

    const handleChangePaso = paso => {
        setPaso(paso);
    }

    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id);
        setProducto(productoActualizar[0]);
        setModal(true);
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id);
        setPedido(pedidoActualizado);
        toast.success("Producto quitado");
    }

    const crearOrden = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()});

            setCategoriaActual(categoria[0]);
            setPedido([]);
            setNombre('');
            setTotal(0);

            toast.success("Su pedido ha sido realizado exitosamente");

            setTimeout(() => {
                router.push('/');
            },3000)

        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0);
        setTotal(nuevoTotal);

    }, [pedido]);

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                paso,
                handleChangePaso,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                crearOrden,
                total
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext;