
export function selector<A> (getNs, select: (s, ...args: any[]) => A): (s, ...args: any[]) => A {
  return (state, ...args) => {
    return select(getNs(state), ...args)
  }
}
