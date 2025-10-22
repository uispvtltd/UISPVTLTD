// ✅ Import modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// ✅ Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connection
mongoose.connect('mongodb+srv://kausthubh1830:EYvlCs23EYVnJKFe@cluster0.ilztq7d.mongodb.net/uiswebsite?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Contact Schema / Model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});
const Contact = mongoose.model('Contact', contactSchema);

// ✅ Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Serve static files (HTML, CSS, JS, images)
app.use('/static', express.static(path.join(__dirname, '..', 'static')));
app.use(express.static(path.join(__dirname, '..'))); // this line serves all HTML files

// ✅ POST route for contact form
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    console.log('📩 Contact saved to DB:', newContact);
    res.send(`<h1>Thank you, ${name}! Your message has been saved to the database.</h1>`);
  } catch (error) {
    console.error('❌ Error saving contact:', error);
    res.status(500).send('Something went wrong. Please try again later.');
  }
});

// ✅ Optional manual routes (you can remove if you want)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'about.html'));
});
app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'products.html'));
});
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'contact.html'));
});
app.get('/blogs', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'blogs.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'login.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
