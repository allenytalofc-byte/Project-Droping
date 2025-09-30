import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { DatabaseService } from '../../database/database.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, DatabaseService],
  exports: [ProductsService],
})
export class ProductsModule {}
