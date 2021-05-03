import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { deletePost } from "shared/api/post.api";
import { Post } from "shared/types/post.type";

type Props = {
  post: Post;
};

const PostDeleteModal = ({ post }: Props) => {
  const history = useHistory();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const mutation = useMutation(
    async () => {
      await deletePost(post.id);
    },
    {
      onSuccess: () => {
        history.push("");
      },
    }
  );

  return (
    <>
      <Tooltip title={t("button.delete").toString()}>
        <IconButton onClick={() => setOpen(true)}>
          <Delete />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t("post.deleteTitle")}</DialogTitle>
        <DialogContent>
          {t("post.deleteConfirmation")}
          <Typography align="center">{post.title}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => mutation.mutate()}>
            {t("button.delete")}
          </Button>
          <Button onClick={() => setOpen(false)}>{t("button.cancel")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostDeleteModal;
