
export function selector<A> (getNs, select: (s, ...args: any[]) => A): (s, ...args: any[]) => A {
  return (state, ...args) => {
    return select(getNs(state), ...args)
  }
}

export function getAge (updated: Date) {
  const now = + new Date()
  const lastUpdate = + new Date(updated)
  return Math.floor((now - lastUpdate) / 1000)
}
