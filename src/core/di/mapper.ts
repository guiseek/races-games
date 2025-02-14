import {Provider, Ref} from './types'
import {Type} from '../types'
import {Token} from './token'
import {is} from './is'

const container = new Map()
const relations = new Map()

function use<T>(ref: T): T extends Ref<infer U> ? U : T
function use<T>(ref: T): T extends Token<infer U> ? U : T
function use<T>(ref: T): T extends Type<infer U> ? U : T
function use<T>(ref: Ref<T>) {
  const value = container.get(ref)

  if (!value) throw `${ref.name} not found`

  return value
}

async function provide<T>({ref, use}: Provider<T>) {
  const type = (use ?? ref) as T

  if (is.fn(type)) {
    const deps = relations.get(ref) ?? []

    if (is.type(type)) {
      return new type(...deps)
    }

    if (is.asyncFn(type)) {
      return await type(...deps)
    }

    return type(...deps)
  }

  return type
}

async function add<T>(provider: Provider<T>) {
  if (provider.dep && provider.dep.length > 0) {
    relations.set(provider.ref, provider.dep.map(use))
  }

  container.set(provider.ref, await provide(provider))

  return use(provider.ref)
}

async function* set<T>(
  ...providers: Provider<T | any>[]
): AsyncGenerator<T, void, unknown> {
  for (const p of providers) {
    yield await add(p)
  }
}

export {use, add, set}
