import { redirect } from "next/navigation";
import { getAdminToken, verifyAdmin } from "@/lib/auth";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAdminToken();
  const isLoggedIn = verifyAdmin(token);

  if (!isLoggedIn) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
