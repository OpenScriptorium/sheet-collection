import { SheetDB } from './core/SheetDB';
import { ConnectionConfig } from './interfaces/ConnectionConfig';

const globalScope = typeof globalThis !== "undefined" ? globalThis : this;
(globalScope as any).SheetDB = SheetDB;
(globalScope as any).connect = (config: ConnectionConfig) => SheetDB.connect(config);