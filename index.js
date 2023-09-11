const express = require("express");
const app = express();
const router = express.Router();
const PORT = 3000;

app.use(express.json());
//posts 임시 저장
postManager = {
  posts: [
    { id: 1, title: "asd", content: "dsadasdas" },
    { id: 2, title: "asd", content: "dsadasdas" },
    { id: 3, title: "asd", content: "dsadasdas" },
  ],
  index: 4,
};

//R - query값에 따라 id검색 / title검색 / 전체 post 리턴
app.get("/post", (req, res) => {
  if (req.query.id) {
    const post = postManager.posts.find((post) => post.id === parseInt(req.query.id));
    if (!post) {
      res.send("error1");
    } else {
      res.send(post);
    }
  } else if (req.query.title) {
    const post = postManager.posts.find(
      (post) => post.title === req.query.title
    );
    if (!post) {
      res.send("error2");
    } else {
      res.send(post);
    }
  } else {
    console.log(postManager.posts);
  }
});

//D - post삭제
app.delete("/post/:id", (req, res) => {
  const post = postManager.posts.find((post) => post.id === parseInt(req.params.id));
  if (!post) {
    res.send(`해당 id(${req.params.id})의 값을가진 데이터가 없습니다.`);
  } else {
    postManager.posts = postManager.posts.filter((post) => post.id !== parseInt(req.params.id));
    res.send(`해당 id(${req.params.id})의 값을가진 데이터가 삭제되었습니다.`);
  }
});

//C - post추가

//U - post수정


app.listen(PORT);

/*
// 글 정보를 담을 배열과 id
const posts = {
  data: [],
  id: 1,
};

// 글 전체 조회
app.get("/post", (req, res) => {
  res.send(posts.data);
});

// 글 등록
app.post("/post", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).send({ message: "Title, content는 필수 입력 사항입니다." });
    return;
  }
  posts.data.push({
    ...req.body,
    id: posts.id,
  });
  posts.id++;
  res.send({ message: "글을 등록했습니다." });
});

// 글 단일 조회
app.get("/post/:id", (req, res) => {
  const post = posts.data.find((post) => post.id === parseInt(req.params.id));
  if (!post) {
    res.status(400).send({ message: "존재하지 않는 글입니다." });
    return;
  }
  res.send(post);
});

// 글 수정
app.put("/post/:id", (req, res) => {
  const { title, content } = req.body;
  if (!req.params.id || !title || !content) {
    res
      .status(400)
      .send({ message: "id, title, content는 필수 입력 사항입니다." });
    return;
  }
  const post = posts.data.find((post) => post.id === parseInt(req.params.id));
  if (!post) {
    res.status(400).send({ message: "존재하지 않는 글입니다." });
    return;
  }
  post.title = title;
  post.content = content;
  res.send({ message: "글을 수정했습니다." });
});

// 글 삭제
app.delete("/post/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send({ message: "id는 필수 입력 사항입니다." });
    return;
  }
  const post = posts.data.find((post) => post.id === parseInt(req.params.id));
  if (!post) {
    res.status(400).send({ message: "존재하지 않는 글입니다." });
    return;
  }

  posts.data = posts.data.filter((_post) => _post.id !== post.id);
  res.send({ message: "글을 삭제했습니다." });
});
*/
