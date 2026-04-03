import { useForm, type SubmitHandler } from "react-hook-form";

interface FormValues {
  email?: string;
  username: string;
  password: string;
}

interface Props {
  defaultValues?: FormValues;
  onSubmit: SubmitHandler<FormValues>;
}

export default function LoginForm({ defaultValues, onSubmit }: Props) {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({
    defaultValues,
    mode: "onChange"
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="mb-2" htmlFor="username">Username</label>
        <input
          id="username"
          type="input"
          className="form-control"
          placeholder="Username"
          {...register("username", {
            required: "Username is required",
          })}
        />
        {errors.username && <div className="text-danger small mt-1">{errors.username.message}</div>}
      </div>

      <div className="mb-3">
        <label className="mb-2" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="form-control"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" }
          })}
        />
        {errors.password && <div className="text-danger small mt-1">{errors.password.message}</div>}
      </div>

      <button className="btn btn-primary w-100 mt-5" type="submit" disabled={!isValid}>Login</button>
    </form>
  );
}