import { SchemaOptions } from "mongoose"

const schemaOptions: SchemaOptions = {
  versionKey: false,
  autoIndex: true,
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  },
  toJSON: {
    transform: (doc, ret) => {
      ret.createTime = ret.createTime.valueOf()
      ret.updateTime = ret.updateTime.valueOf()

      return ret
    }
  }
}
export default schemaOptions
