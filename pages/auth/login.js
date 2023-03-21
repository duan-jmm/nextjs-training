import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Form, Input, message } from "antd";
import { useFormik } from "formik";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
// import MetaHead from "@moonlay/src/components/shared-layout/meta.head";

export default function Index(props) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().max(30, "Must be 30 characters or less").email("Invalid email address").required("Please enter your email"),
      password: Yup.string().required("Please enter your password"),
    }),

    onSubmit: async (values) => {
      message.loading({
        content: "loading...",
        duration: 10,
        key: "updatable",
      });
      const { error } = await signIn("credentials", {
        email: values.email,
        password: values?.password,
        redirect: false,
      });

      if (error) {
        // handle error
        message.error({
          content: "Email atau password salah",
          duration: 5,
          key: "updatable",
        });
      } else {
        message.success({
          content: "Berhasil Masuk",
          duration: 5,
          key: "updatable",
        });
        router.push(router?.query?.callbackUrl ? router?.query?.callbackUrl : window && window.origin);
      }
    },
  });

  const [show, setShow] = useState(false);
  const ShowPassword = () => setShow(!show);
  return (
    <React.Fragment>
      <div className="w-full flex items-center justify-center h-screen bg-gray-100">
        <div className={"w-full flex justify-center"}>
          <div className="px-6 lg:px-10 bg-white dark:bg-scheme-dark-primary  shadow-lg rounded-xl w-full max-w-lg py-10 space-y-4 lg:space-y-8">
            <div className="w-full">
              <h1 className={"text-gray-600 font-sf-bold dark:text-gray-200 text-2xl font-semibold text-center"}>LOGIN</h1>
            </div>

            <form onSubmit={formik.handleSubmit} autoComplete={"off"} className="space-y-4 flex flex-col ">
              <label htmlFor="email">
                <Input
                  status={formik.errors && formik.touched && formik.touched.email && formik.errors.email ? "error" : "default"}
                  size={"large"}
                  name={"email"}
                  type={"email"}
                  placeholder={"email"}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors && formik.touched && formik.touched.email && formik.errors.email && (
                  <span className={"text-xs text-red-500"}>{formik.errors?.email}</span>
                )}
              </label>
              <label htmlFor="password">
                <Input
                  status={formik.errors && formik.touched && formik.touched.password && formik.errors.password ? "error" : "default"}
                  size={"large"}
                  name={"password"}
                  type={`${show ? "text" : "password"}`}
                  addonAfter={show ? <EyeInvisibleOutlined onClick={ShowPassword} /> : <EyeOutlined onClick={ShowPassword} />}
                  placeholder={"password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors && formik.touched && formik.touched.password && formik.errors.password && (
                  <span className={"text-xs text-red-500"}>{formik.errors?.password}</span>
                )}
              </label>

              <button
                type={"submit"}
                className={
                  "cursor-pointer border-0 focus:outline-0 outline-0  bg-gradient-to-r from-red-500 to-orange-400 transition duration-200 hover:bg-red-600 text-md font-semibold py-3 px-4 text-center rounded-full text-white"
                }
              >
                Masuk
              </button>

              <div>
                <div className={"flex items-center justify-center my-4"}>
                  <p className={"font-semibold text-gray-500 text-sm lg:text-base"}>
                    Belum punya akun?{" "}
                    <Link href={"/auth/register"}>
                      <span className={"underline text-red-500 cursor-pointer text-sm lg:text-base"}>Daftar Sekarang</span>
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      // data:[]
    },
  };
}
