const formatearDinero = cantidad => (
    cantidad.toLocaleString('es-ES', {
        style: "currency",
        currency: "USD"
    })
);

export {
    formatearDinero,
}