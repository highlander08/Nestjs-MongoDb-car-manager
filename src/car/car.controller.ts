import { CarService } from './car.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CarDto } from '../car/dto/car.dto';
@Controller('car')
export class CarController {
  // isntancia do serviço
  constructor(private carService: CarService) {}
  //endpoint
  @Get()
  public getCars() {
    return this.carService.getCars();
  }
  @Post()
  public postCar(@Body() car: CarDto) {
    return this.carService.postCar(car);
  }
  @Get(':id')
  public async getCarById(@Param('id') id: number) {
    const result = this.carService.getCarById(id);

    return result;
  }
  @Delete(':id')
  public async deleteCarById(@Param('id') id: number) {
    this.carService.deleteCarById(id);
    return 'arquivo deletado ❤';
  }
  @Put(':id')
  // para acessar a consulta/query voce precisa adicionar um decorator query/consulta, depois adiciona a query/consulta do decorator e depois voce pode definir seus paramentros de consulta/query, digamos que este sera o nome da variavel de consulta
  // ou pegar uma consulta = usa decorato query e defini o nome da consulta nesse cara é query
  public async putCarById(@Param('id') id: number, @Query() query) {
    //definir consulta do nome da propriedade
    const propertyName = query.property_name;
    //extrair valor do parametro de consulta
    const propertyValue = query.property_value;

    return this.carService.putCarById(id, propertyName, propertyValue);
  }
}
