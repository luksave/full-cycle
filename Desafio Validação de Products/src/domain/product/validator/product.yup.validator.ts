//esta classe é uma implementação concreta de um validador especifico para 

import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import * as yup from "yup";

//a entidade de cliente usando a biblioteca yup
export default class ProductYupValidator implements ValidatorInterface<Product>{

    validate(entity: Product): void {
        try{
            yup
            .object()
            .shape({
                id: yup.string().required("Id is required"), 
                name: yup.string().required("Name is required"),
                price: yup.number().required("Price is required"),
                priceP: yup.number().positive("Price must be greater than zero"),

            })
            .validateSync(
                {
                    id: entity.id,
                    name: entity.name,
                    price: entity.price,
                    priceP: entity.price,
                }, 
                {
                    abortEarly: false,
                }
            );
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach((error) => {
                entity.notification.addError({
                    context: "product", 
                    message: error,
                });   
            })
        }
    }
}