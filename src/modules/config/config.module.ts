import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { ResponseModule } from '../response/response.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [ResponseModule, UserModule],
    providers: [ConfigService],
    controllers: [ConfigController]
})
export class ConfigModule {}
