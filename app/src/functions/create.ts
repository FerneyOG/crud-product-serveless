import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ProductService } from '../services/ProductService';
import { Product } from '../models/Product';

/**
 * Function to create a new product
 * @param event 
 * @returns 
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newProduct: Product = JSON.parse(event.body as string);
    const product = await ProductService.createProduct(newProduct);
    return {
        statusCode: 201,
        body: JSON.stringify({
            item: product
        })
    }
}
