import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ProductService } from '../services/ProductService';
import { Product } from '../models/Product';

/**
 * Function to update a product by id
 * @param event 
 * @returns 
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const updatedProduct: Product = JSON.parse(event.body as string);
    const product = await ProductService.updateProductById(updatedProduct);
    return {
        statusCode: 200,
        body: JSON.stringify({
            item: product
        })
    }
}
