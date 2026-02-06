import dotenv from "dotenv";
dotenv.config();

export class AppConfig {
  private constructor(
    public readonly PORT: number,
    public readonly NODE_ENV: string,
    public readonly DB_HOST: string,
    public readonly DB_USER: string,
    public readonly DB_PASS: string,
    public readonly DB_NAME: string,
  ) {}

  public static parsePort(portEnv: string | undefined): number {
    const portNumber = portEnv ? Number(portEnv) : NaN;
    return isNaN(portNumber) || !portEnv ? 3000 : portNumber;
  }

  public static createConfig(): AppConfig {
    dotenv.config({ path: "../../.env" });
    const { PORT, NODE_ENV, DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

    const portNumber = AppConfig.parsePort(PORT);
    const nodeEnv = NODE_ENV ?? "";
    const dbHost = DB_HOST ?? "";
    const dbUser = DB_USER ?? "";
    const dbPass = DB_PASS ?? "";
    const dbName = DB_NAME ?? "";

    return new AppConfig(portNumber, nodeEnv, dbHost, dbUser, dbPass, dbName);
  }
}

export const config = AppConfig.createConfig();
