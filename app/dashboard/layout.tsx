import Sidebar from "@/components/sidebar/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:flex bg-sidebarbgColor  selection:   lg:h-full">
      <Sidebar />
      {children}
    </div>
  );
}
