import express, { Request, Response } from "express";

import ClientAdmFacadeFactory from "../../modules/cliente-adm/factory/client-adm.facade.factory";
import { AddClientFacadeInputDto } from "../../modules/cliente-adm/facade/client-adm.facade.interface";


export const clientsRoute = express.Router();

clientsRoute.post("/", async (request: Request, response: Response) => {
  const facade = ClientAdmFacadeFactory.create();

  try {
    const { id, name, email, document, street, number, complement, city, state, zipCode } = request.body;

    const clientDto: AddClientFacadeInputDto = {
        id,
        name,
        document,
        email,
        street,
        number,
        complement,
        city,
        state,
        zipCode,
    };


    const output = await facade.add(clientDto);
   
    response.status(201).send(output);
  } catch (error) {
    response.status(400).send(error);
  }
});
