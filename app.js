const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// EJS 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Layout 설정
app.use(expressLayouts);
app.set('layout', 'layout'); // layouts.ejs 사용

// Static 파일 설정
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('pages/home', { title: 'DONGDONG STUDIO | NEXT STAR' });
});

app.get('/about', (req, res) => {
    res.render('pages/about', { title: 'ABOUT | DONGDONG STUDIO' });
});

app.get('/creators', (req, res) => {
    res.render('pages/creators', { title: 'CREATORS | DONGDONG STUDIO' });
});

app.get('/contact', (req, res) => {
    res.render('pages/contact', { title: 'CONTACT | DONGDONG STUDIO' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
