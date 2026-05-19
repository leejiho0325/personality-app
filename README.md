# 진짜 나는 누구인가

행동 패턴으로 읽는 깊은 성격 분석 앱

---

## 배포 방법 (10분)

### 1. GitHub에 올리기

1. [github.com](https://github.com) 로그인
2. 우측 상단 `+` → `New repository`
3. Repository name: `personality-app` → `Create repository`
4. 아래 명령어 실행:

```bash
cd personality-app
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/[내아이디]/personality-app.git
git push -u origin main
```

---

### 2. Vercel 배포

1. [vercel.com](https://vercel.com) 접속 → GitHub으로 로그인
2. `Add New Project` → 방금 만든 `personality-app` 선택
3. `Environment Variables` 섹션에서:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-...` (본인 API 키)
4. `Deploy` 클릭
5. 완료! 링크 공유하면 됩니다 🎉

---

### Anthropic API 키 발급

[console.anthropic.com](https://console.anthropic.com) → API Keys → Create Key

---

## 로컬에서 테스트

```bash
# .env.local 파일 만들기
echo "ANTHROPIC_API_KEY=sk-ant-여기에키입력" > .env.local

# 실행
npm install
npm run dev
# http://localhost:3000 접속
```
