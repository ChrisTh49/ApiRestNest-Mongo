import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto'
import { ProductService } from './product.service';
@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDto) {
        const newProduct = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Recived',
            product: newProduct
        });
    }

    @Get()
    async getAllProducts(@Res() res) {
        const allProducts = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json({
            product: allProducts
        });
    }

    @Get(':productId')
    async getProduct(@Res() res, @Param('productId') productID: string) {
        const product = await this.productService.getProduct(productID);
        if (!product) throw new NotFoundException('This product does not exist');

        return res.status(HttpStatus.OK).json({
            product: product
        });
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productId') productID: string) {
        const productDeleted = await this.productService.deleteProduct(productID);
        if (!productDeleted) throw new NotFoundException('This product does not exist');

        return res.status(HttpStatus.OK).json({
            message: 'Product deleted Succesfully',
            productDeleted
        });
    }

    @Put('/update')
    async updateProduct(@Res() res, @Query('productId') productID: string, @Body() createProductDTO: CreateProductDto) {
        const updatedProduct = await this.productService.updateProduct(productID, createProductDTO);
        if (!updatedProduct) throw new NotFoundException('This product does not exist');

        return res.status(HttpStatus.OK).json({
            product: updatedProduct
        });
    }

}
