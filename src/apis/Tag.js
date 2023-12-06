import request from "./request";

const Tag = {
  all: () => request.get("/tags"),
};

export default Tag;
