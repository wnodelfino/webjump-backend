import { Controller, Inject } from '@nestjs/common';
import { ICategoryService } from './interfaces/category.interface.service';

@Controller('category')
export class CategoryController {
  constructor(
    @Inject('categoryService')
    private readonly categoryService: ICategoryService,
  ) {}
}
