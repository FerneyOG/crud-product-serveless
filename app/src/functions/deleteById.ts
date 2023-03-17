import { ProductService } from '../services/ProductService';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 * Function to delete a product by id
 * @param event 
 * @returns 
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters?.id;
    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "id is required"
            })
        }
    }
    await ProductService.deleteProductById(id);
    return {
        statusCode: 204,
        body: 'Product deleted'
    }
}
