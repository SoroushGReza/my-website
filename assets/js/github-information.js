//    User Information
function userInformationHTML(user) {
    return `
      <h3>${user.name}
          <span class="small-name">
              (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
          </span>
      </h3>
      <div class="gh-content">
          <div class="gh-avatar">
              <a href="${user.html_url}" target="_blank">
                  <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
              </a>
          </div>
          <p>Public Repos: ${user.public_repos}</p>
      </div>`;
}

//    Repo Information

function repoInformationHTML(repos) {
    if (repos.length === 0) {
        return `<div class="clearfix repos-list">No public repos!</div>`;
    }
    var listItemsHTML = repos.map(function (repo) {
        return `<li>
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </li>`;
    });

    return `<div class="clearfix repo-list">
            <h5 class="text-center uppercase repo-list-heading">Repo List:</h5>
            <ul>${listItemsHTML.join("\n")}</ul>
          </div>`;
}

//    Fetch GitHub Info

function fetchGitHubInformation(event) {
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

    var username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
              <img src="assets/animations/loader.gif" alt="loading..." />
          </div>`
    );

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function (firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        },
        function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
            } else if (errorResponse.status === 403) {
                var resetTime = new Date(
                    errorResponse.getResponseHeader("X-RateLimit-Reset") * 1000
                );
                $("#gh-user-data").html(
                    `<h4 class="too-many-requests"><i class="fa-solid fa-circle-exclamation"></i> Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`
                );
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
                );
            }
        }
    );
}

//    Show default profile when page loads

$(document).ready(fetchGitHubInformation);

//    Contributors GitHub

function displayContributorsToCarousel(usernames, projectId, slideNumber) {
    let userDataPromises = usernames.map(username => $.getJSON(`https://api.github.com/users/${username}`));

    $.when(...userDataPromises).then(function (...responses) {
        let usersData = responses.map(response => response[0]);
        let contributorsHTML = usersData.map(user => `
            <div class="contributor" style="flex: 0 0 auto; margin: 1vw; text-align: center;">
                <a href="${user.html_url}" target="_blank" style="display: block; margin-bottom: 0.5vw;">
                    <img src="${user.avatar_url}" style="width: 4vw; height: 4vw; object-fit: cover; border-radius: 50%;" alt="${user.login}">
                </a>
                <p style="color: white; font-size: 0.9vw;">@${user.login}</p>
            </div>
        `).join('');

        let target = $(`#${projectId} .carousel-inner .carousel-item:nth-child(${slideNumber})`);
        target.find('.carousel-caption').remove();
        target.append(`
            <div class="carousel-caption github-contributors d-flex flex-row flex-wrap align-items-center justify-content-center" style="left: 0; right: 0; bottom: 0; top: 0; margin-top: 3vw;">
                ${contributorsHTML}
            </div>
        `);

        // Manually control the carousel
        $(`#${projectId} .carousel-control-prev`).click(function () {
            $(`#${projectId}`).carousel("prev");
        });
        $(`#${projectId} .carousel-control-next`).click(function () {
            $(`#${projectId}`).carousel("next");
        });
    });
}

// All projects

$(document).ready(function () {
    // UTime (Project 6)
    displayContributorsToCarousel(
        ['A-Hoenig', 'kosamad', 'SoroushGReza', 'BreakellrZ', 'MeganRoberts-dev'],
        'carouselProject6',
        2 // Slide number
    );

    // ForThe50 (Project 9)
    displayContributorsToCarousel(
        ['violaberg', 'SoroushGReza', 'Heath1979', 'surfdemon', 'FinnbarrAmbrose', 'chrysanthusobinna'],
        'carouselProject9',
        2 // Slide number
    );

    // Connection Engine (Project 11)
    displayContributorsToCarousel(
        ['iliana-marquez', 'Nexiauk', 'stephendawsondev', 'Wxrren', 'SoroushGReza'],
        'carouselProject11',
        2 // Slide number
    );
});
