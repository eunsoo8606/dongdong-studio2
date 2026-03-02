const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Nodemailer Transporter 설정
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Routes
app.get('/', (req, res) => {
    res.render('pages/home', { title: '동동스튜디오 | 크리에이터와 브랜드의 새로운 가치 창출' });
});

app.get('/about', (req, res) => {
    res.render('pages/about', { title: '소개 | 동동스튜디오 - NEXT STAR를 찾는 매니지먼트' });
});

app.get('/creators', (req, res) => {
    res.render('pages/creators', { title: '크리에이터 | 동동스튜디오의 빛나는 스타들' });
});

app.get('/contact', (req, res) => {
    res.render('pages/contact', { title: '문의하기 | 동동스튜디오와 함께 성장을 시작하세요' });
});

app.post('/contact', async (req, res) => {
    const { name, email, platform, message } = req.body;

    const mailOptions = {
        from: `"동동스튜디오 알림" <${process.env.EMAIL_USER}>`,
        to: 'dongdongfnb@naver.com',
        subject: `[DONGDONG STUDIO] ${name}님의 새로운 상담 신청`,
        html: `
            <div style="font-family: 'Pretendard', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000; color: #fff; border: 1px solid #00F0FF;">
                <div style="padding: 30px; text-align: center; border-bottom: 1px solid #00F0FF;">
                    <h1 style="color: #00F0FF; margin: 0; font-size: 24px; letter-spacing: 2px;">DONGDONG STUDIO</h1>
                    <p style="margin: 10px 0 0; font-size: 14px; opacity: 0.6;">NEW CONSULTATION REQUEST</p>
                </div>
                
                <div style="padding: 30px;">
                    <div style="margin-bottom: 25px;">
                        <h2 style="color: #00F0FF; margin: 0 0 10px 0; font-size: 16px; border-left: 3px solid #00F0FF; padding-left: 10px;">👤 신청자 정보</h2>
                        <p style="margin: 8px 0; color: #fff; font-size: 15px;"><strong>이름:</strong> ${name}</p>
                        <p style="margin: 8px 0; color: #fff; font-size: 15px;"><strong>이메일:</strong> ${email}</p>
                        <p style="margin: 8px 0; color: #fff; font-size: 15px;"><strong>플랫폼/채널:</strong> ${platform}</p>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <h2 style="color: #00F0FF; margin: 0 0 10px 0; font-size: 16px; border-left: 3px solid #00F0FF; padding-left: 10px;">💬 문의 내용</h2>
                        <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; white-space: pre-wrap; color: #fff; line-height: 1.6; border: 1px solid rgba(0,240,255,0.1);">
${message}
                        </div>
                    </div>
                </div>
                
                <div style="text-align: center; padding: 20px; color: #555; font-size: 12px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <p>본 메일은 동동스튜디오 웹사이트에서 자동으로 발송되었습니다.</p>
                    <p>&copy; 2026 DONGDONG STUDIO. All rights reserved.</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: '상담 신청이 성공적으로 접수되었습니다.' });
    } catch (error) {
        console.error('메일 발송 실패:', error);
        res.status(500).json({ success: false, message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
