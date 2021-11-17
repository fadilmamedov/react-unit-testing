import cls from 'classnames';
import { useRemoveTodoItem } from 'hooks/api/useRemoveTodoItem';
import { useTodos } from 'hooks/api/useTodos';
import { useUpdateTodoItem } from 'hooks/api/useUpdateTodoItem';
import { useDebounce } from 'hooks/common/useDebounce';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { searchStringState } from 'state/todos';
import { TodoItem as TodoItemType } from 'types/todo';
import { groupTodoItemsByDate } from 'utils/groupTodoItemsByDate';

import { LoadingIndicator } from './LoadingIndicator';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  className?: string;
}

export const TodoList: React.FC<TodoListProps> = ({ className }) => {
  const todosSearchString = useRecoilValue(searchStringState);
  const debouncedTodosSearchString = useDebounce(todosSearchString, 1000);

  const { todos = [], isLoading: isLoadingTodos } = useTodos(debouncedTodosSearchString);
  const { mutate: updateTodoItem } = useUpdateTodoItem();
  const { mutate: removeTodoItem } = useRemoveTodoItem();

  const handleRemoveTodoItem = (todoItem: TodoItemType) => {
    removeTodoItem(todoItem);
  };

  const groupedByDateTodoItems = groupTodoItemsByDate(todos);

  return (
    <div className={cls('space-y-8', className)}>
      {isLoadingTodos ? (
        <LoadingIndicator />
      ) : (
        Object.entries(groupedByDateTodoItems).map(([date, dateTodoItems]) => (
          <div key={date}>
            <div className="mb-2 text-center tracking-wider text-sm text-gray-500 font-medium">
              {new Date(date).toLocaleDateString()}
            </div>

            <div>
              {dateTodoItems.map((todoItem) => (
                <TodoItem
                  key={todoItem.id}
                  text={todoItem.text}
                  completed={todoItem.completed}
                  onComplete={() => {
                    updateTodoItem({ ...todoItem, completed: true });
                  }}
                  onUncomplete={() => {
                    updateTodoItem({ ...todoItem, completed: false });
                  }}
                  onRemove={() => handleRemoveTodoItem(todoItem)}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
