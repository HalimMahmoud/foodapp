import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance, Users_URLS } from "../../service/utils";
import { forgetSehemaValidation } from "../../service/vaildators";
export default function Forget() {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(forgetSehemaValidation),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        Users_URLS.FORGET_PASSWORD,
        data
      );
      navigate("/reset", { state: { email: data.email } });

      toast.success(response.data.message, {
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "light",
      });
    }
  };
  return (
    <div className="w-100">
      <h3 className="h5">Forgot Your Password?</h3>
      <p className="text-muted">
        No worries! Please enter your email and we will send a password reset
        link
      </p>

      <form className="" role="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <div className="input-group-prepend ">
            <span className="input-group-text w-100 h-100" id="basic-addon1">
              <i className="fa fa-envelope"></i>
            </span>
          </div>
          <input
            {...register("email")}
            type="text"
            className="form-control"
            placeholder="Enter your E-mail"
            aria-label="Email"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.email && (
          <div className="pb-3 text-danger">{errors.email.message}</div>
        )}
        <button
          type="submit"
          className="btn btn-success w-100 mt-5"
          disabled={isSubmitting}
        >
          {isSubmitting ? <i className="fa fa-spinner"></i> : "Submit"}
        </button>
      </form>
    </div>
  );
}
