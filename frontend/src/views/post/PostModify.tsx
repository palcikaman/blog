import { Button, CircularProgress, Typography } from "@material-ui/core";
import Layout from "components/Layout";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { getPost, modifyPost } from "shared/api/post.api";
import { Post } from "shared/types/post.type";
import PostForm, { PostFormValues } from "./components/PostForm";

type Params = {
  id: string;
};

type Props = RouteComponentProps<Params>;

const PostModify = ({ match }: Props) => {
  const { t } = useTranslation();
  const history = useHistory();

  const { id } = match.params;
  const { data: post } = useQuery(["post", id], async () => {
    const { data } = await getPost(id);
    return data;
  });

  const form = useForm<PostFormValues>();

  const mutation = useMutation<Post, any, PostFormValues>(
    async (values) => {
      if (post) {
        const { data } = await modifyPost({ ...post, ...values });
        return data;
      }
      return Promise.reject();
    },
    {
      onSuccess: (post) => {
        history.push(`/post/${post.id}`);
      },
    }
  );

  useEffect(() => {
    if (post) {
      form.reset({ title: post.title, content: post.content });
    }
  }, [post]); //eslint-disable-line

  return (
    <Layout>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
          <Typography variant="h4">{t("post.modifyTitle")}</Typography>
          <PostForm />
          {mutation.isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: 8 }}
            >
              {t("button.save")}
            </Button>
          )}
        </form>
      </FormProvider>
    </Layout>
  );
};

export default PostModify;
