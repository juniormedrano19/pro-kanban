import { Socket } from "socket.io";
import { Request, Response } from "express";
import {
  ICreateTaskData,
  IDragUserData,
  IEditTaskData,
  ITask,
  ITaskBoard,
  ITaskDragDropData,
  IUser,
} from "./interfaces";

const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 4000;

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const fetchID = (): string => Math.random().toString(36).substring(2, 10);

const onlineUsers: IUser[] = [];

const addUser = (user: IUser, socketId: string): void => {
  const isExist = onlineUsers.findIndex((item: IUser) => item.id === user.id);
  if (isExist !== -1) {
    onlineUsers.splice(isExist, 1);
  }
  user.socketId = socketId;
  onlineUsers.push(user);
};

const removeUser = (socketId: string): void => {
  const isExist = onlineUsers.findIndex(
    (item: IUser) => item.socketId === socketId
  );
  if (isExist !== -1) {
    onlineUsers.splice(isExist, 1);
  }
};

let tasks: ITaskBoard = {
  todo: {
    title: "To Do",
    key: "todo",
    items: [
      {
        id: fetchID(),
        title: "Send the Figma file to Dima",
        group: "To Do",
        description:
          '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
        date: "18 Oct",
        user: "David",
      },
    ],
  },
  inprogress: {
    title: "In Progress",
    key: "inprogress",
    items: [
      {
        id: fetchID(),
        title: "Review GitHub issues",
        description:
          '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
        user: "Luis",
        date: "18 Oct",
        group: "In Progress",
      },
    ],
  },
  done: {
    title: "Done",
    key: "done",
    items: [
      {
        id: fetchID(),
        title: "Create technical contents",
        description:
          '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
        user: "Martín Mendoza",
        date: "18 Oct",
        group: "Done",
      },
    ],
  },
};

socketIO.on("connection", (socket: Socket) => {
  socket.on("ADD_USER", (user: IUser) => {
    addUser(user, socket.id);
    socketIO.emit("USER_ADDED", onlineUsers);
  });

  socket.on("dragStart", (data: IDragUserData) => {
    socket.broadcast.emit("userDragging", data);
  });
  
  socket.on("dragEnd", (data: IDragUserData) => {
    socket.broadcast.emit("userDragEnd", data);
  });
  

  socket.on("createTask", (data: ICreateTaskData) => {
    const newTask: ITask = {
      id: fetchID(),
      title: data.task,
      description: data.description,
      user: data.user,
      date: data.date,
      group: data.group,
    };
    tasks[data.key].items.push(newTask);
    socket.emit("tasks", tasks);
    socket.broadcast.emit("taskBroadcasted", tasks);
  });

  socket.on("editTask", (data: IEditTaskData) => {
    const { id, title, description, date, user } = data;

    for (const key in tasks) {
      const taskIndex = tasks[key].items.findIndex(
        (task: ITask) => task.id === id
      );
      if (taskIndex !== -1) {
        tasks[key].items[taskIndex] = {
          ...tasks[key].items[taskIndex],
          title,
          description,
          date,
          user,
        };
        break;
      }
    }

    socket.emit("tasks", tasks);
    socket.broadcast.emit("taskBroadcasted", tasks);
  });

  socket.on("deleteTask", ({ id }: { id: string }) => {
    for (const key in tasks) {
      const taskIndex = tasks[key].items.findIndex(
        (task: ITask) => task.id === id
      );
      if (taskIndex !== -1) {
        tasks[key].items.splice(taskIndex, 1);
        break;
      }
    }

    socket.emit("tasks", tasks);
    socket.broadcast.emit("taskBroadcasted", tasks);
  });

  socket.on("taskDragged", (data: ITaskDragDropData) => {
    const { source, destination } = data;
    const itemMoved = {
      ...tasks[source.droppableId].items[source.index],
    };
    tasks[source.droppableId].items.splice(source.index, 1);
    tasks[destination.droppableId].items.splice(
      destination.index,
      0,
      itemMoved
    );
    socket.emit("tasks", tasks);
    socket.broadcast.emit("taskBroadcasted", tasks);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    socketIO.emit("USER_ADDED", onlineUsers);
  });
});

app.get("/api", (req: Request, res: Response) => {
  res.json(tasks);
});

app.get("/users", (req: Request, res: Response) => {
  res.json(onlineUsers);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
