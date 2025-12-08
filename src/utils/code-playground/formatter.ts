export const formatLogArgument = (arg: unknown): string => {
  if (typeof arg === "object" && arg !== null) {
    try {
      if (Array.isArray(arg)) {
        // Format arrays: one item per line, but keep objects compact
        const items = arg.map((item) => JSON.stringify(item));
        return `[\n  ${items.join(",\n  ")}\n]`;
      }
      // Always display objects in a single line
      return JSON.stringify(arg);
    } catch {
      return String(arg);
    }
  }
  return String(arg);
};
