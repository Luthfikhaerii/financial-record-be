import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { BankModule } from './modules/bank/bank.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { DebtModule } from './modules/debt/debt.module';
import { ReceivableModule } from './modules/receivable/receivable.module';
import { CategoryModule } from './modules/category/category.module';
import { AuthModule } from './auth/auth.module';
import { AuthModule } from './module/auth/auth.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, BankModule, TransactionModule, DebtModule, ReceivableModule, CategoryModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
