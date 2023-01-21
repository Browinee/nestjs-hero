import { SelectQueryBuilder } from 'typeorm';

export const genQuery = <T>(
  queryBuilder: SelectQueryBuilder<T>,
  obj: Record<string, unknown>,
) => {
  Object.keys(obj).forEach((key: string) => {
    if (obj[key]) {
      queryBuilder.andWhere(`${key}=:${key}`, { [key]: obj[key] });
    }
  });
};
