export default class Pagination {
  page: number;
  size: number;

  constructor(private readonly pages, private readonly sizes) {
    this.page = pages > 0 ? pages : 1;
    this.size = sizes > 0 ? sizes : 10;
  }

  paginate() {
    this.page = Number(this.page);
    this.size = Number(this.size);

    if (isNaN(this.page) || isNaN(this.size)) {
      throw new Error('Erro ao carregar parametros de "page" ou "size".');
    }

    if (this.page <= 0) {
      this.page = 1;
    }

    return {
      skip: (this.page - 1) * this.size,
      take: this.size,
    };
  }
}
