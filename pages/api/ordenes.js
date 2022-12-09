import { PrismaClient } from "@prisma/client";

async function Ordenes(req, res) {
    const prisma = new PrismaClient;

    if (req.method === 'POST') {
        const orden = await prisma.orden.create({
            data: {
                nombre: req.body.nombre,
                fecha: req.body.fecha,
                total: req.body.total,
                pedido: req.body.pedido,
            }
        });
        res.json(orden);
    }
}

export default Ordenes;