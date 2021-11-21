import { todoItems } from '__fixtures__/todoItems';

import { groupTodoItemsByDate } from './groupTodoItemsByDate';

describe('groupTodoItemsByDate', () => {
  test('returns empty object for empty array of todos', () => {
    const groupedTodoItems = groupTodoItemsByDate([]);

    expect(groupedTodoItems).toEqual({});
  });

  test('groups todo items by date and moves completed items to the end of each group', () => {
    const groupedTodoItems = groupTodoItemsByDate(todoItems);

    expect(groupedTodoItems).toMatchInlineSnapshot(`
      Object {
        "2021-11-10": Array [
          Object {
            "completed": false,
            "date": "2021-11-10",
            "id": 2,
            "text": "second todo item",
          },
          Object {
            "completed": true,
            "date": "2021-11-10",
            "id": 1,
            "text": "first todo item",
          },
        ],
        "2021-11-11": Array [
          Object {
            "completed": false,
            "date": "2021-11-11",
            "id": 3,
            "text": "third todo item",
          },
        ],
      }
    `);
  });
});
