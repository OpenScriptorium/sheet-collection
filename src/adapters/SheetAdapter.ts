import { RowMapper } from "../mappers/RowMapper";
import { SheetSource } from "../sources/SheetSource";

export class SheetAdapter {

  constructor(
    private readonly source: SheetSource
  ) { }

  findAll<T>(): T[] {
    const values = this.source.getValues();

    if (values.length === 0) {
      return [];
    }

    const [headerRow, ...rows] = values;

    const headers = headerRow.map(String);

    return rows.map(row =>
      RowMapper.toDocument<T>(
        headers,
        row
      )
    );
  }

  findById<T>(
    id: unknown,
    primaryKey = "id"
  ): T | null {
    return (
      this.findAll<Record<string, unknown>>()
        .find(
          document =>
            document[primaryKey] === id
        ) as T | undefined
    ) ?? null;
  }

  insert<T>(
    document: T
  ): void {
    const values = this.source.getValues();

    const record = document as Record<string, unknown>;

    if (this.source.getLastRow() === 0) {
      const headers = Object.keys(record);

      this.source.setValues([
        headers,
        RowMapper.toRow(
          document,
          headers
        )
      ]);

      return;
    }

    const headers = values[0].map(String);

    this.source.appendRow(
      RowMapper.toRow(
        document,
        headers
      )
    );
  }

  update<T>(
    id: unknown,
    primaryKey: string,
    document: Partial<T>
  ): boolean {

    const values = this.source.getValues();

    if (values.length === 0) {
      return false;
    }

    const [headerRow, ...rows] = values;

    const headers = headerRow.map(String);

    const rowIndex =
      rows.findIndex(row => {

        const current =
          RowMapper.toDocument<
            Record<string, unknown>
          >(
            headers,
            row
          );

        return current[primaryKey] === id;
      });

    if (rowIndex === -1) {
      return false;
    }

    const current =
      RowMapper.toDocument<
        Record<string, unknown>
      >(
        headers,
        rows[rowIndex]
      );

    const updated = {
      ...current,
      ...document
    };

    rows[rowIndex] =
      RowMapper.toRow(
        updated,
        headers
      );

    this.source.setValues([
      headers,
      ...rows
    ]);

    return true;
  }

  delete(
    id: unknown,
    primaryKey: string
  ): boolean {

    const values = this.source.getValues();

    if (values.length === 0) {
      return false;
    }

    const [headerRow, ...rows] = values;

    const headers = headerRow.map(String);

    const filtered =
      rows.filter(row => {

        const current =
          RowMapper.toDocument<
            Record<string, unknown>
          >(
            headers,
            row
          );

        return current[primaryKey] !== id;
      });


    if (filtered.length === rows.length) {
      return false;
    }

    this.source.setValues([
      headers,
      ...filtered
    ]);

    return true;
  }

}