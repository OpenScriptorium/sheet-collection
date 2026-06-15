import { SourceType } from "../types/SourceType";
import { ConnectionConfigProperties } from "./ConnectionConfigProperties";

export interface ConnectionConfig {
  source: SourceType;
  properties?: ConnectionConfigProperties;
}