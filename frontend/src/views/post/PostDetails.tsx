import Layout from "components/Layout";
import React from "react";
import { useQuery } from "react-query";
import { Link, RouteComponentProps } from "react-router-dom";
import { getPost } from "shared/api/post.api";
import { CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import { Create } from "@material-ui/icons";
import Post from "./components/Post";
import PostDeleteModal from "./components/PostDeleteModal";
import { useTranslation } from "react-i18next";

type Params = {
  id: string;
};

type Props = RouteComponentProps<Params>;

const PostDetails = ({ match }: Props) => {
  const { t } = useTranslation();
  const { id } = match.params;
  const { data: post, ...query } = useQuery(["post", id], async () => {
    const { data } = await getPost(id);
    return data;
  });

  return (
    <Layout>
      {query.isFetching ? (
        <CircularProgress />
      ) : post ? (
        <>
          <Post
            post={post}
            actions={
              <>
                <Tooltip title={t("button.modify").toString()}>
                  <Link
                    to={`/post/${post.id}/modify`}
                    style={{ marginLeft: "auto" }}
                  >
                    <IconButton>
                      <Create />
                    </IconButton>
                  </Link>
                </Tooltip>
                <PostDeleteModal post={post} />
              </>
            }
          />
        </>
      ) : (
        "BAJ"
      )}
    </Layout>
  );
};

export default PostDetails;
