"use client";
import LoginComponent from "@/components/Auth/Login";
import AuthRedirect from "@/lib/AuthRedirect";

const LoginPage = () => {
  return (
    <AuthRedirect requireAuth={false} redirectTo="/">
      <LoginComponent />
    </AuthRedirect>
  );
};

export default LoginPage;
