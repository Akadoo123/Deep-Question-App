# Deep Question Companion

> คำถามลึกสำหรับคนที่ไม่อยากคิดแบบผิวเผิน

Web app สำหรับ generate คำถามเชิงลึกและ insight ภาษาไทย เหมาะสำหรับ CEO, ผู้บริหาร, และ Knowledge Worker ที่ต้องการเปิดมุมมองใหม่ในแต่ละวัน

---

## Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Framework | Next.js 14 (App Router)     |
| Language  | TypeScript                  |
| Styling   | Tailwind CSS                |
| AI        | Anthropic Claude API        |
| Deploy    | Railway                     |

---

## ไฟล์สำคัญ

```
├── app/
│   ├── api/generate/route.ts   # API endpoint — calls Claude
│   ├── layout.tsx              # Root layout + metadata
│   ├── page.tsx                # Main page UI
│   └── globals.css             # Global styles + dark theme
├── components/
│   ├── CategorySelector.tsx    # 7 category buttons
│   ├── GenerateButton.tsx      # Generate CTA button
│   ├── ResultCard.tsx          # Result display + copy/again
│   └── LoadingState.tsx        # Skeleton loading UI
├── lib/
│   ├── categories.ts           # Category definitions & helpers
│   └── prompts.ts              # System + user prompt builders
├── .env.example                # Environment variable template
└── README.md
```

---

## Run Local

### 1. ติดตั้ง Node.js
ดาวน์โหลดจาก https://nodejs.org/ (แนะนำ LTS version)

### 2. Clone repo
```bash
git clone https://github.com/YOUR_USERNAME/deep-question-companion.git
cd deep-question-companion
```

### 3. ติดตั้ง dependencies
```bash
npm install
```

### 4. สร้าง .env.local
```bash
cp .env.example .env.local
```
แล้วแก้ไข `.env.local` ใส่ API key:
```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxx
```

> รับ API key ได้ที่ https://console.anthropic.com/

### 5. รัน development server
```bash
npm run dev
```
เปิดเบราว์เซอร์ที่ http://localhost:3000

---

## Push ขึ้น GitHub

```bash
git init
git add .
git commit -m "Initial commit: Deep Question Companion"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/deep-question-companion.git
git push -u origin main
```

---

## Deploy บน Railway

### 1. สร้าง account
ไปที่ https://railway.app/ แล้ว Sign Up ด้วย GitHub

### 2. สร้าง project ใหม่
- คลิก **New Project**
- เลือก **Deploy from GitHub repo**
- เลือก repository `deep-question-companion`

### 3. ตั้งค่า Environment Variables
ใน Railway dashboard → **Variables** tab:
```
ANTHROPIC_API_KEY = sk-ant-api03-xxxxxxxxxxxxxxxxxxxxx
```

### 4. Deploy
Railway จะ build และ deploy อัตโนมัติ  
ได้ URL แบบ: `https://deep-question-companion-production.up.railway.app`

### 5. Custom Domain (optional)
ใน **Settings** → **Domains** เพิ่ม domain ของคุณ

---

## จุดที่ Customize เพิ่มได้

| Feature | วิธีเพิ่ม |
|---------|-----------|
| เพิ่ม category ใหม่ | แก้ `lib/categories.ts` เพิ่ม entry |
| เปลี่ยน Claude model | แก้ env var `ANTHROPIC_MODEL` |
| บันทึก history | เพิ่ม localStorage หรือ database |
| Share insight | เพิ่ม share button + og:image |
| Favorite | เพิ่ม bookmark ด้วย localStorage |
| ภาษาอังกฤษ | เพิ่ม lang toggle + prompt ภาษาอังกฤษ |
| Rate limiting | เพิ่ม middleware + Redis |
| Auth | เพิ่ม NextAuth.js |

---

## Scripts

```bash
npm run dev      # development server (port 3000)
npm run build    # production build
npm run start    # production server
npm run lint     # ESLint check
```
