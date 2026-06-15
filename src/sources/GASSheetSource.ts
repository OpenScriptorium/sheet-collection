import { SheetSource } from "./SheetSource";

/**
 * 
 * Google App Script
 * 
 */
export class GASSheetSource implements SheetSource {

    constructor(
        private readonly sheet: GoogleAppsScript.Spreadsheet.Sheet
    ) { }

    getName(): string {
        return this.sheet.getName();
    }

    getValues(): unknown[][] {
        return this.sheet
            .getDataRange()
            .getValues()
    }

    appendRow(values: unknown[]): void {
        this.sheet.appendRow(values);
    }

    setValues(values: unknown[][]): void {
        const newRows = values.length;
        const newColumns = values[0]?.length ?? 0;

        const currentRows = this.sheet.getLastRow();
        const currentColumns = this.sheet.getLastColumn();

        if (newRows > 0) {
            this.sheet
                .getRange(1, 1, newRows, newColumns)
                .setValues(values);
        }

        if (currentRows > newRows) {
            this.sheet
                .getRange(
                    newRows + 1,
                    1,
                    currentRows - newRows,
                    Math.max(currentColumns, newColumns)
                )
                .clearContent();
        }
    }

    clear(): void {
        this.sheet.clear();
    }

    getLastRow(): number {
        return this.sheet.getLastRow();
    }

    getLastColumn(): number {
        return this.sheet.getLastColumn();
    }
}