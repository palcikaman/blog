import { Button, Popover } from "@material-ui/core";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageChooser = () => {
  const { i18n } = useTranslation();
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  function onClick(language: string) {
    i18n.changeLanguage(language);
    setAnchor(null);
  }

  return (
    <>
      <Button onClick={(e) => setAnchor(e.currentTarget)}>
        {i18n.language}
      </Button>
      <Popover
        open={!!anchor}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        PaperProps={{ style: { display: "flex", flexDirection: "column" } }}
      >
        <Button onClick={() => onClick("en")}>English (EN)</Button>
        <Button onClick={() => onClick("hu")}>Magyar (HU)</Button>
      </Popover>
    </>
  );
};

export default LanguageChooser;
