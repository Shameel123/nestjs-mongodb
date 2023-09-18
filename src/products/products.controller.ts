import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async insertProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const product = await this.productsService.insertProduct(
      title,
      description,
      price,
    );
    return product;
  }

  @Get()
  async getProducts() {
    //write the code here
    return this.productsService.getProducts();
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    console.log({ prodId });
    await this.productsService.deleteProduct(prodId);
    return null;
  }

  @Put(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return null;
  }
}
