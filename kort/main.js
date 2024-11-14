// main.js

console.log("main.js is loaded and running.");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed.");
    const mapContainer = document.getElementById('map-container');
    const map = document.querySelector('svg');
    const sidePanel = document.querySelector('.side-panel');
    const closeBtn = document.querySelector('.close-btn');
    const zoominBtn = document.querySelector('.zoom-in');
    const zoomOutBtn = document.querySelector('.zoom-out');
    const zoomValueOutput = document.querySelector('.zoom-value');
    let zoomValue = 100;

    // Disable zoom out button initially
    zoomOutBtn.disabled = true;

    // Fetch and load SVG
    fetch('world.svg') // Ensure correct path
        .then(response => response.text())
        .then(data => {
            mapContainer.innerHTML = data;
            console.log("SVG loaded successfully.");
            initMap();
        })
        .catch(error => console.error("Error loading SVG:", error));

    function initMap() {
        console.log("Initializing map with countriesData:", countriesData);
        const map = document.querySelector('svg');
        const countries = document.querySelectorAll('path');

        countries.forEach(country => {
            const countryId = country.id;
            const countryData = countriesData.find(c => c.id === countryId);
            console.log(`Country ID: ${countryId}, Data:`, countryData);

            if (countryData) {
                country.style.fill = countryData.supportsEuthanasia ? 'red' : 'blue';
                country.addEventListener('click', () => {
                    console.log(`Country ${countryData.name} clicked.`);
                    displayCountryInfo(countryData);
                });
            } else {
                country.style.fill = '#ccc';
            }

            // Hover effects
            country.addEventListener('mouseenter', () => {
                country.style.fill = '#17B169';
            });

            country.addEventListener('mouseleave', () => {
                country.style.fill = countryData ? (countryData.supportsEuthanasia ? 'red' : 'blue') : '#ccc';
            });
        });
    }

    function displayCountryInfo(country) {
      const map = document.querySelector('svg');
      console.log("Displaying info for:", country);
      const countryName = sidePanel.querySelector('.country-name');
      const supportsEuthanasia = sidePanel.querySelector('.tillader-eutanasi');
      const hvornårEutanasi = sidePanel.querySelector('.hvornår-eutanasi');
      const hvormangeEutanasi = sidePanel.querySelector('.hvormange-eutanasi');
      const flagImg = sidePanel.querySelector('.photo');
  
      if (countryName && supportsEuthanasia && hvornårEutanasi && hvormangeEutanasi && flagImg) {
          countryName.textContent = country.name;
          supportsEuthanasia.textContent = country.supportsEuthanasia ? 'Ja' : 'Nej';
          hvornårEutanasi.textContent = country.hvornårEutanasi;
          hvormangeEutanasi.textContent = country.hvormangeEutanasi;
          flagImg.src = `../img/flags/${country.id.toLowerCase()}.png`;
          flagImg.alt = `Flag of ${country.name}`;
          console.log(`Flag path set to: ../img/flags/${country.id.toLowerCase()}.png`);
          sidePanel.classList.add('side-panel-open'); // Add the open class here
      } else {
          console.error("One or more side panel elements not found.");
      }
  }

    // Close side panel
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            sidePanel.classList.remove('side-panel-open');
            console.log("Side panel closed.");
        });
    } else {
        console.error("Close button with class 'close-btn' not found.");
    }

    // Zoom In functionality
    zoominBtn.addEventListener("click", () => {
      const map = document.querySelector('svg');
        zoomOutBtn.disabled = false;
        zoomValue += 10;

        if (zoomValue < 500) {
            zoominBtn.disabled = false;
        } else {
            zoominBtn.disabled = true;
        }

        map.style.width = zoomValue + "vw";
        map.style.height = zoomValue + "vh";

        zoomValueOutput.innerText = zoomValue + "%";
    });

    // Zoom Out functionality
    zoomOutBtn.addEventListener("click", () => {
      const map = document.querySelector('svg');
        zoominBtn.disabled = false;
        zoomValue -= 10;

        if (zoomValue > 100) {
            zoomOutBtn.disabled = false;
        } else{
            zoomOutBtn.disabled = true;
        }

        map.style.width = zoomValue + "vw";
        map.style.height = zoomValue + "vh";

        zoomValueOutput.innerText = zoomValue + "%";
    });
});