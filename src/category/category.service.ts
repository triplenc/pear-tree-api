import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from '../entities'
import { GetCategoryListRO } from './category.interface'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategoryList(): Promise<GetCategoryListRO[]> {
    const categories = await this.categoryRepository.find({
      select: ['id', 'code', 'name', 'imageUrl'],
      order: {
        priority: 'DESC',
      },
    })

    return categories
  }
}
