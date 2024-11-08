import SelectTeamModal from "@/features/team-select/infraestructure/SelectTeamModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <SelectTeamModal />
    </>
  );
}
