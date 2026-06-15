import { ConnectionConfig } from "../interfaces/ConnectionConfig";
import { GASSourceDriver } from "../sources/drivers/GASSourceDriver";
import { MemorySourceDriver } from "../sources/drivers/MemorySourceDriver";
import { SourceDriver } from "../sources/drivers/SourceDriver";

export class Connection {

  private readonly DRIVERS = {
    google: GASSourceDriver,
    memory: MemorySourceDriver
  };

  constructor(private readonly config: ConnectionConfig) {}
  
  connect(): SourceDriver {
    const Driver = this.DRIVERS[this.config.source];

    if (!Driver) {
      throw new Error(`Driver '${this.config.source}' não registrado.`);
    }

    return new Driver(this.config.properties);
  }

}