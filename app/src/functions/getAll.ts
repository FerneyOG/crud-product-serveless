import { ProductService } from '../services/ProductService';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 * Function to get all products
 * @param event 
 * @returns 
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const products = await ProductService.getProducts();
    return {
        statusCode: 200,
        body: JSON.stringify({
            items: products
        })
    }
}
