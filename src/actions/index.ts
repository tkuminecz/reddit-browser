
export const selector = (getNs, sel) => (state, ...args) => {
  return sel(getNs(state), ...args)
}
