import LayoutFooter from "@/modules/explorer/layout/footer";
import LayoutHeader from "@/modules/explorer/layout/header";

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
