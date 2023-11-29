export class Producto {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public logo: string,
      public date_release: Date,
      public date_revision: Date
    ) {}
  }