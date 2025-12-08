export const DEFAULT_CODE = `const users = [
  { id: 2, name: "Bob", age: 27 },
  { id: 4, name: "Diana", age: 31 },
  { id: 3, name: "Charlie", age: 29 },
  { id: 1, name: "Alice", age: 24 },
];

const sortedUsers = [...users].sort((a, b) => {
  return a.id - b.id;
});

console.log(sortedUsers);`;