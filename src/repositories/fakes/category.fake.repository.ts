import { Injectable } from '@nestjs/common';
import { Category } from '../../database/models/category.entity';
import { ICategoryRepository } from '../interfaces/category.interface.repository';
import { BaseFakeRepository } from '../base/base.fake.repository';

@Injectable()
export class CategoryFakeRepository
  extends BaseFakeRepository<Category>
  implements ICategoryRepository
{
  private readonly _database: Category[];
  constructor() {
    const _database: Category[] = [];
    super(_database);
    this._database = _database;
  }
}
