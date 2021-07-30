import { Category } from '../../database/models/category.entity';
import { IBaseRepository } from '../base/base.interface.repository';

export interface ICategoryRepository extends IBaseRepository<Category> {}
