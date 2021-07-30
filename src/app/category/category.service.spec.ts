import { CategoryFakeRepository } from '../../repositories/fakes/category.fake.repository';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: CategoryFakeRepository;

  beforeEach(async () => {
    repository = new CategoryFakeRepository();
    service = new CategoryService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
