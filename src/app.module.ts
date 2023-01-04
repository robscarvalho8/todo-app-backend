import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './app/todo/todo.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.forRoot()],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: +configService.get('POSTGRES_PORT'),
                database: configService.get('POSTGRES_DATABASE'),
                username: configService.get('POSTGRES_USERNAME'),
                password: configService.get('POSTGRES_PASSWORD'),
                entities: [__dirname + '/**/*.entity{.js,.ts}'],
                synchronize: true, // Not Recomended in Production
            }),
            inject: [ConfigService],
        }),
        TodoModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
