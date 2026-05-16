import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbEnv = configService.get<string>("dbEnv");
        const nodeEnv = configService.get<string>("nodeEnv");
        const isLocal = dbEnv === "local";

        const baseConfig = {
          type: "postgres" as const,
          autoLoadEntities: true,
          synchronize: nodeEnv !== "production",
          logging: nodeEnv === "development",
          retryAttempts: 5,
          retryDelay: 3000,
        };

        console.log("dbEnv: ", dbEnv);

        if (isLocal) {
          // Local DB config
          return {
            ...baseConfig,
            host: configService.get<string>("database.host"),
            port: configService.get<number>("database.port"),
            username: configService.get<string>("database.username"),
            password: configService.get<string>("database.password"),
            database: configService.get<string>("database.name"),
          };
        }

        // Online (Supabase) config
        return {
          ...baseConfig,
          url: configService.get<string>("database.url"),
          // ssl: {
          //   rejectUnauthorized: true,
          // },
          ssl:
            process.env.NODE_ENV === "production"
              ? { rejectUnauthorized: false }
              : false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
