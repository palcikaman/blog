import { Button, CircularProgress, Typography } from "@material-ui/core";
import Layout from "components/Layout";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { createPost } from "shared/api/post.api";
import PostForm, { PostFormValues } from "./components/PostForm";

const PostCreate = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const form = useForm<PostFormValues>();

  const mutation = useMutation<number, any, PostFormValues>(
    async (values) => {
      const { data } = await createPost(values);
      return data.id;
    },
    {
      onSuccess: (id) => {
        history.push(`/post/${id}`);
      },
    }
  );

  return (
    <Layout>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
          <Typography variant="h4">{t("post.createTitle")}</Typography>
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

export default PostCreate;
