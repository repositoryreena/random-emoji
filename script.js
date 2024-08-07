const btnEl = document.getElementById("btn");
const emojiNameEl = document.getElementById("emojiname");
const apiKey = "nQQGEPTFTaQn865mm8xYMg==gwG63zWk2t8aRdX9";
const apiURL = "https://api.api-ninjas.com/v1/emoji?group=smileys_emotion"; // Use a broad group
const options = {
    method: "GET",
    headers: {
        "X-Api-Key": apiKey,
    }
};

async function getEmoji() {
    try {
        btnEl.style.pointerEvents = "none"; // Disable button while fetching

        const response = await fetch(apiURL, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data); // Log the fetched data to the console

        if (data.length > 0) {
            // Randomly select an emoji from the fetched data
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomEmoji = data[randomIndex];

            // Update the button content with the emoji character
            btnEl.innerText = randomEmoji.character || "No emoji available";

            // Update the emoji name element with the emoji description
            emojiNameEl.innerText = randomEmoji.name || "No description available";
        } else {
            btnEl.innerText = "No emojis found.";
            emojiNameEl.innerText = "No emojis found.";
        }

    } catch (error) {
        emojiNameEl.innerText = "An error happened, try again later";
    } finally {
        btnEl.style.pointerEvents = "auto"; // Re-enable button
    }
}

btnEl.addEventListener("click", getEmoji);
