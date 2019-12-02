/* eslint-disable @typescript-eslint/no-explicit-any */
export function invertMap(map: Map<any, any>): Map<any, any> {
  const invertedEnttries = [...map].map(entry => entry.reverse() as [any, any]);
  return new Map(invertedEnttries);
}


