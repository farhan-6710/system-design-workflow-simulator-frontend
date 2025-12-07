export const DEFAULT_CODE = `const a = [1, 2, 3, 4];

const b = a.filter((num) => {
  return num % 2 === 0;
});

console.log("Filtered Array:", b);
console.warn("This is a warning example");
console.error("This is an error example");
`;