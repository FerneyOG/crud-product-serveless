import { ProductService } from '../services/ProductService';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 * 
 * @param event Function to get product by id
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
    const product = await ProductService.getProductById(id);
    return {
        statusCode: 200,
        body: JSON.stringify({
            item: product
        })
    }
}
