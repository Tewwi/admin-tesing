import { CssBaseline } from "@mui/material";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/common/Loading";
import Layout from "./components/layout/layout";
import { chartOption, routerPath } from "./contanst";
import Dashboard from "./pages/Dashboard";
import PostsManagement from "./pages/PostsManagement";
import Setting from "./pages/Setting";

function App() {
  return (
    <Suspense fallback={<Loading height={80} open={true} />}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={`${routerPath.DASHBOARD}/${chartOption.SUBCRIPTION}`}
                replace={true}
              />
            }
          />
          <Route
            path={routerPath.DASHBOARD}
            element={<Navigate to={chartOption.SUBCRIPTION} replace={true} />}
          />
          <Route
            path={`${routerPath.DASHBOARD}/:chartInfo`}
            element={<Dashboard />}
          />
          <Route
            path={routerPath.POSTS_MANAGEMENT}
            element={<PostsManagement />}
          />
          <Route path={routerPath.SETTINGS} element={<Setting />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}

export default App;
