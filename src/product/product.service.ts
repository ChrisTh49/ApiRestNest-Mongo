import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product')
        private readonly productModel: Model<Product>
    ) { }

    async getProducts(): Promise<Product[]> {
        const allProducts = await this.productModel.find();
        return allProducts;
    };

    async getProduct(productId: string): Promise<Product> {
        const product = await this.productModel.findById(productId);
        return product;
    };

    async createProduct(createProductDTO: CreateProductDto): Promise<Product> {
        const newProduct = new this.productModel(createProductDTO);
        return await newProduct.save();
    }

    async deleteProduct(productId: string): Promise<Product> {
        return await this.productModel.findByIdAndDelete(productId);
    }

    async updateProduct(productId: string, createProductDTO: CreateProductDto): Promise<Product> {
        const product = await this.productModel.findByIdAndUpdate(productId, createProductDTO, { new: true });

        return product;
    }
}
