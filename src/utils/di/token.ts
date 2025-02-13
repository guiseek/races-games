export class Token<T> {
  constructor(readonly name: string, public value?: T) {}
}

export function createToken<T>(name: string, value?: T) {
  return new Token(name, value)
}
