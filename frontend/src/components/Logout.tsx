import { Button, Popover } from "@material-ui/core";
import { StoreState, useAppDispatch } from "config/store";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { logout } from "shared/redux/autherntication.reducer";

const Logout = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  const { user } = useSelector((state: StoreState) => state.authentication);

  return (
    <>
      <Button onClick={(e) => setAnchor(e.currentTarget)}>
        {user?.username}
      </Button>
      <Popover
        open={!!anchor}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Button onClick={() => dispatch(logout())}>{t("button.logout")}</Button>
      </Popover>
    </>
  );
};

export default Logout;
