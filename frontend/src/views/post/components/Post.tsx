import { Box, Card, makeStyles, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import parser from "html-react-parser";
import { Post as PostType } from "shared/types/post.type";
import React from "react";
import clsx from "clsx";

const useStyles = makeStyles(
  {
    card: {
      padding: "1rem",
      marginBottom: "1rem",
      "&$small": {
        maxHeight: 150,
      },
    },
    date: {
      color: "grey",
    },
    small: {},
  },
  { name: "Post" }
);

type Props = {
  post: PostType;
  preview?: boolean;
  actions?: React.ReactNode;
};

const Post = ({ post, preview, actions }: Props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card className={clsx(classes.card, { [classes.small]: preview })}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">{post.title}</Typography>
        <div>{actions}</div>
      </Box>
      <Typography variant="subtitle2" className={classes.date}>
        {t("datetime", { text: post.created })}
      </Typography>
      {parser(post.content)}
    </Card>
  );
};

export default Post;
