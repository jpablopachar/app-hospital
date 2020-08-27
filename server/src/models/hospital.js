const { Schema, model } = require('mongoose');

const HospitalSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { collection: 'Hospitals' });

HospitalSchema.method('toJSON', () => {
  const { __v, ...object } = this.toObject();

  return object;
});

module.exports = model('Hospital', HospitalSchema);
