export const When = ({ condition, other, children }: { condition: boolean, other?: any, children: any }) => {
  'use client'
  const otherChildren = other ? other : null
  return condition ? children : otherChildren
}
