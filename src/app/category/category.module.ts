import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from '../../database/models/category.entity';
import { CategoryRepository } from '../../repositories/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [
    {
      provide: 'categoryRepository',
      useClass: CategoryRepository,
    },
    {
      provide: 'categoryService',
      useClass: CategoryService,
    },
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
