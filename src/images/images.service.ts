import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async findAll(): Promise<Image[]> {
    return await this.imageRepository.find({});
  }

  async findOne(id: string): Promise<Image> {
    const image = await this.imageRepository.findOne(id);
    if (!image) {
      throw new NotFoundException(`Image number ${id} not found`);
    }
    return image;
  }

  async create(createImageDto: CreateImageDto): Promise<void> {
    const image = this.imageRepository.create({ ...createImageDto });
    await this.imageRepository.save(image);
  }

  async update(id: string, updateImageDto: UpdateImageDto): Promise<void> {
    const image = await this.imageRepository.preload({
      id: +id,
      ...updateImageDto,
    });
    if (!image) {
      throw new NotFoundException(`Image number ${id} not found`);
    }
    await this.imageRepository.save(image);
  }

  async remove(id: string): Promise<void> {
    const image = await this.findOne(id);
    await this.imageRepository.remove(image);
  }
}
