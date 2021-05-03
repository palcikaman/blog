import { Pagination } from "@material-ui/lab";
import Layout from "components/Layout";
import { useQuery } from "react-query";
import { Link, useHistory, useLocation } from "react-router-dom";
import { getPosts } from "shared/api/post.api";
import Post from "./components/Post";

type Search = {
  page: string;
};

const PostList = () => {
  const history = useHistory();

  const page =
    Number(new URLSearchParams(useLocation<Search>().search).get("page")) || 1;

  const query = useQuery(["posts", page], async () => {
    const { data } = await getPosts(page - 1, 5);
    return data;
  });

  return (
    <Layout>
      {query.isFetching ? (
        "loading..."
      ) : (
        <>
          {query.data?.page.map((post) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              style={{ color: "black", textDecoration: "none" }}
            >
              <Post post={post} preview />
            </Link>
          ))}
          <Pagination
            count={query.data?.totalPages}
            page={page}
            onChange={(event, value) => {
              history.push(`?page=${value}`);
            }}
            style={{ display: "flex", justifyContent: "center" }}
            color="primary"
          />
        </>
      )}
    </Layout>
  );
};

export default PostList;
