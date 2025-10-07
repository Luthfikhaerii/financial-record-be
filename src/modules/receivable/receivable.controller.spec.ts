import { Test, TestingModule } from '@nestjs/testing';
import { ReceivableController } from './receivable.controller';

describe('ReceivableController', () => {
  let controller: ReceivableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceivableController],
    }).compile();

    controller = module.get<ReceivableController>(ReceivableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
