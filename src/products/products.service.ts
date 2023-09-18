import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({ title, description, price });
    const result = await newProduct.save();
    console.log(result);
    return result;
  }
  async getProducts() {
    // WRite the code here to get the products
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async deleteProduct(prodId: string) {
    const product = await this.productModel.findOne({ _id: prodId }).exec();
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }

    await this.productModel.deleteOne({ _id: prodId }).exec();
  }

  async updateProduct(
    prodId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const updatedProduct = await this.productModel
      .findOne({ _id: prodId })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException('Could not find product.');
    }
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    updatedProduct.save();
  }
}
