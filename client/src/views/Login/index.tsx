import { LoginBgHero } from "./LoginHero";
import { LoginForm } from "./LoginForm";

export default function Login() {

  return (
    <div className="bg-white">
      <div className="flex min-h-screen">
        <div className="flex flex-row w-full">
            <LoginBgHero />
            <LoginForm />
        </div>
      </div>
    </div>
  );
}
