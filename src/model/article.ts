import { model, Schema, SchemaDefinition, SchemaOptions } from "mongoose";
import schemaOptions from "../config/schema-options";

const define: SchemaDefinition = {
  authorName: String,
  authorId: String,
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    maxlength: 20000
  },
  describe: {
    type: String,
    maxlength: 200
  },
  like: {
    type: Number,
    default: 0
  },
  comment: {
    type: Number,
    comment: 0
  },
  cover: {
    type: Object
  },
  music: Object,
  read: {
    type: Number,
    default: 0
  },
  hidden: {
    type: Number,
    default: 0
  },
  categoryId: {
    type: String,
    required: true
  }
}

const schema = new Schema(define, schemaOptions)

export default model('article', schema, 'article')
