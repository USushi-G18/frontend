export enum CommandStatus {
  Ordered = "Ordered",
  Preparing = "Preparing",
  Prepared = "Prepared",
  Delivered = "Delivered",
}

export function nextCommandStatus(status: CommandStatus): CommandStatus {
  switch (status) {
    case CommandStatus.Ordered:
      return CommandStatus.Preparing;
    case CommandStatus.Preparing:
      return CommandStatus.Prepared;
    case CommandStatus.Prepared:
      return CommandStatus.Delivered;
    case CommandStatus.Delivered:
      return CommandStatus.Ordered;
  }
}

export function prevCommandStatus(status: CommandStatus): CommandStatus {
  switch (status) {
    case CommandStatus.Ordered:
      return CommandStatus.Delivered;
    case CommandStatus.Preparing:
      return CommandStatus.Ordered;
    case CommandStatus.Prepared:
      return CommandStatus.Preparing;
    case CommandStatus.Delivered:
      return CommandStatus.Prepared;
  }
}

export function commandStatusName(status: CommandStatus): string {
  switch (status) {
    case CommandStatus.Ordered:
      return "Ordinato";
    case CommandStatus.Preparing:
      return "In preparazione";
    case CommandStatus.Prepared:
      return "Preparato";
    case CommandStatus.Delivered:
      return "Consegnato";
  }
}

export type Command = {
  session_id: number;
  plate_id: number;
  at: Date;
  quantity: number;
  status: CommandStatus;
};
