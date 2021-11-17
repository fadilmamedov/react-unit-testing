import { TodoItem } from 'types/todo';

export const groupTodoItemsByDate = (todoItems: TodoItem[]) => {
  const result = {} as { [date: string]: TodoItem[] };

  todoItems.forEach((todoItem) => {
    const { date } = todoItem;
    result[date] = result[date] ? [...result[date], todoItem] : [todoItem];
  });

  Object.keys(result).forEach((date) => {
    const completed = result[date].filter((todoItem) => todoItem.completed);
    const notCompleted = result[date].filter((todoItem) => !todoItem.completed);

    result[date] = [...notCompleted, ...completed];
  });

  return result;
};
