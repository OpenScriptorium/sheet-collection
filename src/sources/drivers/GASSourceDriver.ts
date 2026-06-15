import { ConnectionConfigProperties } from "../../interfaces/ConnectionConfigProperties";
import { GASSheetSource } from "../GASSheetSource";
import { SheetSource } from "../SheetSource";
import { SourceDriver } from "./SourceDriver";

/**
 * 
 * Google App Script
 * 
 */
export class GASSourceDriver implements SourceDriver {

  private spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;

  constructor(properties?: ConnectionConfigProperties) {
    if (!properties) {
      this.spreadsheet = this.getActiveSpreadsheet(); 
      return;
    }

    if (!properties.spreadsheetId) throw new Error("ID da Planilha não foi informado.");

    const spreadsheet = SpreadsheetApp.openById(properties.spreadsheetId);

    if (!spreadsheet) throw new Error("Planilha não foi encontrada.");

    this.spreadsheet = spreadsheet;
  }

  getSheet(
    collectionName: string
  ): SheetSource {
    let sheet = this.spreadsheet.getSheetByName(
        collectionName
    );

    if (!sheet) throw new Error("Aba informada não foi encontrada.");

    return new GASSheetSource(
      sheet
    );
  }

  getOrCreateSheet(
    collectionName: string
  ): SheetSource {
    const existing = this.spreadsheet.getSheetByName(
        collectionName
    );

    if (existing) return new GASSheetSource(existing);

    return new GASSheetSource(
      this.spreadsheet.insertSheet(collectionName)
    );
  }

  private getActiveSpreadsheet(): GoogleAppsScript.Spreadsheet.Spreadsheet {
    const active = SpreadsheetApp.getActiveSpreadsheet();

    if (!active) throw new Error("Nenhuma planilha ativa encontrada.");

    return active
  }
}