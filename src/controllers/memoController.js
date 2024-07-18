import Memo from "../models/Memo";
import formatHashtags from "../models/Memo";

export const memoPage = async (req, res) => {
  const memo = await Memo.find({}).sort({ writeTime: "asc" });
  return res.render("./memos/memoPage", { pageTitle: "Memo Board", memo });
};

export const getMemoUpload = (req, res) => {
  return res.render("./memos/memoUpload", { pageTitle: "New Memo" });
};

export const memoWatch = async (req, res) => {
  const { id } = req.params;
  const memo = await Memo.findById(id);

  if (!memo) {
    return res.render("404", { pageTitle: "❌ Memo not found" });
  }
  return res.render("./memos/memoWatch", { pageTitle: `${memo.title}`, memo });
};

export const postMemoUpload = async (req, res) => {
  const { author, title, content, hashtags } = req.body;
  try {
    await Memo.create({
      author,
      title,
      content,
      hashtags: formatHashtags(hashtags),
    });
    return res.redirect("/memo");
  } catch (error) {
    return res.render("./memos/memoUpload", {
      pageTitle: "New Memo",
      errorMessage: error.code,
    });
  }
};

export const getMemoEdit = async (req, res) => {
  const { id } = req.params;
  const memo = await Memo.findById(id);
  if (!memo) {
    return res.render("404", { pageTitle: "Memo not found" });
  }
  return res.render("./memos/memoEdit", { pageTitle: `${memo.title}` });
};

export const postMemoEdit = async (req, res) => {
  const { id } = req.params;
  const { author, title, content, hashtags } = req.body;
  const memo = await Memo.findById(id);
  console.log(`😍 ${memo} 😍`);
  if (!memo) {
    return res.render("404", { pageTitle: "Memo not found", memo });
  }
  await Memo.findByIdAndUpdate(id, {
    author,
    title,
    content,
    hashtags: formatHashtags(hashtags),
  });
  return res.redirect(`/memo/${id}`);
};

export const memoDelete = async (req, res) => {
  const { id } = req.params;
  await Memo.findByIdAndDelete(id);
  return res.redirect("/memo");
};

export const memoSearch = async (req, res) => {
  const { keyword } = req.query;
  let memo = [];
  if (keyword) {
    memo = await Memo.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  return res.render("./memos/memoSearch", { pageTitle: "Search Page", memo });
};
