export const formatLogArgument = (arg: unknown): string => {
  if (typeof arg === "object" && arg !== null) {
    try {
      const str = JSON.stringify(arg, null, 2);
      // If short, strip newlines to display inline
      return str.length < 50 ? str.replace(/\s+/g, " ") : str;
    } catch {
      return String(arg);
    }
  }
  return String(arg);
};
