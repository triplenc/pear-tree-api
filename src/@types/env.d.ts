declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development'
    APP_PORT?: number
    RDS_HOST: string
    RDS_PORT: number
    RDS_USERNAME: string
    RDS_SCHEMA: string
    RDS_PASSWORD: string
  }
}
