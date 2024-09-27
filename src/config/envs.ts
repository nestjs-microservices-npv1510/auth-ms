import { config } from 'dotenv';
config();
import * as joi from 'joi';

interface EnvVars {
  NATS_SERVERS: string[];
  MONGO_DATABASE_URL: string;

  JWT_SECRET_KEY: string;
  ACCESS_TOKEN_EXPIRES_IN: number;
}

const envsSchema = joi
  .object({
    MONGO_DATABASE_URL: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),

    JWT_SECRET_KEY: joi.string().required(),
    ACCESS_TOKEN_EXPIRES_IN: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env?.NATS_SERVERS.split(','),
  ACCESS_TOKEN_EXPIRES_IN: +process.env.ACCESS_TOKEN_EXPIRES_IN,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs: EnvVars = value;
