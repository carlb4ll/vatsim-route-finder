
  
  //****** Error Codes******** */
  
  const search = document.getElementById("search");
  const errorList = document.getElementById("error-list");
  
  // Search the Errors.JSON and Filter it
  const searchErrors = async (searchText) => {
    const res = await fetch("/sharp_error_codes.json");
    const errors = await res.json();
  
    // Get matches to current text input
    let matches = errors.filter((error) => {
      const regex = new RegExp(`^${searchText}`, "gi");
      return error.Code.match(regex);
    });
  
    if (searchText.length === 0) {
      matches = [];
      errorList.innerHTML = "";
    }
  
    outputHtml(matches);
  };
  
  // Show results in HTML
  const outputHtml = (matches) => {
    if (matches.length > 0) {
      const html = matches
        .map(
          (match) => `
         
          <div class="row">
      <div class="col s12 m-auto">
        <div class="card grey lighten-3">
          <div class="card-content">
            <span class="card-title red-text lighten-2">${match.Code}</span>
            <h6 class="red-text lighten-2">Problem</h6>
            <p>${match.Content}</p>
            <p>${match.Cause}</p>
            <h6 class="red-text lighten-2">Initial remedy</h6>
            <p>${match["Initial Remedy"]}</p>
            <h6 class="red-text lighten-2">Further Action</h6>
            <p>${match["Further Action is necessary"]}</p>
          </div>
          <div class="card-action">
          <h6 class="red-text lighten-2">Ticket goes to:</h6>
          <p>${match["Ticket to"]}</p>
          </div>
        </div>
      </div>
    </div>
      `
        )
        .join("");
  
      errorList.innerHTML = html;
    }
  };
  
  search.addEventListener("input", () => searchErrors(search.value));
  
  // {
  //   "Device": "Sharp",
  //   "Main Code": "NG",
  //   "Sub Code": "800000",
  //   "Code": "NG800000",
  //   "Content": "Scan failed, authentication general failure",
  //   "Cause": "Scan to email general failure",
  //   "Initial Remedy": "Crop 14",
  //   "Further Action is necessary": "Standard Image Send troubleshooting",
  //   "Ticket to": "Technical Support"
  // },