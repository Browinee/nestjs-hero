export interface GetUserDto {
  page: number;
  limit?: number;
  username?: string;
  role?: number;
  gender?: number;
}
