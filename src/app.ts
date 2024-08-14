import server from "./server";

const port = process.env.PORT_APP || 6500;

server.listen(port, () => {
    console.log(`REST API en el puerto ${port}`)
});