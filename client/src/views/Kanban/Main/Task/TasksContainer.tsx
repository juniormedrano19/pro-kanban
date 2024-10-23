import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { TaskItem } from "./TaskItem";
import { CornerUpLeft, MessageSquare, PlusIcon } from "lucide-react";
import { RootState, useAppSelector } from "../../../../redux";
import { toast } from "sonner";
import { format } from "date-fns";
import { BASE_URL, ENDPOINTS } from "../../../../utils/constants/endpoints";
import { socket } from "../../../../utils/constants/socket";
import {
  IDraggingUser,
  IDragUserData,
  IFormValuesTask,
  ITaskGroup,
  ITaskItem,
  ITasksState,
} from "../../../../application/interfaces";

const initialValues: IFormValuesTask = {
  taskName: "",
  description: "",
};

const TasksContainer = () => {
  const [draggingUsers, setDraggingUsers] = useState<IDraggingUser[]>([]);
  const [tasks, setTasks] = useState<ITasksState>({});
  const [showInput, setShowInput] = useState<string | null>(null);
  const [values, setValues] = useState<IFormValuesTask>(initialValues);
  const { user } = useAppSelector((state: RootState) => state.kanbanReducer);

  const handleAddTask = (taskKey: string) => {
    setShowInput(taskKey);
  };

  const today = new Date();
  const formattedDay = format(today, "d MMM");

  const { taskName, description } = values;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  interface AddTodoData {
    title: string;
    key: string;
  }

  const handleAddTodo = (e: React.FormEvent, taskData: AddTodoData) => {
    e.preventDefault();

    socket.emit("createTask", {
      task: taskName,
      group: taskData.title,
      key: taskData.key,
      description: description,
      user: user,
      date: formattedDay,
    });

    toast.success("Task has been created");
    setValues(initialValues);
  };
  const handleDragStart = (start: any) => {
    const taskId = start.draggableId;
    socket.emit("dragStart", {
      taskId,
      isDragging: true,
      username: user
    });
  };
  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    
    socket.emit("dragEnd", {
      taskId: result.draggableId,
      isDragging: false,
      username: user
    });

    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    socket.emit("taskDragged", {
      source,
      destination,
    });
  };

  useEffect(() => {
    function fetchTasks() {
      fetch(`${BASE_URL}${ENDPOINTS.API}`)
        .then((res) => res.json())
        .then((data: ITasksState) => setTasks(data));
    }
    fetchTasks();
  }, []);

  useEffect(() => {
    socket.on("tasks", (data: ITasksState) => {
      setTasks(data);
    });
    socket.on("taskBroadcasted", (taskBroadcasted: ITasksState) => {
      setTasks(taskBroadcasted);
    });

    socket.on("userDragging", ({ taskId, username }: IDragUserData) => {
      setDraggingUsers(prev => [...prev, { taskId, username }]);
    });

    socket.on("userDragEnd", ({ taskId }: IDragUserData) => {
      setDraggingUsers(prev => prev.filter(item => item.taskId !== taskId));
    });

    return () => {
      socket.off("userDragging");
      socket.off("userDragEnd");
    };
  }, [socket]);

  return (
    <div className="container w-[880px]">
      <DragDropContext onDragEnd={handleDragEnd}   onDragStart={handleDragStart}>
        {Object.entries(tasks).map(([_, task]: [string, ITaskGroup]) => (
          <div className={`${task.key.toLowerCase()}__wrapper`} key={task.key}>
            <div
              className={`${task.key.toLowerCase()}__container group__container`}
            >
              <div className="flex !flex-row items-center ">
                <div
                  className={`${task.key.toLowerCase()}__label title__label`}
                >
                  <h3>{task.title}</h3>
                </div>
                <p className="text-sm text-[#828282]">{task.items.length}</p>
              </div>

              <div className="group__tasks">
                <Droppable droppableId={task.key}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {task.items.map((item: ITaskItem, index: number) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskItem
                                title={item.title}
                                description={item.description}
                                date={item.date}
                                user={item.user}
                                id={item.id}
                                draggingUsers={draggingUsers}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                {showInput === task.key && (
                  <form
                    className="form__input"
                    onSubmit={(e) =>
                      handleAddTodo(e, {
                        title: task.title,
                        key: task.key,
                      })
                    }
                  >
                    <div className="bg-white cursor-pointer border border-violet-500 rounded-[14px] w-[254px] h-auto py-3 px-2 flex flex-col !sr-onlygap-1">
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          placeholder="Task name"
                          className="px-2 text-sm focus:outline-none flex-1"
                          name="taskName"
                          id="taskName"
                          value={taskName}
                          required
                          onChange={onChange}
                        />

                        <button className="flex bg-violet-500 text-white text-xs items-center p-1 rounded-md gap-1 hover:opacity-85">
                          Save <CornerUpLeft className="w-[16px] h-[16px]" />
                        </button>
                      </div>
                      <div className="flex items-center justify-center py-2 px-2">
                        <MessageSquare className="w-[12px] h-[12px] text-[#828282]" />
                        <input
                          className="px-2 focus:outline-none rounded-[14px] resize-none w-full text-xs"
                          placeholder="Add description"
                          name="description"
                          id="description"
                          value={description}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </form>
                )}

                <button
                  onClick={() => handleAddTask(task.key)}
                  className="flex items-center text-sm gap-2 px-2 py-1 rounded-md hover:bg-gray-200"
                >
                  <PlusIcon className="w-[16px] h-[16px]" />
                  Add Task
                </button>
              </div>
            </div>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default TasksContainer;
