import { SheetAdapter } from "../adapters/SheetAdapter";
import { RowMapper } from "../mappers/RowMapper";
import { SheetSource } from "../sources/SheetSource";

export class Collection<T> {

  private readonly adapter: SheetAdapter;

  constructor(
    source: SheetSource
  ) {
    this.adapter = new SheetAdapter(source);
  }

  findAll(): T[] {
    return this.adapter.findAll<T>();
  }

  findById(
    id: unknown
  ): T | null {
    return this.adapter.findById<T>(
      id
    );
  }

  insert(
    document: T
  ): void {
    this.adapter.insert(
      document
    );
  }

  update(
    id: unknown,
    document: Partial<T>
  ): boolean {
    return this.adapter.update(
      id,
      "id",
      document
    );
  }

  delete(
    id: unknown
  ): boolean {
    return this.adapter.delete(
      id,
      "id"
    );
  }

}