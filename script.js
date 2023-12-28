$(document).ready(() => {
  let username, card;

  $('.btn').on('click', () => {
    username = $('#search').val();
    $('.user').empty();
    getUser().catch(() => {
      let error = "We Cannot Find This User ! Please Try Again."
      $('.user').append(`<h4 class="text-center">${error} </h4>`);
    });

  });

  async function getUser() {
    $('.user').css('display', 'block');

    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
    const response = await fetch(`https://api.github.com/users/${username}`).then(handleErrors);
    const data = await response.json();

    const user = {
      login: data.login,
      name: data.name,
      email: data.email,
      avatar: data.avatar_url,
      bio: data.bio,
      html_url: data.html_url,
      follower: data.followers,
      following: data.following,
      repo: data.public_repos
    }

    fetchUser(user);
    $('.user').append(card);

  }

  function fetchUser(user) {
    return card = `<div class="card p-lg-5 bg-dark rounded-3 text-light" >
                            <div class="col g-0 ">
                              <div class="center">
                                <img src="${user.avatar}" alt="..." class="rounded-circle m-3" wdith="250px" height="150px">
                              </div>
                          
                                <div class="card-body text-center">
                                  <h3 class="card-title"> ${user.name}</h3>
                                  <h5 class="card-title" >${user.login}</h5>
                                    <a href="${user.html_url}" class="text-decoration-none" target="_blank"><button class="btn btn-light border-0 rounded-0">Visit Profile 🔗</button></a>
                                  <p class="card-text my-2">
                                    <small class="text-muted">${user.bio}</small>
                                  </p>

                                <div class="d-flex justify-content-center flex-wrap" >
                                 <h5 class="text-center mx-2"><span class="badge rounded-pill bg-danger text-light">Followers: ${user.follower}</span></h5>
                                 <h5 class="text-center mx-2"><span class="badge rounded-pill bg-success text-light">Following: ${user.following}</span></h5>
                                 <h5 class="text-center mx-2"><span class="badge rounded-pill bg-primary text-light">Public Repo: ${user.repo}</span></h5>
                                </div>
                              </div>
                              </div>`;
  }
});
