// 列表项属性
export interface IListItemProps {
  avatar?: string;
  title: string;
  desc?: string;
  time?: string;
  tag?: string;
  tagType?: "" | "info" | "success" | "warning" | "danger";
}

// 列表
export interface IListProps {
  title?: string;
  content?: IListItemProps[];
}

// 操作选项
export interface IActionProps {
  text?: string;
  icon?: string;
}
