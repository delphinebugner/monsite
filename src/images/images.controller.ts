import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  async findAll(): Promise<Image[]> {
    return await this.imagesService.findAll();
  }

  @Post()
  create(@Body() createImageDto: CreateImageDto): Promise<void> {
    return this.imagesService.create(createImageDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateImageDto: UpdateImageDto,
  ): Promise<void> {
    return this.imagesService.update(id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.imagesService.remove(id);
  }
}
