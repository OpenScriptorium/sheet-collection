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
   * Retorna todos os documentos da coleção.
   * @returns Lista de documentos.
   */
  findAll(): T[] {
    return this.adapter.findAll<T>();
  }

  /**
   * @preserve
   * Busca um documento pelo valor da chave primária `id`.
   * @param id Valor do identificador.
   * @returns Documento encontrado ou `null`.
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
   * Insere um documento na coleção.
   * @param document Documento a ser inserido.
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
   * Insere múltiplos documentos em uma única operação.
   *
   * Cria cabeçalhos automaticamente quando necessário,
   * preserva a ordem dos documentos e suporta geração
   * automática de IDs.
   *
   * @param documents Lista de documentos a serem inseridos.
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
   * Atualiza um documento existente pelo `id`.
   * @param id Identificador do documento.
   * @param document Campos a serem atualizados.
   * @returns `true` se o documento foi atualizado.
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
   * Deleta um documento existente pelo `id`.
   * @param id Identificador do documento.
   * @returns `true` se o documento foi deletado.
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