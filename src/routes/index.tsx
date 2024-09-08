import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import BaseLayout from "../layouts/base-layout";
import AuthLayout from "../layouts/auth-layout";
import ProtectedLayout from "../layouts/protected-layout";
import DashboardLayout from "../layouts/dashboard-layout";
import VerifyLayout from "../layouts/verify-layout";

import HomePage from "../pages/home";
import NotFoundPage from "../pages/not-found-page";
import ProfilePage from "../pages/profile";

import SignUpPage from "../pages/auth/sign-up-page";
import SignInPage from "../pages/auth/sign-in-page";
import CreatePasswordPage from "../pages/auth/create-password-page";
import EmailVerificationPage from "../pages/auth/email-verification-page";
import ForgotPasswordPage from "../pages/auth/forgot-password-page";
import ResetPasswordPage from "../pages/auth/reset-password-page";

import DashboardHomePage from "../pages/dashboard/home";
import DashboardSheetPage from "../pages/dashboard/sheet";
import DashboardTodoPage from "../pages/dashboard/todo";
import DashboardTaskPage from "../pages/dashboard/task";
import DashboardProjectPage from "../pages/dashboard/project";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route element={<VerifyLayout />}>
        <Route element={<ProtectedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="home" element={<DashboardHomePage />} />
          <Route path="sheet" element={<DashboardSheetPage />} />
          <Route path="todo" element={<DashboardTodoPage />} />
          <Route path="tasks" element={<DashboardTaskPage />} />
          <Route path="projects" element={<DashboardProjectPage />} />
        </Route>
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="create-password" element={<CreatePasswordPage />} />
        <Route path="email-verification" element={<EmailVerificationPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default Router;
