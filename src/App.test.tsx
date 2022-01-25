import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Form, Input, Select } from "./Form";
import userEvent from "@testing-library/user-event";
import {waitFor } from "@testing-library/dom";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByLabelText(/test-input/i);
  expect(linkElement).toBeInTheDocument();
});

test("render", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: /Envoyer/i })).toBeInTheDocument();
});

test("should test input", async () => {
  const mockSave = jest.fn();
  render(
    <Form<{ lastName: string }> onSubmit={mockSave}>
      <Input name="lastName" ariaLabel="test-input" />
      <button>Envoyer</button>
    </Form>
  );
  const input = screen.getByLabelText(/test-input/i) as HTMLInputElement;
  userEvent.type(input, "paola");
  expect(input.value).toEqual("paola");
  userEvent.click(screen.getByRole("button", { name: /Envoyer/i }));
  await waitFor(() => {
    expect(mockSave).toHaveBeenCalled();
  });
});

test("select options", async () => {
  const mockSave = jest.fn();
  render(
    <Form onSubmit={mockSave}>
      <Select name="gender" options={["female", "male", "other"]} />
      <button>Envoyer</button>
    </Form>
  );
  const input = screen.getByLabelText(/test-input/i) as HTMLInputElement;
  userEvent.type(input, "paola");
  expect(input.value).toEqual("paola");
  userEvent.click(screen.getByRole("button", { name: /Envoyer/i }));
  await waitFor(() => {
    expect(mockSave).toHaveBeenCalled();
  });
});
