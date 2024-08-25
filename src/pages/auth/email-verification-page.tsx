import Logo from "../../components/ui/logo";

const EmailVerificationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white flex items-center justify-center flex-col w-[300px] sm:w-[500px] rounded-lg border p-6">
        <Logo hasText={true} className="text-2xl" />
        <h1 className="text-lg font-medium text-primary">
          Please check your email
        </h1>
        <div className="mt-4 flex items-center justify-center flex-col">
          <p className="text-center text-sm">We've sent a verification link </p>
          <span className="text-primary text-sm">example@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
