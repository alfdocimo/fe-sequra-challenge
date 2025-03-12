export function invariant(cond, msg) {
  if (!cond) {
    throw Error(msg);
  }
}
