import { Button, FormHelperText, TextField } from "@material-ui/core";
import { StoreState, useAppDispatch } from "config/store";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { login } from "shared/redux/autherntication.reducer";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { error } = useSelector((state: StoreState) => state.authentication);
  const form = useForm<LoginFormValues>();

  return (
    <form
      onSubmit={form.handleSubmit((values) => dispatch(login(values)))}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
        {t("button.login")}
      </Button>
      {error && <FormHelperText error>{t("loginError")}</FormHelperText>}
    </form>
  );
};

export default LoginForm;
