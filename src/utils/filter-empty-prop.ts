/**
 * 过滤 value 为 undefined | null 的属性
 * @param target {object}
 */
const filterEmptyProp = (target: { [prop: string]: any }) => {
  for (const prop in target) target[prop] !== '' && !target[prop] && delete target[prop]
  return target
}

export default filterEmptyProp
