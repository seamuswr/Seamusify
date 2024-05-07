function loadHTML(href, container) {
  container.replaceChildren();
  fetch(href)
    .then((response) => {
      if (response.status !== 200) {
        throw `Status: ${response.status}`;
      }
      return response.text();
    })
    .then((htmlString) => addFragment(htmlString, container))
    .catch((error) =>
      addFragment(
        `<p class="error">
        Failed to fetch ${href}: ${error}
        </p>`,
        container
      )
    );
}

const parser = new DOMParser();

function addFragment(htmlString, container) {
  const doc = parser.parseFromString(htmlString, "text/html");
  const fragment = Array.from(doc.body.childNodes);

  container.append(...fragment);
}
