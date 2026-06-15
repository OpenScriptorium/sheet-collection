import { ConnectionConfig } from "../interfaces/ConnectionConfig";
import { SourceDriver } from "../sources/drivers/SourceDriver";
import { SheetSource } from "../sources/SheetSource";
import { Collection } from "./Collection";
import { Connection } from "./Connection";

/**
 * Ponto de entrada principal da biblioteca.
 *
 * Permite conectar diferentes fontes de dados
 * (Google Sheets, memória, etc.) e manipular
 * coleções tipadas de documentos.
 *
 * @example
 * const db = SheetDB.connect({
 *   source: 'google',
 *   properties: {
 *     spreadsheetId: 'abc123'
 *   }
 * });
 *
 * const users =
 *   db.collection<User>('users');
 */
export class SheetDB {
  private constructor(
    private readonly driver: SourceDriver
  ) { }

  /**
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
   * Obtém uma coleção tipada.
   *
   * Caso a coleção não exista,
   * ela será criada automaticamente.
   *
   * @typeParam T Tipo dos documentos armazenados.
   * @param name Nome da coleção.
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
   */
  getOrCreateSheet(
    name: string
  ): SheetSource {
    return this.driver.getOrCreateSheet(name);
  }
}