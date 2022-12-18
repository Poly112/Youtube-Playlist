import dotenv from "dotenv";
dotenv.config();
window.addEventListener("load", () => {
    const key = process.env.key;
    const playlistId = process.env.playlistId;
    const url = process.env.url;
    const options = process.env.options;

    loadVids();

    async function loadVids() {
        const res = await fetch(url + "?" + new URLSearchParams(options), {
            "Content-Type": "application/json",
        });
        const data = await res.json();
        const id = data.items[0].snippet.resourceId.videoId;
        mainVid(id);
        render(data.items);

        document.querySelector("main").addEventListener("click", (e) => {
            let article;
            if (e.target.tagName === "ARTICLE") {
                article = e.target;
            }
            if (e.target.tagName === "H4") {
                article = e.target.parentElement.parentElement;
            }
            if (e.target.tagName === "P") {
                article = e.target.parentElement.parentElement;
            }
            if (e.target.className === "details") {
                article = e.target.parentElement;
            }

            const id = article.id;
            mainVid(id);
        });
    }

    function mainVid(id) {
        document.querySelector("#video").innerHTML = `
        <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/${id}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
    ></iframe>
        `;
    }

    function render(items) {
        const main = document.querySelector("main");
        main.innerHTML = "";

        items.forEach(
            ({
                snippet: {
                    thumbnails: {
                        medium: { url },
                    },
                    resourceId: { videoId },
                    title,
                    description,
                },
            }) => {
                main.innerHTML += `
            <article  id = "${videoId}">
            <img
                class="thumb"
                src="${url}"
                alt=""

            />
            <div class="details">
                <h4>${title}</h4>
                <p>${
                    description
                        ? description.substring(0, 100)
                        : "No description avaliable"
                }</p>
            </div>
        </article>
            `;
            }
        );
    }
});
