export interface IPost {
  id: string;
  userId: string;
  title: string;
  body: string;
}

export interface IFilterPost {
  query: string;
  by: "userId" | "title";
}
