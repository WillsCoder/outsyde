import LayoutFooter from "@/modules/layout/footer";
import LayoutHeader from "@/modules/layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LayoutHeader />
      {children}
      <LayoutFooter />
    </>
  );
}
