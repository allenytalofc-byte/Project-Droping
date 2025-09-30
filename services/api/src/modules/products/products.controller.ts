import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  async findAll(@Query() filters: any) {
    return this.productsService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter produto por ID' })
  async findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('supplier', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar novo produto' })
  async create(@Req() req: any, @Body() data: any) {
    return this.productsService.create(req.user.id, data);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('supplier', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar produto' })
  async update(@Param('id') id: string, @Req() req: any, @Body() data: any) {
    return this.productsService.update(id, req.user.id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('supplier', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Desativar produto' })
  async delete(@Param('id') id: string, @Req() req: any) {
    return this.productsService.delete(id, req.user.id);
  }
}
