import mongoose, { Schema, SchemaDefinition, SchemaOptions } from "mongoose";

const schemaDefine: SchemaDefinition = {
  authorName: String,
  authorId: String,
  createTime: { type: Number, default: Date.now() },
  updateTime: { type: Number, default: Date.now() },
  title: { type: String, required: true },
  content: { type: String, required: true  },
  describe: { type: String },
  like: { type: Number, default: 0 },
  comment: { type: Number, comment: 0 },
  cover: { type: Object },
  music: { type: Object },
  read: { type: Number, default: 0 },
  hidden: { type: Boolean, default: false },
  categoryId: { type: String, required: true }
}

const options: SchemaOptions = {
  collection: 'article',
  versionKey: false
}

const schema = new Schema(schemaDefine, options)

export default mongoose.model('article', schema)
