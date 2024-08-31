import { useNavigate, useSearchParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

import Logo from "../../components/ui/logo";
import { URLS } from "../../constants";

const EmailVerificationPage = () => {
  const [params] = useSearchParams();
  const email = params.get("email") || null;
  const navigate = useNavigate();
  const backToSignIn = () => navigate(URLS.signInPageUrl);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white flex items-center justify-center flex-col w-[300px] sm:w-[500px] rounded-lg border p-6">
        <Logo hasText={true} className="text-2xl" />
        <h1 className="text-xl font-medium text-primary mt-3">
          Please check your email
        </h1>
        <div className="mt-2 flex items-center justify-center flex-col">
          <p className="text-center text-sm">We've sent a verification link </p>
          <span className="text-primary text-sm">{email}</span>
        </div>

        <button
          onClick={backToSignIn}
          className="flex items-center justify-center space-x-1 text-sm mt-4 text-center text-secondary hover:text-secondary/80 hover:underline transition-all"
        >
          <MdKeyboardBackspace />
          <span>Back to sign in</span>
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
