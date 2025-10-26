import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "顺流而生",
  description: "输入您的盖洛普优势才干排序，AI为您生成定制化的关系、工作、副业成长建议。通过完成任务看着您的成长树茁壮成长！",
  metadataBase: new URL("https://gallup-product.com"),
  keywords: ["盖洛普优势", "MBTI性格测试", "个人成长", "职业发展", "AI教练"],
  alternates: {
    canonical: './',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased" style={{ backgroundColor: '#DCF0EA' }}>
        <Header />
        {children}
      </body>
    </html>
  );
}
