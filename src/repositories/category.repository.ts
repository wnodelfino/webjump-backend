import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../database/models/category.entity';
import { BaseRepository } from './base/base.repository';
import { ICategoryRepository } from './interfaces/category.interface.repository';

@Injectable()
export class CategoryRepository
  extends BaseRepository<Category>
  implements ICategoryRepository
{
  constructor(
    @InjectRepository(Category)
    private readonly ormRepository: Repository<Category>,
  ) {
    super(ormRepository);
  }
}
