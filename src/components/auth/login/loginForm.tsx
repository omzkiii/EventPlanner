"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Button,
} from "@heroui/react";
import Link from "next/link";

export default function LoginForm() {
  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState(null);
  const [errors, setErrors] = React.useState({});

  // // Hydration
  // const [mounted, setMounted] = useState(false);
  // // Hydration Effect fixer
  // useEffect(() => {
  //   console.log("TEST");
  //
  //   setMounted(true);
  // }, []);
  // if (!mounted) {
  //   return null;
  // }

  // Real-time password validation

  // Save this for Registration
  const getPasswordError = (value: String) => {
    // Check if valid, throw invalid

    return null;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const data = Object.fromEntries(new FormData(e.currentTarget));

    // Custom validation checks
    const newErrors = {};

    // Password validation
    // const passwordError = getPasswordError(data.password);

    // if (passwordError) {
    //   newErrors.password = passwordError;
    // }

    // Username validation
    // if (data.name === "admin") {
    //   newErrors.name = "Nice try! Choose a different username";
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    //   if (data.terms !== "true") {
    //     setErrors({ terms: "Please accept the terms" });
    //
    //     return;
    //   }
    //
    //   // Clear errors and submit
    //   setErrors({});
    //   setSubmitted(data);
  };

  return (
    <Form
      id="Login"
      className="w-full justify-self-start my-6"
      validationErrors={errors}
      onReset={() => setSubmitted(null)}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 w-full">
        <Input
          isRequired
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return "Please enter your username or email address";
            }
            if (validationDetails.typeMismatch) {
              return "Value entered is invalid";
            }
          }}
          label="Username or Email"
          labelPlacement="inside"
          name="identifier"
        />{" "}
        {/** MAKE CUSTOM EMAIL CHECKER THEN RETURN STRING BACK */}
        <Input
          isRequired
          label="Password"
          labelPlacement="inside"
          name="password"
          type="password"
          value={password}
          onValueChange={setPassword}
        />
        <Link
          href="/register"
          className="text-secondary text-sm italic underline cursor-pointer"
        >
          Forgot your password?
        </Link>
        {/*
        <Select
          isRequired
          label="Country"
          labelPlacement="outside"
          name="country"
          placeholder="Select country"
        >
          <SelectItem key="ar">Argentina</SelectItem>
          <SelectItem key="us">United States</SelectItem>
          <SelectItem key="ca">Canada</SelectItem>
          <SelectItem key="uk">United Kingdom</SelectItem>
          <SelectItem key="au">Australia</SelectItem>
        </Select>

        <Checkbox
          isRequired
          classNames={{
            label: "text-small",
          }}
          // isInvalid={!!errors.terms}
          name="terms"
          validationBehavior="aria"
          value="true"
          onValueChange={() =>
            setErrors((prev) => ({ ...prev, terms: undefined }))
          }
        >
          I agree to the terms and conditions
        </Checkbox>

        {/* {errors.terms && ( */}
        {/*   <span className="text-danger text-small">{errors.terms}</span> */}
        {/* )} */}
        <div className="flex gap-4 mt-3">
          <Button
            className="w-full text-base text-background font-extrabold"
            color="secondary"
            type="submit"
          >
            LOG IN
          </Button>
          <Button className="text-base" type="reset" variant="bordered">
            RESET
          </Button>
        </div>
        <a className="font-mono text-sm text-muted">don't have an account?</a>
        <Link
          href="/register"
          className="text-secondary italic underline cursor-pointer"
        >
          Register Here
        </Link>
      </div>

      {submitted && (
        <div className="text-small text-default-500 mt-4">
          Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}
