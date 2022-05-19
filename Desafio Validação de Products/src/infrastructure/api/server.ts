import { app } from "./express";
import dotenv from "dotenv";

// Pega variáveis de ambiente e de acordo com estas toma uma ação
dotenv.config();
const Port: number = Number(process.env.PORT) || 3000;

app.listen(Port, () => {
    console.log(`Server is listening on ${Port}`);
});

