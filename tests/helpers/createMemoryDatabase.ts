import { SheetDB } from "../../src/core/SheetDB";

export function createMemoryDatabase() {
  return SheetDB.connect({
    source: 'memory'
  });
}