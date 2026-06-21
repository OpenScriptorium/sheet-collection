import { SheetAdapter } from "../adapters/SheetAdapter";
import { RowMapper } from "../mappers/RowMapper";
import { SheetSource } from "../sources/SheetSource";

type InsertDocument<T> = T extends { id: infer V }
  ? Omit<T, 'id'> & Partial<Pick<T, 'id'>>
  : T & Partial<Record<'id', unknown>>;

/**
 * @preserve
 * Represents a typed collection backed by a sheet.
 * Use this class to perform CRUD operations on a named collection.
 */
export class Collection<T> {

  private readonly adapter: SheetAdapter;

  constructor(
    source: SheetSource
  ) {
    this.adapter = new SheetAdapter(source);
  }

  /**
   * @preserve
   * Returns all documents in the collection.
   * @returns List of documents.
   */
  findAll(): T[] {
    return this.adapter.findAll<T>();
  }

  /**
   * @preserve
   * Finds a document by its primary key `id`.
   * @param id Identifier value.
   * @returns The found document or `null`.
   */
  findById(
    id: unknown
  ): T | null {
    return this.adapter.findById<T>(
      id
    );
  }

  /**
   * @preserve
   * Inserts a document into the collection.
   * @param document Document to insert.
   */
  insert(
    document: InsertDocument<T>
  ): void {
    this.adapter.insert(
      document
    );
  }

  /**
   * @preserve
   * Inserts multiple documents in a single operation.
   *
   * Automatically creates headers when needed,
   * preserves document order, and supports automatic
   * ID generation.
   *
   * @param documents List of documents to insert.
   */
  insertMany(
    documents: InsertDocument<T>[]
  ): void {
    this.adapter.insertMany(
      documents
    );
  }

  /**
   * @preserve
   * Updates an existing document by `id`.
   * @param id Document identifier.
   * @param document Fields to update.
   * @returns `true` if the document was updated.
   */
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

  /**
   * @preserve
   * Deletes an existing document by `id`.
   * @param id Document identifier.
   * @returns `true` if the document was deleted.
   */
  delete(
    id: unknown
  ): boolean {
    return this.adapter.delete(
      id,
      "id"
    );
  }

}