(function () {
  var config = {
    userId : 'prashant-andani',
    repoUrl: 'https://api.github.com/users/prashant-andani/repos'
  };

  function fetchRepos() {
    fetch(config.repoUrl)
      .then(
        function (response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.json().then(function (repos) {
            createReportCard(repos);
          });
        }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  }

  function createReportCard(repos) {
    var report = {
      star: 0,
      watch: 0,
      fork: 0
    }

    repos.map(function(repo){
      if(!repo.fork) {
        report.star += repo.stargazers_count;
        report.watch += repo.watchers_count;
        report.fork += repo.forks_count;
      }
    })

    //diplay
    var reportEl = document.getElementById('report_card');
    var template = `
    <div>
        <div class="card text-white bg-dark mb-3">
          <div class="card-header">
          <h4 class="card-title">
          <i class="fa fa-bar-chart"></i> Stats</h4>
          </div>
          <div class="card-body">
          <h5 class="card-title"><i class="fa fa-star"></i> ${report.star} Stars</h5>
          <h5 class="card-title"> <i class="fa fa-eye"></i> ${report.watch} Watchers</h5>
          <h5 class="card-title"><i class="fa fa-code-fork"></i> ${report.fork} Forks</h5>
          </div>
        </div>
    </div>`;
    reportEl.innerHTML = template;
  }
  fetchRepos();
})();
