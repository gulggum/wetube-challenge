const videoContainer = document.querySelector("#videoContainer");
const form = document.querySelector("#commentForm");

const addComment = (text) => {
  const videoComments = document.querySelector("#video_comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  const span = document.createElement("span");
  span.innerText = `${text}`;
  newComment.appendChild(span);
  videoComments.prepend(newComment);
};

const handleTextSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const { status } = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  if (status === 201) {
    addComment(text);
  }
};

if (form) {
  form.addEventListener("submit", handleTextSubmit);
}
