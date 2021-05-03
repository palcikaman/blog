import {
  FormHelperText,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const useStyles = makeStyles(
  ({ palette }) => ({
    editorContainer: {
      marginBottom: 16,
      "&$editorError .tox-tinymce": { borderColor: palette.error.main },
    },
    editorError: {},
  }),
  { name: "PostForm" }
);

export type PostFormValues = {
  title: string;
  content: string;
};

const PostForm = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const form = useFormContext<PostFormValues>();

  return (
    <>
      <Controller
        name="title"
        defaultValue=""
        rules={{
          required: t("validation.required").toString(),
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("post.props.title")}
            error={!!form.formState.errors.title}
            helperText={form.formState.errors.title?.message}
          />
        )}
      />
      <div
        className={clsx(classes.editorContainer, {
          [classes.editorError]: form.formState.errors.content,
        })}
      >
        <Controller
          name="content"
          defaultValue=""
          rules={{
            required: t("validation.required").toString(),
          }}
          render={(props) => (
            <Editor
              init={{
                height: 300,
                plugins:
                  "charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists",
                menubar: false,
                toolbar: `
              bold italic underline strikethrough |
              fontselect fontsizeselect formatselect |
              alignleft aligncenter alignright alignjustify |
              outdent indent |
              numlist bullist |
              forecolor backcolor removeformat |
              pagebreak |
              link`,
                toolbar_sticky: true,
                statusbar: false,
                language: i18n.language,
              }}
              value={props.field.value}
              onEditorChange={(content) => {
                props.field.onChange(content);
              }}
            />
          )}
        />
        {form.formState.errors.content && (
          <Typography>
            <FormHelperText error variant="outlined">
              {form.formState.errors.content.message}
            </FormHelperText>
          </Typography>
        )}
      </div>
    </>
  );
};

export default PostForm;
