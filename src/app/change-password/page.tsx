import ChangePassword from "@/components/auth/ChangePassword";

export default function UpdatePasswordPage() {
  return (
    <main className="jj-login-page">
      <div className="container-xl">
        {/* We use a flex wrapper to center the component vertically/horizontally */}
        <div className="min-h-[calc(100vh-var(--nav-height))] flex items-center justify-center py-12">
          <ChangePassword />
        </div>
      </div>
    </main>
  );
}