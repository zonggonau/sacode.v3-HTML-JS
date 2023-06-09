// api url
const api_url = "https://admincpanel.sacode.web.id/api/sacodeweekend/list";
const url_poster = "https://admincpanel.sacode.web.id/file/sacodesweekends/";
const url_contributors = "https://admincpanel.sacode.web.id/file/contributors/";

// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  // console.log(data);
  if (response) {
    hideloader();
  }

  show(data);
}
// Calling that async function
getapi(api_url);

// Function to hide the loader
function hideloader() {
  document.getElementById("loading").style.display = "none";
}
// Function to define innerHTML for HTML table
function show(data) {
  var div = "";
  // Loop to access all rows
  // <a href="/sacode.v3-HTML-JS/weekend?id=${r.id}">
  for (let r of data.data) {
    if (r.status === "active") {
      div += `
      <div class="col-12 col-md-6 col-lg-4 mb-5 res-margin">
                    <a href="/sacode.v3-HTML-JS/weekend.html?slug=${r.slug}/detail">
                      <div class="single-review card">
                        <div class="card-top p-4">
                          <h4 class="text-primary mt-4 mb-3">
                            ${r.topic}
                          </h4>

                          <div class="review-text">
                            <span class="badge badge-dark bg-light mt-2 fw-3 text-dark">
                              <i class="fas fa-calendar mr-1"></i>
                              ${r.date}
                            </span>
                            <br />
                            <span class="badge badge-dark bg-light mt-2 fw-3 text-dark">
                              <i class="fas fa-clock mr-1"></i> ${r.time}
                              WIT
                            </span>
                            <hr />
                          </div>

                          <div class="quot-icon">
                            <img
                              class="avatar-md"
                              src="assets/img/icon/quote.png"
                              alt=""
                              width={500}
                              height={500}
                            />
                          </div>
                        </div>

                        <div class="reviewer media bg-gray p-4">
                          <div class="reviewer-thumb">
                            <img
                              class="avatar-lg radius-100"
                              src="${url_contributors}${r.speaker.profile_picture}"
                              alt=""
                              width={500}
                              height={500}
                            />
                          </div>

                          <div class="reviewer-meta media-body align-self-center ml-4">
                            <h5 class="reviewer-name color-primary mb-2">
                              ${r.speaker.first_name} ${r.speaker.last_name}
                            </h5>
                            <h6 class="text-secondary fw-3">
                              ${r.speaker.job_title}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>`;
    }
  }
  // Setting innerHTML as tab variable
  document.getElementById("sacodeweekend").innerHTML = div;

  // $(".btn-detail").on("click", function () {
  //   getDataById(url);
  // });
}
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const slug = params.get("slug");
var url = `https://admincpanel.sacode.web.id/api/sacodeweekend/${slug}`;

getDataById(url);

async function getDataById(url) {
  var req = await fetch(url);
  var res = await req.json();
  var data = await res.data;
  console.log(data);
  showDetail(data);
}

function showDetail(data) {
  console.log(data);
  var div = `
  <div class="row align-items-center h-100">
  <div class="col-12 col-md-7">
    <div class="welcome-intro">
      <h2 style="color: #201a84">
         ${data.topic}
      </h2>
      <p class="my-4">
       ${data.description}
      </p>
      <a href="#form-daftar" target="_blank" class="btn scroll">
        <i class="fas fa-book-open mr-1"></i> Daftar Sekarang</a
      >
    </div>
  </div>
  <div class="col-12 col-md-5">
    <div
      class="welcome-thumb"
    >
      <img
        src="${url_poster}${data.poster}"
        alt="${data.topic}"
        width="500"
        height="500"
        class="img img-thumbnail shadow"
      />
    </div>
  </div>
</div>`;
  document.getElementById("weekends").innerHTML = div;
}
