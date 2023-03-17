import { dynamoClient } from "../dynamodb/DynamoClient";
import { Product } from '../models/Product';
import { generate } from 'short-uuid';


export class ProductService {

    static async getProducts(): Promise<Product[]> {
        try {
            const tableName = process.env.TABLE_NAME ?? ''
            const response = await dynamoClient.scan({
                TableName: tableName
            }).promise();

            return response.Items as Product[];
        } catch (error) {
            throw new Error("Error getting products: " + error);
        }
    }

    static async getProductById(id: string): Promise<Product> {
        try {
            const tableName = process.env.TABLE_NAME ?? ''
            const response = await dynamoClient.get({
                TableName: tableName,
                Key: {
                    id
                }
            }).promise();
            return response.Item as Product;
        } catch (error) {
            throw new Error("Error getting product by id: " + error);
        }
    }

    static async createProduct(product: Product): Promise<Product> {
        try {
            const tableName = process.env.TABLE_NAME ?? ''
            product.id = generate();
            await dynamoClient.put({
                TableName: tableName,
                Item: product
            }).promise();
            return product;
        } catch (error) {
            throw new Error("Error creating product: " + error);
        }
    }

    static async updateProductById(product: Product): Promise<Product> {
        try {
            const tableName = process.env.TABLE_NAME ?? ''
            await dynamoClient.update({
                TableName: tableName,
                Key: {
                    id: product.id
                },
                UpdateExpression: "set #title = :title, #Author = :Author, #Editorial = :Editorial",
                ExpressionAttributeNames: {
                    "#title": "title",
                    "#Author": "Author",
                    "#Editorial": "Editorial"
                },
                ExpressionAttributeValues: {
                    ":title": product.title,
                    ":Author": product.Author,
                    ":Editorial": product.Editorial
                }
            }).promise();
            return product;
        } catch (error) {
            throw new Error("Error updating product: " + error);
        }
    }

    static async deleteProductById(id: string): Promise<void> {
        try {
            const tableName = process.env.TABLE_NAME ?? ''
            await dynamoClient.delete({
                TableName: tableName,
                Key: {
                    id
                }
            }).promise();
        } catch (error) {
            throw new Error("Error deleting product: " + error);
        }
    }

}
