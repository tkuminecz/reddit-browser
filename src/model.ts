
export default class Model<T> {
  data: T
  constructor (props: T) {
    this.data = props
  }

  get<F extends keyof T> (s: F) {
    return this.data[s]
  }
}
