import { useRouter } from "next/router";

const pasos = [
    { paso: 1, nombre: 'Menú', url: '/' },
    { paso: 2, nombre: 'Resumen', url: '/resumen' },
    { paso: 3, nombre: 'Total', url: '/total' },
]
function Nav() {
    const router = useRouter();

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
                                router.push(paso.url)
                            }}
                        >
                            {paso.nombre}
                        </button>
                    </li>
                )) }
            </ul>
        </nav>
    );
}

export default Nav;