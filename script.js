if (window.top !== window) { document.documentElement.classList.add('in-panel'); }
$(document).ready(function () {
    function applyTheme() {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            $("body").attr("data-theme", "dark");
            $("#btnThemeToggle").text("☀️ Mode Terang");
        } else {
            $("body").removeAttr("data-theme");
            $("#btnThemeToggle").text("🌙 Mode Gelap");
        }
    }

    applyTheme();

    $("#btnThemeToggle").click(function () {
        if ($("body").attr("data-theme") === "dark") {
            $("body").removeAttr("data-theme");
            localStorage.setItem("theme", "light");
            $(this).text("🌙 Mode Gelap");
        } else {
            $("body").attr("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            $(this).text("☀️ Mode Terang");
        }
    });

    function showToast(message) {
        const toast = $("<div>")
            .addClass("toast")
            .text(message);

        $("#toastContainer").append(toast);

        setTimeout(function () {
            toast.remove();
        }, 2500);
    }

    const commentsData = {
        1: [],
        2: [
            {
                id: "c1",
                author: "Brandon",
                text: "Genshin Impact bagus banget buat eksplorasi!",
                likes: 5,
                dislikes: 0,
                liked: false,
                disliked: false,
                isUser: false,
                replies: [
                    {
                        id: "r1",
                        author: "Rian",
                        text: "Setuju, grafisnya juga keren untuk game mobile/PC.",
                        likes: 2,
                        dislikes: 0,
                        liked: false,
                        disliked: false,
                        isUser: false
                    }
                ]
            }
        ],
        3: [],
        4: []
    };

    let activePostId = null;

    $(".btn-like").click(function () {
        const button = $(this);
        const count = button.find(".count-label");
        const currentCount = parseInt(button.attr("data-count"));

        if (button.hasClass("active-like")) {
            button.removeClass("active-like");
            count.text(currentCount);
        } else {
            button.addClass("active-like");
            count.text(currentCount + 1);

            const dislikeButton = button.parent().find(".btn-dislike");

            if (dislikeButton.hasClass("active-dislike")) {
                dislikeButton.removeClass("active-dislike");

                const dislikeCount = parseInt(
                    dislikeButton.attr("data-count")
                );

                dislikeButton.find(".count-label").text(dislikeCount);
            }
        }
    });

    $(".btn-dislike").click(function () {
        const button = $(this);
        const count = button.find(".count-label");
        const currentCount = parseInt(button.attr("data-count"));

        if (button.hasClass("active-dislike")) {
            button.removeClass("active-dislike");
            count.text(currentCount);
        } else {
            button.addClass("active-dislike");
            count.text(currentCount + 1);

            const likeButton = button.parent().find(".btn-like");

            if (likeButton.hasClass("active-like")) {
                likeButton.removeClass("active-like");

                const likeCount = parseInt(
                    likeButton.attr("data-count")
                );

                likeButton.find(".count-label").text(likeCount);
            }
        }
    });

    function getCommentCount(comments) {
        let total = comments.length;

        comments.forEach(function (comment) {
            if (comment.replies) {
                total += comment.replies.length;
            }
        });

        return total;
    }

    function renderComments(postId) {
        const commentTree = $("#commentTree");

        commentTree.empty();

        const comments = commentsData[postId] || [];

        $("#modalCommentCount").text(
            getCommentCount(comments)
        );

        $(
            `.post-card[data-post-id="${postId}"] .comment-count-label`
        ).text(
            getCommentCount(comments)
        );

        comments.forEach(function (comment) {
            const commentItem = createComment(comment, postId);
            commentTree.append(commentItem);
        });
    }

    function createComment(comment, postId) {
        const commentItem = $("<div>")
            .addClass("comment-item")
            .attr("data-comment-id", comment.id);

        const header = $("<div>")
            .addClass("comment-header");

        const author = $("<span>")
            .addClass("comment-author")
            .text(comment.author);

        header.append(author);

        const text = $("<p>")
            .addClass("comment-text")
            .text(comment.text);

        const toolbar = $("<div>")
            .addClass("comment-toolbar");

        const likeButton = $("<button>")
            .addClass("btn-comment-act btn-comment-like")
            .text("♥ Suka (" + comment.likes + ")");

        const dislikeButton = $("<button>")
            .addClass("btn-comment-act btn-comment-dislike")
            .text("Tidak Suka (" + comment.dislikes + ")");

        const replyButton = $("<button>")
            .addClass("btn-comment-act btn-reply-trigger")
            .text("Balas");

        toolbar.append(
            likeButton,
            dislikeButton,
            replyButton
        );

        if (comment.isUser) {
            const deleteButton = $("<button>")
                .addClass("btn-comment-act btn-delete")
                .text("Hapus");

            toolbar.append(deleteButton);

            deleteButton.click(function () {
                commentsData[postId] =
                    commentsData[postId].filter(function (item) {
                        return item.id !== comment.id;
                    });

                showToast("Komentar berhasil dihapus.");
                renderComments(postId);
            });
        }

        const reportButton = $("<button>")
            .addClass("btn-comment-act btn-report-comment")
            .text("Laporkan");

        toolbar.append(reportButton);

        likeButton.click(function () {
            if (comment.liked) {
                comment.liked = false;
                comment.likes--;
            } else {
                comment.liked = true;
                comment.likes++;

                if (comment.disliked) {
                    comment.disliked = false;
                    comment.dislikes--;
                }
            }

            renderComments(postId);
        });

        dislikeButton.click(function () {
            if (comment.disliked) {
                comment.disliked = false;
                comment.dislikes--;
            } else {
                comment.disliked = true;
                comment.dislikes++;

                if (comment.liked) {
                    comment.liked = false;
                    comment.likes--;
                }
            }

            renderComments(postId);
        });

        replyButton.click(function () {
            if (commentItem.find(".reply-input-box").length) {
                commentItem.find(".reply-input-box").remove();
                return;
            }

            const replyBox = $("<div>")
                .addClass("reply-input-box");

            const replyInput = $("<input>")
                .addClass("input-field input-reply-text")
                .attr("type", "text")
                .attr("placeholder", "Tulis balasan...")
                .val("@" + comment.author + " ");

            const sendButton = $("<button>")
                .addClass("btn btn-primary")
                .text("Kirim");

            replyBox.append(
                replyInput,
                sendButton
            );

            commentItem.append(replyBox);

            replyInput.focus();

            sendButton.click(function () {
                const replyText = replyInput.val().trim();

                if (!replyText) {
                    showToast("Tulis balasan terlebih dahulu.");
                    return;
                }

                comment.replies.push({
                    id: "reply_" + Date.now(),
                    author: "Guest (Saya)",
                    text: replyText,
                    likes: 0,
                    dislikes: 0,
                    liked: false,
                    disliked: false,
                    isUser: true
                });

                showToast("Balasan terkirim.");
                renderComments(postId);
            });
        });

        if (comment.replies && comment.replies.length > 0) {
            const repliesContainer = $("<div>")
                .addClass("replies-container");

            comment.replies.forEach(function (reply) {
                const replyItem = $("<div>")
                    .addClass("comment-item");

                const replyHeader = $("<div>")
                    .addClass("comment-header");

                const replyAuthor = $("<span>")
                    .addClass("comment-author")
                    .text(reply.author);

                replyHeader.append(replyAuthor);

                const replyText = $("<p>")
                    .addClass("comment-text")
                    .text(reply.text);

                const replyToolbar = $("<div>")
                    .addClass("comment-toolbar");

                const replyLike = $("<button>")
                    .addClass("btn-comment-act")
                    .text("♥ Suka (" + reply.likes + ")");

                replyToolbar.append(replyLike);

                if (reply.isUser) {
                    const replyDelete = $("<button>")
                        .addClass("btn-comment-act btn-delete")
                        .text("Hapus");

                    replyToolbar.append(replyDelete);

                    replyDelete.click(function () {
                        comment.replies =
                            comment.replies.filter(function (item) {
                                return item.id !== reply.id;
                            });

                        showToast("Balasan berhasil dihapus.");
                        renderComments(postId);
                    });
                }

                replyItem.append(
                    replyHeader,
                    replyText,
                    replyToolbar
                );

                repliesContainer.append(replyItem);
            });

            commentItem.append(repliesContainer);
        }

        commentItem.prepend(header);
        commentItem.append(text);
        commentItem.append(toolbar);

        return commentItem;
    }

    $(".btn-open-thread").click(function () {
        const button = $(this);

        activePostId = button.attr("data-id");

        $("#modalPostAuthor")
            .text(button.attr("data-author"));

        $("#modalPostTitle")
            .text(button.attr("data-title"));

        $("#modalPostContent")
            .text(button.attr("data-content"));

        if (!commentsData[activePostId]) {
            commentsData[activePostId] = [];
        }

        renderComments(activePostId);

        $("#threadModal").css("display", "flex");
    });

    $("#btnCloseThreadModal").click(function () {
        $("#threadModal").hide();
    });

    $("#btnSendMainComment").click(function () {
        const input = $("#inputMainComment");
        const text = input.val().trim();

        if (!text) {
            showToast("Tulis komentar terlebih dahulu.");
            return;
        }

        commentsData[activePostId].push({
            id: "comment_" + Date.now(),
            author: "Guest (Saya)",
            text: text,
            likes: 0,
            dislikes: 0,
            liked: false,
            disliked: false,
            isUser: true,
            replies: []
        });

        input.val("");

        showToast("Komentar terkirim.");

        renderComments(activePostId);
    });

    $(document).on("click", ".btn-report-post, .btn-report-comment", function () {
    $("#reportModal").css("display", "flex");
    });

    $("#btnCloseReportModal").click(function () {
        $("#reportModal").hide();
    });

    $("#btnSubmitReport").click(function () {
        $("#reportModal").hide();
        showToast("Laporan berhasil dikirim.");
    });

    $(window).click(function (e) {
        if (e.target === $("#threadModal")[0]) {
            $("#threadModal").hide();
        }

        if (e.target === $("#reportModal")[0]) {
            $("#reportModal").hide();
        }
    });
});
