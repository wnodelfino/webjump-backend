import { IBaseRepository } from './base.interface.repository';
import {
  DeepPartial,
  DeleteResult,
  FindConditions,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import Pagination from '../../shared/specification/pagination/Pagination';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';

export abstract class BaseFakeRepository<T> implements IBaseRepository<T> {
  private database: T[] | any = [];

  protected constructor(database: T[]) {
    this.database = database;
  }

  async find(): Promise<T[]> {
    return await new Promise((resolve) => resolve(this.database));
  }

  async findWithPagination(
    pageable: Pagination,
    where?: FindConditions<T>,
    order?: {
      [P in EntityFieldsNames<T>]?: 'ASC' | 'DESC';
    },
    withDeleted = false,
  ): Promise<[T[], number]> {
    return new Promise((resolve) => {
      const response: [T[], number] = [
        this.database.slice(pageable.paginate().skip, pageable.paginate().take),
        this.database.length,
      ];
      resolve(response);
    });
  }

  async findById(id: number): Promise<T> {
    return new Promise((resolve) => {
      resolve(this.database.find((t) => t['id'] === id));
    });
  }

  async findOne(where: FindConditions<T>): Promise<T> {
    return new Promise((resolve) => {
      const properties = Object.getOwnPropertyNames(where);
      resolve(
        this.database.find((t) =>
          properties.every((property) => t[property] === where[property]),
        ),
      );
    });
  }

  async findMany(where: FindConditions<T>): Promise<T[]> {
    return new Promise((resolve) => {
      const properties = Object.getOwnPropertyNames(where);
      resolve(
        this.database.filter((t) =>
          properties.every((property) => t[property] === where[property]),
        ),
      );
    });
  }

  async insert(payload: DeepPartial<T>): Promise<T> {
    return new Promise((resolve) => {
      const object = {
        id: this.database.length + 1,
        created_at: Date.now(),
        deleted_at: null,
        updated_at: null,
        ...payload,
      };
      this.database.push(object);
      resolve(this.database.find((t) => t.id === object.id));
    });
  }

  async update(
    id: number,
    payload: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return new Promise((resolve) => {
      const index = this.database.findIndex((entity) => entity['id'] === id);
      this.database[index] = {
        ...this.database[index],
        ...payload,
      };
      const affected = this.database.filter(
        (entity) => entity['id'] === id,
      ).length;

      const response = {
        affected,
      } as UpdateResult;

      resolve(response);
    });
  }

  async softDelete(id: number): Promise<UpdateResult> {
    return new Promise((resolve) => {
      const index = this.database.findIndex((entity) => entity['id'] === id);
      this.database[index].deleted_at = new Date();

      const affected = this.database.filter(
        (entity) => entity['id'] === id,
      ).length;

      const response = {
        affected,
      } as UpdateResult;

      resolve(response);
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    return new Promise((resolve) => {
      const index = this.database.findIndex((entity) => entity['id'] === id);
      this.database[index].deleted_at = new Date();

      const affected = this.database.filter(
        (entity) => entity['id'] === id,
      ).length;

      const response = {
        affected,
      } as DeleteResult;

      resolve(response);
    });
  }
}
