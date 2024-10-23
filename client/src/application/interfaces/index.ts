import { IconSidebarDashboard, SocialMediaIcon } from "../types";

export interface IMe {
  socialMedia: string;
  url: string;
  icon: SocialMediaIcon;
}

export interface IDashboardItem {
  id: number;
  title: string;
  icon: IconSidebarDashboard;
}

export interface IUserConnected {
  username: string;
  id: string;
  socketId: string;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  date: string;
  group: string;
  user: string;
}

export interface ITaskItem {
  id: string;
  title: string;
  description: string;
  date: string;
  user: string;
  group: string;
}

export interface ITaskGroup {
  title: string;
  key: string;
  items: ITaskItem[];
}

export interface ITasksState {
  [key: string]: ITaskGroup;
}

export interface IFormValuesTask {
  taskName: string;
  description: string;
}


export interface IDraggingUser {
  taskId: string;
  username: string;
}

export interface IDragUserData {
  taskId: string;
  isDragging: boolean;
  username: string;
}