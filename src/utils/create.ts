export const create = <K extends keyof HTMLElementTagNameMap>(
  name: K,
  attrs: Partial<HTMLElementTagNameMap[K]> = {},
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] => {
  const el = document.createElement(name)
  el.append(...children)
  return Object.assign(el, attrs)
}

const namespaces = {
  html: 'http://www.w3.org/1999/xhtml',
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML',
}

export type NamespaceKey = 'html' | 'svg' | 'math'

type TagNameMap = SVGElementTagNameMap &
  HTMLElementTagNameMap &
  MathMLElementTagNameMap

function createElement<Tag extends keyof TagNameMap>(
  namespace: NamespaceKey,
  name: Tag
) {
  return document.createElementNS(
    namespaces[namespace],
    name
  ) as TagNameMap[Tag]
}

export const he = <K extends keyof HTMLElementTagNameMap>(
  name: K,
  attrs: Partial<HTMLElementTagNameMap[K]> = {},
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] => {
  const el = createElement('html', name)
  el.append(...children)
  return Object.assign(el, attrs)
}

export const se = <K extends keyof SVGElementTagNameMap>(
  name: K,
  attrs: Partial<SVGElementTagNameMap[K]> = {},
  ...children: (Node | string)[]
): SVGElementTagNameMap[K] => {
  const el = createElement('svg', name)
  el.append(...children)
  return Object.assign(el, attrs)
}

export const me = <K extends keyof MathMLElementTagNameMap>(
  name: K,
  attrs: Partial<MathMLElementTagNameMap[K]> = {},
  ...children: (Node | string)[]
): MathMLElementTagNameMap[K] => {
  const el = createElement('math', name)
  el.append(...children)
  return Object.assign(el, attrs)
}
