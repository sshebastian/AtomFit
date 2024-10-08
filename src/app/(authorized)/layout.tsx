import { LaptopNavigaton } from "@/components/shared/navigation/laptop-navigation";
import { MobileNavigation } from "@/components/shared/navigation/mobile-navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="flex">
        <aside className="sticky top-0 z-50 hidden h-screen p-2 md:block">
          <LaptopNavigaton />
        </aside>
        <section className="container min-h-screen p-4 pb-24 md:pb-4">
          {children}
        </section>
      </section>
      <section className="fixed bottom-0 w-full p-2 md:hidden">
        <MobileNavigation />
      </section>
    </>
  );
}
