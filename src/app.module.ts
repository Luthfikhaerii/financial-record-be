import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { BankModule } from './modules/bank/bank.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { DebtModule } from './modules/debt/debt.module';
import { ReceivableModule } from './modules/receivable/receivable.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [UserModule, BankModule, TransactionModule, DebtModule, ReceivableModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
