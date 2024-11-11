fetch('world.svg')
  .then(response => response.text())
  .then(data => {
    document.getElementById('map-container').innerHTML = data;
    initMap();
  })
  .catch(error => console.error("Error loading SVG:", error));

function initMap() {
  const map = document.querySelector("svg");
  const countries = document.querySelectorAll("path");
  const sidePanel = document.querySelector(".sidepanel");
  const container = document.querySelector(".sidepanel .container");
  const closeBtn = document.querySelector(".close-btn");
  const loading = document.querySelector(".loading");

  countries.forEach(country => {
    country.addEventListener("mouseenter", function() {
      const classList = [...this.classList].join('.');
      if (classList) { 
        const selector = '.' + classList;
        const matchingElements = document.querySelectorAll(selector);
        matchingElements.forEach(el => el.style.fill = "#17B169");
      }
    });

    country.addEventListener("mouseout", function() {
      const classList = [...this.classList].join('.');
      if (classList) {
        const selector = '.' + classList;
        const matchingElements = document.querySelectorAll(selector);
        matchingElements.forEach(el => el.style.fill = "#443d4b");
      }
    });

    country.addEventListener("click", function(e) {
      loading.innerText = "Loading...";
      container.classList.add("hide");
      loading.classList.remove("hide");

      if (e.target && e.target.classList) {
        let clickedCountryName = e.target.hasAttribute("name") ? e.target.getAttribute("name") : e.target.classList.value;
        
        sidePanel.classList.add("side-panel-open");
        fetch(`https://restcountries.com/v3.1/name/${clickedCountryName}?fullText=true`)
          .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
          })
          .then(data => {
            loading.classList.add("hide");
            container.classList.remove("hide");
            const countryData = data[0];
            document.querySelector(".country-name").textContent = countryData.name.common || "Unknown";
            document.querySelector(".country-flag").src = countryData.flags.png || "";
            document.querySelector(".tillader-eutanasi").textContent = "Yes";
            document.querySelector(".hvornår-eutanasi").textContent = "Since 2002";
            document.querySelector(".hvormange-eutanasi").textContent = "5,000 per year";
          })
          .catch(error => {
            loading.innerText = "Failed to load data.";
            console.error("Error fetching country data:", error);
          });
      }
    });
  });

  closeBtn.addEventListener("click", () => sidePanel.classList.remove("side-panel-open"));
}
