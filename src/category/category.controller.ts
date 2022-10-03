import { Controller, Get } from '@nestjs/common'
import { GetCategoryListRO } from './category.interface'
import { CategoryService } from './category.service'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/list')
  async getCategoryList(): Promise<GetCategoryListRO[]> {
    return this.categoryService.getCategoryList()
  }
}
