import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../../providers/AuthProvider";
import { useState } from "react";
import mtaApi from "../../../api/mtaApi";
import { setToken } from "../../../utils/helpers";
import { Success, Error } from "../../../components/toasts";

export default function SignInForm() {
  const {handleSubmit,register,formState: { isSubmitting },} = useForm();
  const { setUser } = useAuth();

  // const [alert, setAlert] = useState(null);

  const onSubmit = async (values) => {
    try {
      const { data } = await mtaApi.auth.login(values);
      if (data.status != 200) throw new Error(data.message);
      setToken(data.Admin.token)
      setUser(data.Admin)
      Success(data.message)
    } catch (error) {
      const message = error.response?.data?.error ?? error.message;
      Error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-y-4">
        {/* {alert && <Alert alert={alert} />} */}
        <div>
          <label htmlFor="username" className="block text-sm mb-2 dark:text-white">
            Email address
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              {...register("email")}
              autoComplete="current-username"
              className="py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark dark:border-white/10 dark:text-white/70"
              required
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="block text-sm mb-2 dark:text-white">
              Password
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              {...register("password")}
              autoComplete="password"
              className="py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:border-white/10 dark:text-white/70"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10 disabled:bg-gray-300"
        >
          {!isSubmitting ? "Sign in" : "Loading..."}
        </button>
      </div>
    </form>
  );
}
