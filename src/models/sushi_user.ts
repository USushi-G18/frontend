export enum SushiUserType {
  Admin = "Admin",
  Client = "Client",
  Employee = "Employee",
}

export function sushiUserName(sushiUser: SushiUserType): string {
  switch (sushiUser) {
    case SushiUserType.Admin:
      return "Admin";
    case SushiUserType.Client:
      return "Cliente";
    case SushiUserType.Employee:
      return "Dipendente";
  }
}
