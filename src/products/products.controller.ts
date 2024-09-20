import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma, Product } from '@prisma/client'; 

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() body: Prisma.ProductCreateInput): Promise<Product> {
    return this.productsService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: Prisma.ProductUpdateInput): Promise<Product> {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Product> {
    return this.productsService.remove(id);
  }
}
