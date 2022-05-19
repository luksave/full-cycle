import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import ProductYupValidator from "../validator/product.yup.validator";
import ProductFactory from "./product.factory";

export default class ProductValidatorFactory {
    static create():ValidatorInterface<ProductFactory>{
        return new ProductYupValidator();
    }

}