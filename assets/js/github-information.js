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

function displayContributors(usernames) {
    let userDataPromises = usernames.map(username => $.getJSON(`https://api.github.com/users/${username}`));

    $.when(...userDataPromises).then(function (...responses) {
        let usersData = responses.map(response => response[0]);
        let contributorsHTML = usersData.map(user => `
      <div class="gh-avatar" style="display: inline-block; padding: 10px;">
          <a href="${user.html_url}" target="_blank">
              <img src="${user.avatar_url}" width="100" height="100" alt="${user.login}" />
          </a>
          <p>@${user.login}</p>
      </div>
    `).join('');
        $("#carouselProject6 .carousel-inner .carousel-item:nth-child(2)").append(`<div class="carousel-caption">${contributorsHTML}</div>`);
    });
}

$(document).ready(function () {
    displayContributors(['SoroushGReza', 'username2', 'username3', 'username4', 'username5']);
});
