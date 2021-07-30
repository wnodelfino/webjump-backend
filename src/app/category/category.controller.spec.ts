import { CategoryFakeRepository } from '../../repositories/fakes/category.fake.repository';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;
  let categoryRepository: CategoryFakeRepository;

  beforeEach(async () => {
    categoryRepository = new CategoryFakeRepository();
    service = new CategoryService(categoryRepository);
    controller = new CategoryController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
