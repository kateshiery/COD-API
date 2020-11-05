
const searchBar = document.getElementById("search-bar");
const searchSubmit = document.getElementById("search-submit");
const contentArea = document.getElementById("content");
const platformSelect = document.getElementById("platforms");

const apiKey = 'eb0feb5094msha8e95ecd6120417p11deb4jsn84a296e0362c';
const url = "https://call-of-duty-modern-warfare.p.rapidapi.com";
var data = undefined;
var mode = "warzone";

async function searchHandler() {
    try {
        let platform = platformSelect.value;
        let gamertag = searchBar.value;

        const res = await fetch(`${url}/${mode}/${gamertag.replace('#',"%2523")}/${platform}`, {
            headers: {
                'X-RapidAPI-Host': 'call-of-duty-modern-warfare.p.rapidapi.com',
                'X-RapidAPI-Key': apiKey
            }
        });
        data = await res.json();

        if (data.error == true) {
            displayError(data);
        } else {
            if(mode == "warzone") {
                displayInfoBR(gamertag, platform, data);
            } else if(mode == "multiplayer") {
                displayInfoMP(gamertag, platform, data);
            }
        }

    } catch (err) {
        console.log(err);
    }
}

function displayInfoBR(gamertag, platform, data) {

    const HTMLString = `
    <p>WARZONE</p>
    <p>Gamertag: ${gamertag}</p>
    <p>Platform: ${platform}</p>
    <p>Wins: ${data.br.wins} </p>
    <p>Kills: ${data.br.kills}</p>
    <p>Deaths: ${data.br.deaths}</p>
    <p>K/D Ratio: ${data.br.kdRatio}</p>
    <p>Games Played: ${data.br.gamesPlayed}</p>
    <p>Time Played: ${data.br.timePlayed} </p>
    `;

    contentArea.innerHTML = HTMLString;
}

function displayInfoMP(gamertag, platform, data) {

    const HTMLString = `
    <h2>MULTIPLAYER</h2>
    <p>Gamertag: ${gamertag}</p>
    <p>Platform: ${platform}</p>
    <p>Level: ${data.level}</p>
    <p>Level EXP Gained: ${data.levelXpGained}</p>
    <p>Level EXP Remainder: ${data.levelXpRemainder}</p>
    <p>Total EXP: ${data.totalXp}</p>
    `;

    contentArea.innerHTML = HTMLString;
}

function displayError(err){
    const HTMLString = `${err.message}`;
    contentArea.innerHTML = HTMLString;
}

searchSubmit.addEventListener('click', searchHandler);
