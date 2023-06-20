import { Container, Pagination, Typography } from "@mui/material";
import { ceil } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "../api";
import DetailPostDialog from "../components/posts_management/DetailPostDialog";
import FilterPostForm from "../components/posts_management/FilterPost";
import PostTable from "../components/posts_management/table";
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

  const [filterValue, setFilterValue] = useState<IFilterPost>(() => {
    return {
      query: currentQueryParameters.get("query") || "",
      by: (currentQueryParameters.get("by") as any) || "userId",
    };
  });

  const [page, setPage] = useState<number>(() => {
    if (currentQueryParameters.get("page"))
      return Number(currentQueryParameters.get("page"));
    return 1;
  });

  const handleGetPostData = useCallback(async () => {
    setLoading(true);

    const queryAPI = filterValue.query
      ? `${API_URL}?${filterValue.by}=${filterValue.query}`
      : API_URL;
    const dataJSON = await fetch(queryAPI);
    const data: IPost[] = await dataJSON.json();
    const endIndex = page * ITEM_PER_PAGE;

    setTotalPage(data.length);
    setPosts(data.slice(endIndex - ITEM_PER_PAGE, endIndex));
    setLoading(false);
  }, [filterValue, page]);

  const handleChangePage = (number: number) => {
    setPage(number);
    newQueryParameters.set("page", `${number}`);
    setSearchParams(newQueryParameters);
  };

  const handleOpenDetailDialog = (post: IPost) => {
    setDialogControl({ open: true, post });
  };

  const handleFilter = (value: IFilterPost) => {
    newQueryParameters.set("by", value.by);
    newQueryParameters.set("query", value.query);
    setSearchParams(newQueryParameters);
    setFilterValue(value);
  };

  useEffect(() => {
    handleGetPostData();
  }, [handleGetPostData]);

  return (
    <Container sx={{ py: "16px" }}>
      <Typography variant="h5" sx={{ color: "primary.main", mb: 4 }}>
        Post Management
      </Typography>

      <FilterPostForm value={filterValue} handleChange={handleFilter} />
      <PostTable
        data={posts}
        handleViewDetail={handleOpenDetailDialog}
        loading={loading}
      />
      <Pagination
        sx={{ mt: 2.5, display: "flex", justifyContent: "flex-end" }}
        count={ceil(totalPage / ITEM_PER_PAGE)}
        page={page}
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
