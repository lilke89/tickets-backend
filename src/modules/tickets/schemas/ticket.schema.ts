import { SchemaTypes} from 'mongoose';
import * as mongoose from 'mongoose';

export const TicketSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  status: {type: String, default: 'todo'},
  _author: {type: SchemaTypes.ObjectId, ref: 'User'},
  archived: Boolean,
});
