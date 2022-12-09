import { useRouter } from "next/router";
import useQuiosco from "../hooks/useQuiosco";

const pasos = [
    { paso: 1, nombre: 'Menú', url: '/' },
    { paso: 2, nombre: 'Resumen', url: '/resumen' },
    { paso: 3, nombre: 'Total', url: '/total' },
]
function Nav() {
    const router = useRouter();
    const { paso, handleChangePaso } = useQuiosco();

    const calcularProgreso = () => {
        let valor;

        switch (true) {
            case router.pathname === '/':
                valor = (1 / 3) * 100;
                break;
            case router.pathname === '/resumen':
                valor = (2 / 3) * 100;
                break;
            case router.pathname === '/total':
                valor = 100;
                break;
            default:
                valor = 0;
                break;
        }

        return valor;
    }

    return (
        <nav>
            <ul className={"flex justify-between items-center mb-10"}>
                { pasos.map(paso => (
                    <li
                        key={paso.paso}
                    >
                        <button
                            type={"button"}
                            className={"text-2xl font-bold"}
                            onClick={() => {
                                router.push(paso.url);
                                handleChangePaso(paso.paso);
                            }}
                        >
                            {paso.nombre}
                        </button>
                    </li>
                )) }
            </ul>
            <div className={"bg-gray-100 mb-10"}>
                <span className={"rounded-full bg-amber-500 leading-none h-2 text-center text-white block"} style={{ width: `${calcularProgreso()}%`, fontSize: 0 }}>Progreso {calcularProgreso()}%</span>
            </div>
        </nav>
    );
}

export default Nav;