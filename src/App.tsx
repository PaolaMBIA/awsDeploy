import { SubmitHandler } from "react-hook-form";
import "./App.css";

import { DatePickerComponent, Form, Input, Inputs, Select } from "./Form";

function App() {
  const onsubmit: SubmitHandler<Inputs> = (event) => {
    console.log(event);
  };
  return (
    <main className="App">
      <Form<Inputs> onSubmit={onsubmit}>
        <Input name="lastName" ariaLabel="test-input" />
        <Select name="gender" options={["female", "male", "other"]} />
        <DatePickerComponent name="startdatepicker" />
        <DatePickerComponent name="enddatepicker" />
        <button>Envoyer</button>
      </Form>
    </main>
  );
}

export default App;
