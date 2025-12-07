import { AppDataSource } from '../database/data-source';
import { UserEntity } from '../users/entities/user.entity';
import { SellerEntity } from '../sellers/entities/seller.entity';
import { AdminEntity } from '../admins/entities/admin.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(UserEntity);
  const sellerRepo = AppDataSource.getRepository(SellerEntity);
  const adminRepo = AppDataSource.getRepository(AdminEntity);

  const hashedPassword = await bcrypt.hash('123456', 10);

  await userRepo.save({
    fullName: 'Test User',
    email: 'user@test.com',
    password: hashedPassword,
  });

  await sellerRepo.save({
    shopName: 'Test Shop',
    email: 'seller@test.com',
    password: hashedPassword,
  });

  await adminRepo.save({
    fullName: 'Super Admin',
    email: 'admin@test.com',
    password: hashedPassword,
  });

  console.log('SEED ISHLADI');
  process.exit(0);
}

seed();