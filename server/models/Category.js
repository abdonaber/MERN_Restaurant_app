const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true
  },
  description: String,
  slug: {
    type: String,
    lowercase: true
  }
}, { timestamps: true });

categorySchema.pre('save', function() {
  this.slug = this.name.split(' ').join('-').toLowerCase();
});

module.exports = mongoose.model('Category', categorySchema);
