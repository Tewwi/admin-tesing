import { Container, Pagination, Typography } from "@mui/material";
import { ceil } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "../api";
import DetailPostDialog from "../components/posts_management/DetailPostDialog";
import FilterPostForm from "../components/posts_management/FilterPost";
import PostTable from "../components/posts_management/PostTable";
import { ITEM_PER_PAGE } from "../contanst";
import { IFilterPost, IPost } from "../interface/post";

interface IDialogControl {
  open: boolean;
  post?: IPost;
}

const PostsManagement = () => {
  const [currentQueryParameters, setSearchParams] = useSearchParams();
  const newQueryParameters: URLSearchParams = new URLSearchParams();

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [totalPage, setTotalPage] = useState<number>(100);
  const [dialogControl, setDialogControl] = useState<IDialogControl>({
    open: false,
  });

  const handleGetPostData = useCallback(async () => {
    setLoading(true);

    const page = Number(currentQueryParameters.get("page")) || 1;
    const query = currentQueryParameters.get("query");
    const by = currentQueryParameters.get("by");

    const dataJSON = await fetch(API_URL);
    const data: IPost[] = await dataJSON.json();
    const endIndex = page * ITEM_PER_PAGE;
    let result: IPost[] = data;

    if (query !== "") {
      switch (by) {
        case "userId":
          result = data.filter((post) => post.id === query);
          break;
        case "title":
          result = data.filter((post) => post.title.includes(query || ""));
          break;
        default:
          break;
      }
    }

    setTotalPage(data.length);
    setPosts(result.slice(endIndex - ITEM_PER_PAGE, endIndex));
    setLoading(false);
  }, [currentQueryParameters]);

  const handleChangePage = (number: number) => {
    currentQueryParameters.set("page", `${number}`);
    setSearchParams(currentQueryParameters);
  };

  const handleOpenDetailDialog = (post: IPost) => {
    setDialogControl({ open: true, post });
  };

  const handleFilter = (value: IFilterPost) => {
    newQueryParameters.set("by", value.by);
    newQueryParameters.set("query", value.query);
    newQueryParameters.set("page", `1`);
    setSearchParams(newQueryParameters);
  };

  useEffect(() => {
    handleGetPostData();
  }, [handleGetPostData]);

  return (
    <Container sx={{ py: "16px" }}>
      <Typography variant="h5" sx={{ color: "primary.main", mb: 4 }}>
        Post Management
      </Typography>

      <FilterPostForm
        value={{
          query: currentQueryParameters.get("query") || "",
          by: (currentQueryParameters.get("by") as any) || "userId",
        }}
        handleChange={handleFilter}
      />
      <PostTable
        data={posts}
        handleViewDetail={handleOpenDetailDialog}
        loading={loading}
      />
      <Pagination
        sx={{ mt: 2.5, display: "flex", justifyContent: "flex-end" }}
        count={ceil(totalPage / ITEM_PER_PAGE)}
        page={Number(currentQueryParameters.get("page")) || 1}
        color="primary"
        onChange={(_, number) => {
          handleChangePage(number);
        }}
      />

      <DetailPostDialog
        open={dialogControl.open}
        handleClose={() =>
          setDialogControl((prev) => ({ ...prev, open: false }))
        }
        data={dialogControl.post}
      />
    </Container>
  );
};

export default PostsManagement;
