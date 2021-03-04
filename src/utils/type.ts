export const isBoolean = (val: unknown) => Object.prototype.toString.call(val).slice(8, -1) === 'Boolean'

export const isNumber = (val: unknown) => Object.prototype.toString.call(val).slice(8, -1) === 'Number'
