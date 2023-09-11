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
    const post = postManager.posts.find(
      (post) => post.id === parseInt(req.query.id)
    );
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
  const post = postManager.posts.find(
    (post) => post.id === parseInt(req.params.id)
  );
  if (!post) {
    res.send(`해당 id(${req.params.id})의 값을가진 데이터가 없습니다.`);
  } else {
    postManager.posts = postManager.posts.filter(
      (post) => post.id !== parseInt(req.params.id)
    );
    res.send(`해당 id(${req.params.id})의 값을가진 데이터가 삭제되었습니다.`);
  }
});

//C - post추가
app.post("/post", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  if (!title || !content) {
    res.status(400).send("id, title, content값중 빈 값이 있습니다.");
  } else {
    postManager.posts.push({
      id: postManager.index,
      title: title,
      content: content,
    });
    res.send("새로운 post를 추가하였습니다.");
    postManager.index++;
  }
});

//U - post수정
app.put("/post/:id", (req, res) => {
  const { title, content } = req.body;

  //id 글 검색
  post = postManager.posts.find((post) => post.id === parseInt(req.params.id));
  if (!post) {
    res
      .status(400)
      .send(`해당 id(${req.params.id})의 값을가진 데이터가 없습니다.`);
  } else {
    post.title = title;
    post.content = content;
    res.send("Post가 성공적으로 업데이트되었습니다!");
  }
});

app.listen(PORT);
