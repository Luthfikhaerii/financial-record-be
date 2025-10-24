import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(data: { category_name: string }) {
    return this.prisma.category.create({
      data,
    });
  }

  async getAllCategories() {
    return this.prisma.category.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async getOneCategory(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  async updateCategory(id: number, data: { category_name?: string }) {
    await this.getOneCategory(id); // validate if exists

    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: number) {
    await this.getOneCategory(id);

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
