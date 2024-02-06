type U = { [key: string]: any };

type ColumnType = "string" | "number" | "select";

type ColumnDef = {
  field: string;
  name: string;
  editable?: boolean;
  type?: ColumnType;
  selectOptions?: string[];
  // from actual value to displayed value
  valueGetter?: (v: any) => any;
  // from displayed value to actual value
  valueSetter?: (v: any) => any;
};

type TextPage = {
  title: string;
  info: string;
};

type Texts = {
  title: string;
  create: TextPage;
  update: TextPage;
  delete: TextPage & { confirm: string };
  confirm: string;
  cancel: string;
  search: string;
  empty: string;
  emptyFilter: string;
};
