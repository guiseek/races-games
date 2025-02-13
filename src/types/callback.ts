export interface Resolve<T> {
  (value: T | PromiseLike<T>): void
}

export interface Reject {
  (reason?: Error | DOMException | null): void
}

export interface AsyncCallback<T> {
  (resolve: Resolve<T>, reject: Reject): void
}

export interface IntervalCallback {
  (value: number): void
}
