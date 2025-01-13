import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "CareerCatalyst - Search Internships",
};

export default async function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
