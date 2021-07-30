import { IBaseRepository } from './base.interface.repository';
import {
  DeepPartial,
  DeleteResult,
  FindConditions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import Pagination from '../../shared/specification/pagination/Pagination';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  private entity: Repository<T>;

  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  async find(): Promise<T[]> {
    return await this.entity.find();
  }

  async findById(id: number): Promise<T> {
    return await this.entity.findOne(id);
  }

  async insert(payload: DeepPartial<T>): Promise<T> {
    const object = await this.entity.create(payload);
    await this.entity.insert(object);
    return object;
  }

  async update(
    id: number,
    payload: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return await this.entity.update(id, payload);
  }

  async softDelete(id: number): Promise<UpdateResult> {
    return await this.entity.softDelete(id);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.entity.delete(id);
  }

  async findOne(where: FindConditions<T>): Promise<T> {
    return await this.entity.findOne({ where });
  }

  async findMany(
    where: FindConditions<T>,
    order?: {
      [P in EntityFieldsNames<T>]?: 'ASC' | 'DESC';
    },
  ): Promise<T[]> {
    return await this.entity.find({ where, order });
  }

  async findWithPagination(
    pageable: Pagination,
    where?: FindConditions<T>,
    order?: {
      [P in EntityFieldsNames<T>]?: 'ASC' | 'DESC';
    },
    withDeleted = false,
  ): Promise<[T[], number]> {
    return await this.entity.findAndCount({
      take: pageable.paginate().take,
      skip: pageable.paginate().skip,
      withDeleted,
      order,
      where,
    });
  }
}
