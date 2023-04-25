import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
  confirmationPassword: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <form>
        <div>
          <label>email</label>
          <input
            type="email"
            color="#0000ff"
            placeholder="example@example.com"
            {...register("email", { required: true })}
          />
          {errors.email && <p>Eメールは必須です</p>}
        </div>
        <div>
          <label>パスワード</label>
          <input
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <p>パスワードは必須です</p>}
        </div>
        <div>
          <label>パスワード再入力</label>
          <input
            type="password"
            {...register("confirmationPassword", { required: true })}
          />
          {errors.confirmationPassword && <p>パスワード再入力は必須です</p>}
        </div>
        <button type="submit">サインアップ</button>
      </form>
    </>
  );
}
