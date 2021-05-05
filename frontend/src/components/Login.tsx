import { Button, Popover } from "@material-ui/core";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Login = () => {
  const { t } = useTranslation();

  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const [needRegistration, setNeedregistration] = useState(false);

  return (
    <>
      <Button onClick={(e) => setAnchor(e.currentTarget)}>
        {t("button.login")}
      </Button>
      <Popover
        open={!!anchor}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        PaperProps={{
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gridGap: "1rem",
            padding: "1rem",
            maxWidth: 400,
          },
        }}
      >
        {needRegistration ? (
          <>
            <SignupForm />
            <Button
              onClick={() => setNeedregistration(false)}
              style={{ textTransform: "none" }}
            >
              {t("toLogin")}
            </Button>
          </>
        ) : (
          <>
            <LoginForm />
            <Button
              onClick={() => setNeedregistration(true)}
              style={{ textTransform: "none" }}
            >
              {t("toSignup")}
            </Button>
          </>
        )}
      </Popover>
    </>
  );
};

export default Login;
