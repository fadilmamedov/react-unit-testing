import { useCreateTodoItem } from 'hooks/api/useCreateTodoItem';
import { getTodoDateString } from 'utils/getTodoDateString';

import { CreateTodoForm } from './CreateTodoForm';
import { Header } from './Header';
import { TodoList } from './TodoList';

export const HomePage = () => {
  const { mutate: createTodoItem } = useCreateTodoItem();

  const handleCreateTodo = (text: string) => {
    createTodoItem({
      text,
      date: getTodoDateString(new Date()),
      completed: false,
    });
  };

  return (
    <div>
      <Header />

      <div className="p-6">
        <CreateTodoForm onCreate={handleCreateTodo} />

        <TodoList className="mt-5" />
      </div>
    </div>
  );
};
