export class RowMapper {

  static toDocument<T>(
    headers: string[],
    row: unknown[]
  ): T {
    const document =
      {} as Record<string, unknown>;

    headers.forEach((header, index) => {
      document[header] = row[index];
    });

    return document as T;
  }

  static toRow<T>(
    document: T,
    headers: string[]
  ): unknown[] {
    return headers.map(
      header => (document as Record<string, unknown>)[header]
    );
  }
}