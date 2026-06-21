import { ConnectionConfig } from "../interfaces/ConnectionConfig";
import { SourceDriver } from "../sources/drivers/SourceDriver";
import { SheetSource } from "../sources/SheetSource";
import { Collection } from "./Collection";
import { Connection } from "./Connection";

/**
 * @preserve
 * SheetDB is the main entrypoint for connecting to a storage source.
 * It exposes a typed collection API over Google Sheets and memory drivers.
 */
export class SheetDB {
  private constructor(
    private readonly driver: SourceDriver
  ) { }

  /**
   * @preserve
   * Creates a connection to a data source.
   *
   * @param config Connection configuration.
   * @returns Connected database instance.
   *
   * @example
   * const db = SheetDB.connect({
   *   source: 'memory'
   * });
   */
  static connect(
    config: ConnectionConfig
  ): SheetDB {
    const conn = new Connection(config);

    return new SheetDB(
      conn.connect()
    )
  }

  /**
   * @preserve
   * Gets a typed collection.
   *
   * If the collection does not exist,
   * it is created automatically.
   *
   * @typeParam T Type of stored documents.
   * @param name Collection name.
   * @returns Typed collection for the requested sheet.
   *
   * @example
   * interface User {
   *   id: string;
   *   name: string;
   * }
   *
   * const users =
   *   db.collection<User>('users');
   */
  collection<T>(
    name: string
  ): Collection<T> {
    const source = this.getOrCreateSheet(name);

    return new Collection<T>(
      source
    );
  }

  /**
   * Gets an existing sheet.
   *
   * Throws if the sheet is not found.
   *
   * @param name Sheet name.
   * @returns Sheet source.
   */
  getSheet(
    name: string
  ): SheetSource {
    return this.driver.getSheet(name);
  }

  /**
   * Gets an existing sheet or creates
   * a new one if it does not exist.
   *
   * @param name Sheet name.
   * @returns Sheet source.
   */
  getOrCreateSheet(
    name: string
  ): SheetSource {
    return this.driver.getOrCreateSheet(name);
  }
}