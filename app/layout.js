export const metadata = {
  title: "진짜 나는 누구인가",
  description: "행동 패턴으로 읽는 깊은 성격 분석",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0, background: "#090909" }}>
        {children}
      </body>
    </html>
  );
}
