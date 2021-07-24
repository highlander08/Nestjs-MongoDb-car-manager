// dto defini como os dados serao enviado ou que tipo de dados seram enviados
export class CarDto {
  // id somente leitura
  readonly id: number;
  readonly brand: string;
  readonly color: string;
  readonly model: string;
}
