import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument } from './schema/product.schema';
import { uuid } from 'uuidv4';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly model: Model<ProductDocument>) { }

  async create(model: ProductDocument) {
    model.id = uuid();
    const product = new this.model(model);
    return await product.save();
  }

  async findAll() {
    return await this.model.find().exec();
  }

  async findOne(id: string) {
    return await this.model.findOne({ id: id }).exec();
  }

  async update(id: string, model: ProductDocument) {
    return await this.model.findOneAndUpdate({ id }, model);
  }

  async remove(id: string) {
    return await this.model.findOneAndDelete({ id });
  }
}
