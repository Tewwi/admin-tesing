import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IPost } from "../../interface/post";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Button } from "@mui/material";
import Loading from "../common/Loading";

interface IPostTableProps {
  data: IPost[];
  handleViewDetail: (post: IPost) => void;
  loading: boolean;
}

const PostTable = (props: IPostTableProps) => {
  const { data, handleViewDetail, loading } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">User ID</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((post) => (
            <TableRow
              key={post.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="post">
                {post.id}
              </TableCell>
              <TableCell align="left">{post.userId}</TableCell>
              <TableCell align="left">{post.title}</TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  onClick={() => handleViewDetail(post)}
                >
                  <RemoveRedEyeIcon color="inherit" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Loading height={50} open={loading} />
    </TableContainer>
  );
};

export default PostTable;
