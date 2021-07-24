import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICar } from './interfaces/car.interface';
import { CarDto } from './dto/car.dto';

const carProjections = {
  __v: false,
  _id: false,
}

@Injectable()
export class CarService {
  // injetar modelo de carro dentro do serviço
  constructor(@InjectModel('Car') private readonly carModel: Model<ICar>) {}
  //buscar todos os carros
  public async getCars(): Promise<CarDto[]> {
    const cars = await this.carModel.find({},carProjections).exec();
    if (!cars || !cars[0]) {
      throw new HttpException('Not found', 404);
    }
    return cars;
  }
  //  criar carro e mandar para o arrray
  public async postCar(newCar: CarDto) {
    const car = await new this.carModel(newCar);
    return car.save();
  }
  //buscar carro pelo oid
  public async getCarById(id: number): Promise<CarDto> {
    const car = await this.carModel.findOne({ id },carProjections).exec();
    if (!car) {
      throw new HttpException('Not found', 404);
    }
    return car;
  }

  // deleter carro
  public async deleteCarById(id: number): Promise<any> {
    const car = await  this.carModel.deleteOne({ id }).exec();
    if (car.deletedCount === 0) {
      throw new HttpException('Not found', 404);
    }
    return car;
  }
  // atualizar  um unico elemento que esta detro do array
  public async putCarById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<CarDto> {
    const car = await this.carModel
      .findOneAndUpdate({ id }, { [propertyName]: propertyValue })
      .exec();
    if (!car) {
      throw new HttpException('Not found', 404);
    }
    return car;
  }
}
