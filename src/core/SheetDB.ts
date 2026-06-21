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
   * Cria uma conexão com uma fonte de dados.
   *
   * @param config Configuração da conexão.
   * @returns Instância do banco conectado.
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
   * Obtém uma coleção tipada.
   *
   * Caso a coleção não exista,
   * ela será criada automaticamente.
   *
   * @typeParam T Tipo dos documentos armazenados.
   * @param name Nome da coleção.
   * @returns Coleção tipada para a aba informada.
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
   * Obtém uma aba existente.
   *
   * Lança uma exceção caso a aba
   * não seja encontrada.
   *
   * @param name Nome da aba.
   * @returns Fonte de dados da aba.
   */
  getSheet(
    name: string
  ): SheetSource {
    return this.driver.getSheet(name);
  }

  /**
   * Obtém uma aba existente ou cria
   * uma nova caso ela não exista.
   *
   * @param name Nome da aba.
   * @returns Fonte de dados da aba.
   */
  getOrCreateSheet(
    name: string
  ): SheetSource {
    return this.driver.getOrCreateSheet(name);
  }
}