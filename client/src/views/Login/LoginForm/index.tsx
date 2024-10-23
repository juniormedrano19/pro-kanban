import clsx from "clsx";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Footer } from "./Footer";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SignUpSchemaType } from "../../../application/types";
import Loading from "../../../components/Loading";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux";
import { setUser } from "../../../redux/slices/kanbanSlice";
import { socket } from "../../../utils/constants/socket";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const socketRef: any = useRef();
  socketRef.current = socket;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
    dispatch(setUser(data.username));
    localStorage.setItem("user", data.username);
    socketRef.current.emit("ADD_USER", {
      username: data.username,
      id: socketRef.current.id,
    });
    setIsLoading(true);
    setTimeout(() => {
      navigate("/kanban");
      setIsLoading(false);
    }, 3000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 flex-col items-center justify-center px-10 relative"
    >
      <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md">
        <div className="flex flex-col space-y-2 ">
          <h2 className="text-3xl md:text-4xl font-bold">Login</h2>
          <p className="text-md md:text-xl">
            Please enter your username to log in and access the platform
            features.
          </p>
        </div>
        <div className="flex flex-col max-w-md space-y-5">
          <input
            type="text"
            placeholder="Provide a username"
            className={clsx(
              "flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal mb-[-10px]",
              { "border-red-500": errors.username }
            )}
            {...register("username")}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}

          <button
            className={clsx(
              "flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white",
              {
                "!bg-[#ddd] !border-[#ccc] cursor-not-allowed !text-[#666]":
                  !isValid || isLoading,
              }
            )}
            type="submit"
            disabled={!isValid || isLoading}
          >
            {isLoading ? (
              <Loading size={24} firstColor={"#000"} secondColor={"#d8d8d8"} />
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </div>
      <Footer />
    </form>
  );
};
