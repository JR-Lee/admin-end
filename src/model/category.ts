import { model, Schema, SchemaDefinition } from "mongoose"
import schemaOptions from "../config/schema-options"

const define: SchemaDefinition = {
  name: { type: String, required: true, maxlength: 20 },
  remark: { type: String, maxlength: 200 }
}

const schema = new Schema(define, schemaOptions)

export default model('category', schema, 'category')
