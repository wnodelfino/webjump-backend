import Pagination from './Pagination';

export interface PageableParams<T> {
  /**
   * Resultado da consulta no typeOrm. (resultado da consulta junto com o count)
   */
  select: [any[], number];

  /**
   * Query Params com os parametros de paginação.
   */
  pageable: Pagination;
}

export class Page<T> {
  content: any[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;

  /**
   * Pagina.
   *
   * select: lista com [`resultado`, `count`]
   *
   * pageable: parametros de paginação (`page` e `size`)
   */
  constructor({ select, pageable }: PageableParams<T>) {
    const [content, count] = select;
    this.content = content;
    this.page = pageable.page;
    this.size = pageable.size;
    this.totalPages = Math.ceil(count / pageable.size);
    this.totalElements = count;
  }
}
