import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Category } from 'src/database/models/category.entity';
import { ICategoryRepository } from '../../repositories/interfaces/category.interface.repository';
import { ICategoryService } from './interfaces/category.interface.service';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @Inject('categoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}
}
