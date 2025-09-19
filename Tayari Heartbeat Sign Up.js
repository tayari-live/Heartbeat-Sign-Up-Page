(function () {
  // 1. Populate country dropdown
  const countries = [
    "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan",
    "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi",
    "Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Congo-Brazzaville)","Congo, Democratic Republic of the","Costa Rica","Côte d’Ivoire","Croatia","Cuba","Cyprus","Czechia",
    "Denmark","Djibouti","Dominica","Dominican Republic",
    "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia",
    "Fiji","Finland","France",
    "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana",
    "Haiti","Holy See (Vatican City)","Honduras","Hungary",
    "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
    "Jamaica","Japan","Jordan",
    "Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan",
    "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
    "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar",
    "Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway",
    "Oman",
    "Pakistan","Palau","Palestine, State of","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
    "Qatar",
    "Romania","Russia","Rwanda",
    "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
    "Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Türkiye","Turkmenistan","Tuvalu",
    "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
    "Vanuatu","Venezuela","Vietnam",
    "Yemen",
    "Zambia","Zimbabwe"
  ];

  const sel = document.getElementById("country");
  countries.forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    sel.appendChild(opt);
  });


  // Optional: preselect by browser locale
  try {
    const localeCountry = (navigator.language || '').split('-')[1];
    if (localeCountry) {
      const matched = countries.find(c => c.toLowerCase().includes(localeCountry.toLowerCase()));
      if (matched) sel.value = matched;
    }
  } catch(e) {}


//2. Populate Age dropdown
const ageSelect = document.getElementById("age");
for (let i = 1; i <= 100; i++) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = i;
  ageSelect.appendChild(opt);
}





  // 3. Handle form submission
  document.getElementById("signup-form").addEventListener("submit", async function(e) {
    e.preventDefault(); // prevent default form submit

    const formData = {
      "first-name": document.getElementById("first-name").value,
      "last-name": document.getElementById("last-name").value,
      "email": document.getElementById("email").value,
      "gender": document.getElementById("gender").value,
      "age": document.getElementById("age").value,
      "country": document.getElementById("country").value
    };

    try {
      const response = await fetch("https://api.encharge.io/v1/hooks/be706436-92b4-48b9-907c-5289508f2317", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      // const response2 = await fetch("https://hooks.zapier.com/hooks/catch/2435316/umcv120/", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData)
      // });

      if (response.ok) {
        // Show success modal
        const modal = document.createElement('div');
        modal.innerHTML = `
          <div class="modal-overlay">
            <div class="modal-content">
              <p>Thank you for signing up!</p>
              <p>Redirecting...</p>
            </div>
          </div>
        `;
        document.body.appendChild(modal);

        
        // Redirect after 4 seconds
        setTimeout(() => {
          window.location.href = "https://app.tayari.live/login?redirectTo=%2F&login=1";
        }, 2000); // Adjust the timeout (in ms) if needed

      } else {
        alert("There was an error submitting the form. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Unable to submit the form. Please check your connection.");
    }
  });
})();



