export interface DatabaseConfiguration {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
export interface Configuration {
  environment?: string;
  application?: string;
  database: DatabaseConfiguration;
}

export interface CommonConfiguration { apiPort: number; }