export interface IUser {
    id: string;
    name: string;
    socketId?: string;
  }
  
  
  
 export interface ITask {
    id: string;
    title: string;
    description: string;
    date: string;
    group: string;
    user: string;
  
  }
  
  export interface ITaskColumn {
    title: string;
    key: string;
    items: ITask[];
  }
  
export  interface ITaskBoard {
    [key: string]: ITaskColumn;
  }
  
 export interface IDragDropSource {
    droppableId: string;
    index: number;
  }
  
export  interface ITaskDragDropData {
    source: IDragDropSource;
    destination: IDragDropSource;
  }
  
 export interface ICreateTaskData {
    task: string;
    description: string;
    user: string;
    date: string;
    group: string;
    key: string;
  }
  
 export interface IEditTaskData {
    id: string;
    title: string;
    description: string;
    date: string;
    user: string;
  }

  export interface IDragUserData {
    taskId: string;
    isDragging: boolean;
    username: string;
  }