import { toast } from "react-toastify";
import { login } from "../../api/loginApi";
import LoginForm from "../../components/LoginForm";
import "./Login.css"

interface FormValues {
  username: string;
  password: string;
}

interface Props {
  onLogin: (token: string) => void;
}

export default function Login({ onLogin }: Props) {
  const defaultValues: FormValues = { username: "", password: "" };

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await login(data)

      sessionStorage.setItem("token", result.token);
      onLogin(result.token);
      toast.success("Login successful", {theme: "colored",});
    } catch {
      toast.error("Login Failed", {theme: "colored",})
    }
  };

  return (
    <div className="login-container vh-100 container">
      <div className="card shadow" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-4">Login</h3>
          <div className="alert alert-info py-2 info">
            <strong>Demo Account for Testing:</strong>
            <br />
            Username: <code>admin</code>, Password: <code>123456</code>
            <br />
            Use these credentials to log in and try the app features.
          </div>
          <LoginForm onSubmit={onSubmit} defaultValues={defaultValues} />
        </div>
      </div>
    </div>
  );
}