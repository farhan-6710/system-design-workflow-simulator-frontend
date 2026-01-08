export const formatLogArgument = (arg: unknown): string => {
  // Handle primitives first
  if (arg === null) return "null";
  if (arg === undefined) return "undefined";

  // Handle Symbol
  if (typeof arg === "symbol") {
    return arg.toString();
  }

  // Handle BigInt
  if (typeof arg === "bigint") {
    return `${arg}n`;
  }

  // Handle functions
  if (typeof arg === "function") {
    return `[Function: ${arg.name || "anonymous"}]`;
  }

  if (typeof arg === "object") {
    try {
      // Handle Set
      if (arg instanceof Set) {
        return `Set(${arg.size}) { ${Array.from(arg)
          .map((item) => formatLogArgument(item))
          .join(", ")} }`;
      }

      // Handle Map
      if (arg instanceof Map) {
        const entries = Array.from(arg.entries())
          .map(([k, v]) => `${formatLogArgument(k)} => ${formatLogArgument(v)}`)
          .join(", ");
        return `Map(${arg.size}) { ${entries} }`;
      }

      // Handle WeakSet
      if (arg instanceof WeakSet) {
        return "WeakSet { [items hidden] }";
      }

      // Handle WeakMap
      if (arg instanceof WeakMap) {
        return "WeakMap { [items hidden] }";
      }

      // Handle Date
      if (arg instanceof Date) {
        return arg.toISOString();
      }

      // Handle RegExp
      if (arg instanceof RegExp) {
        return arg.toString();
      }

      // Handle Error
      if (arg instanceof Error) {
        return `${arg.name}: ${arg.message}`;
      }

      // Handle Promise
      if (arg instanceof Promise) {
        return "Promise { <pending> }";
      }

      // Handle TypedArrays
      if (ArrayBuffer.isView(arg) && !(arg instanceof DataView)) {
        const typedArray = arg as
          | Uint8Array
          | Uint16Array
          | Uint32Array
          | Int8Array
          | Int16Array
          | Int32Array
          | Float32Array
          | Float64Array;
        const constructor = arg.constructor.name;
        const values = Array.from(typedArray).slice(0, 100); // Limit to first 100 items
        const preview = values.join(", ");
        const suffix = typedArray.length > 100 ? ", ..." : "";
        return `${constructor}(${typedArray.length}) [ ${preview}${suffix} ]`;
      }

      // Handle DataView
      if (arg instanceof DataView) {
        return `DataView(${arg.byteLength})`;
      }

      // Handle ArrayBuffer
      if (arg instanceof ArrayBuffer) {
        return `ArrayBuffer(${arg.byteLength})`;
      }

      // Handle Arrays
      if (Array.isArray(arg)) {
        // Format arrays: one item per line, but keep objects compact
        const items = arg.map((item) => JSON.stringify(item));
        return `[\n  ${items.join(",\n  ")}\n]`;
      }

      // Always display objects in a single line
      // This will handle circular references by throwing an error
      return JSON.stringify(arg);
    } catch (error) {
      // Handle circular references and other JSON.stringify errors
      if (error instanceof TypeError && error.message.includes("circular")) {
        return "[Circular Reference]";
      }
      return String(arg);
    }
  }

  return String(arg);
};
