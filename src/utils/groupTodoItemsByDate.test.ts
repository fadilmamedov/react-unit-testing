import { todoItems } from '__fixtures__/todoItems';

import { groupTodoItemsByDate } from './groupTodoItemsByDate';

// TODO:
// - Mention regular and inline shapshots
// - Show regenerating snapshots (including interactive mode)
// - Show failing shapshots because of buggy behavior
// - Show asymmetric matchers when some data is dynamic
// - Point to best practices described here - https://jestjs.io/docs/snapshot-testing

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
