import { ConnectionConfigProperties } from "../../interfaces/ConnectionConfigProperties";
import { MemorySheetSource } from "../MemorySheetSource";
import { SheetSource } from "../SheetSource";
import { SourceDriver } from "./SourceDriver";

export class MemorySourceDriver implements SourceDriver {

  private sheets = new Map<
    string,
    MemorySheetSource
  >();

  constructor(properties?: ConnectionConfigProperties) { }

  getSheet(
    collectionName: string
  ): SheetSource {
    const sheet = this.sheets.get(collectionName);

    if (!sheet) {
      throw new Error( `Sheet '${collectionName}' não encontrada.`);
    }

    return sheet;
  }

  getOrCreateSheet(
    collectionName: string
  ): SheetSource {
    let sheet = this.sheets.get(collectionName);

    if (!sheet) {
      sheet = new MemorySheetSource(collectionName);
      this.sheets.set(collectionName, sheet);
    }

    return sheet;
  }
}