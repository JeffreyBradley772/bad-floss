import { Decimal } from '@prisma/client/runtime/library';

/**
 * A type that represents a value that can be serialized to JSON.
 * This includes primitives, arrays of serializable values, or objects with serializable values.
 */
export type Serializable =
  | boolean
  | number
  | string
  | null
  | undefined
  | Serializable[]
  | { [key: string]: Serializable };

/**
 * A type that represents a JSON-serializable version of a Prisma model object.
 * It converts `Date` objects to ISO strings and `Decimal` objects to numbers.
 * @template T The Prisma model type.
 */
export type Serialized<T> = T extends Decimal
  ? number
  : T extends Date
    ? string
    : T extends object
      ? {
          [P in keyof T]: Serialized<T[P]>;
        }
      : T;

/**
 * Recursively serializes an object by converting `Date` objects to ISO strings and `Decimal` objects to numbers.
 * This is useful for preparing Prisma objects to be sent to the client.
 * @param obj The object to serialize.
 * @returns The serialized object.
 */
export function serialize<T>(obj: T): Serialized<T> {
  if (obj === null || obj === undefined) {
    return obj as Serialized<T>;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => serialize(item)) as Serialized<T>;
  }

  if (obj instanceof Decimal) {
    return obj.toNumber() as Serialized<T>;
  }

  if (obj instanceof Date) {
    return obj.toISOString() as Serialized<T>;
  }

  if (typeof obj === 'object') {
    const newObj: { [key: string]: Serializable } = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = serialize((obj as Record<string, unknown>)[key]) as Serializable;
      }
    }
    return newObj as Serialized<T>;
  }

  return obj as Serialized<T>;
}
