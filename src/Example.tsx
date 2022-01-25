import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "./Form";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

let countRender = 0;

const wait = function (duration = 1000) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};

function Form() {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: {
      isValid,
      isDirty,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
    },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: {
      firstName: "pp",
      lastName: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await wait(2000);
  };

  countRender++;

  return (
    <>
      {countRender}
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSubmitSuccessful && <div>Formulaire soumis avec succès</div>}
        <input {...register("firstName", { required: true })} />
        <input {...register("lastName", { required: true })} />
        <Controller
          control={control}
          name="ReactDatepicker"
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker selected={value} onChange={onChange} />
          )}
        />

        <input type="submit" disabled={isSubmitting} />
      </form>
    </>
  );
}

export default Form;
