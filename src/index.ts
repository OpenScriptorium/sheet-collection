import { SheetDB } from './core/SheetDB';
import { ConnectionConfig } from './interfaces/ConnectionConfig';

const globalScope = typeof globalThis !== "undefined" ? globalThis : this;

/**
 * @preserve
 * SheetDB constructor available in Apps Script.
 */
(globalScope as any).SheetDB = SheetDB;

/**
 * @preserve
 * Connect to a SheetDB source from Google Apps Script.
 * @param {ConnectionConfig} config Connection configuration.
 * @returns {SheetDB} Connected SheetDB instance.
 */
(globalScope as any).connect = (config: ConnectionConfig) => SheetDB.connect(config);