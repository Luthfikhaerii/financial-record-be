export class CreateTransactionDto {
  bankId: number;
  categoryId: number;
  amount: number;
  description?: string;
  image?: string;
  date: string | Date;
}

export class UpdateTransactionDto {
  bankId?: number;
  categoryId?: number;
  amount?: number;
  description?: string;
  image?: string;
  date?: string | Date;
}
