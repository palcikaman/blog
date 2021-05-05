import { Button, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { signup } from "shared/api/user.api";

type SignupFormValues = {
  username: string;
  email: string;
  password: string;
};

const SignupForm = () => {
  const { t } = useTranslation();

  const form = useForm<SignupFormValues>();

  const mutation = useMutation<any, any, SignupFormValues>(async (values) => {
    await signup(values);
  });

  return (
    <form
      onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {mutation.isSuccess ? (
        <Typography style={{ color: "green" }}>{t("signupSuccess")}</Typography>
      ) : (
        <>
          <Controller
            name="username"
            defaultValue=""
            rules={{
              required: t("validation.required").toString(),
            }}
            control={form.control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("user.props.username")}
                error={!!form.formState.errors.username}
                helperText={form.formState.errors.username?.message}
              />
            )}
          />
          <Controller
            name="email"
            defaultValue=""
            rules={{
              required: t("validation.required").toString(),
            }}
            control={form.control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("user.props.email")}
                error={!!form.formState.errors.email}
                helperText={form.formState.errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            defaultValue=""
            rules={{
              required: t("validation.required").toString(),
            }}
            control={form.control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label={t("user.props.password")}
                error={!!form.formState.errors.password}
                helperText={form.formState.errors.password?.message}
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary">
            {t("button.signup")}
          </Button>
        </>
      )}
    </form>
  );
};

export default SignupForm;
