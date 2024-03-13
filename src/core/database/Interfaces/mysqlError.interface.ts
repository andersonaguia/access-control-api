export interface MySqlDriverError {
  code: string;
  errno: number;
  sqlState: string;
  sqlMessage: string;
  sql: string;
}
