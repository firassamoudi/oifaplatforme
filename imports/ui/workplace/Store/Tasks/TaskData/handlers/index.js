import { TaskData } from "../../..";

export const handleInputChange = (inp) => {
  TaskData.set("TaskData", { title: inp.task_title });
};
