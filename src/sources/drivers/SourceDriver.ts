import { SheetSource } from "../SheetSource";

export interface SourceDriver  {

  getSheet(name: string): SheetSource;

  getOrCreateSheet(name: string): SheetSource;

}