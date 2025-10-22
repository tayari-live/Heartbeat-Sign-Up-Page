(function () {
      const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
        "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
        "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Congo, Democratic Republic of the", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czechia",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic",
        "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
        "Fiji", "Finland", "France",
        "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
        "Haiti", "Holy See (Vatican City)", "Honduras", "Hungary",
        "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
        "Jamaica", "Japan", "Jordan",
        "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan",
        "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
        "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
        "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
        "Oman",
        "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
        "Qatar",
        "Romania", "Russia", "Rwanda",
        "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
        "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Türkiye", "Turkmenistan", "Tuvalu",
        "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
        "Vanuatu", "Venezuela", "Vietnam",
        "Yemen",
        "Zambia", "Zimbabwe"
      ];

      const countrySelect = document.getElementById("country");
      countries.forEach(name => {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        countrySelect.appendChild(opt);
      });

      try {
        const localeCountry = (navigator.language || '').split('-')[1] || '';
        if (localeCountry) {
          const matched = countries.find(c => c.toLowerCase() === localeCountry.toLowerCase());
          if (matched) {
            countrySelect.value = matched;
          }
        }
      } catch (e) {}

      const ageSelect = document.getElementById("age");
      for (let i = 5; i <= 100; i++) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = i;
        ageSelect.appendChild(opt);
      }

      const signupForm = document.getElementById('signup-form');

      signupForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = {
          "first-name": document.getElementById("first-name").value.trim(),
          "last-name": document.getElementById("last-name").value.trim(),
          "full-name": document.getElementById("first-name").value.trim() + " " + document.getElementById("last-name").value.trim(),
          "email": document.getElementById("email").value.trim(),
          "gender": document.getElementById("gender").value,
          "age": document.getElementById("age").value,
          "country": document.getElementById("country").value
        };

        if (!formData["first-name"] || !formData["last-name"] || !formData["email"] || !formData["country"] || !formData["gender"] || !formData["age"]) {
          alert("Please fill in all the required fields.");
          return;
        }

        const submitBtn = signupForm.querySelector('.submit-button');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating your account...';

        try {
          const response = await fetch("https://api.encharge.io/v1/hooks/30e9b27c-d08f-4055-8f8f-61c531ba3793", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
          });

          if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
          }

          const modal = document.createElement('div');
          modal.className = 'modal-overlay';
          modal.innerHTML = `
            <div class="modal-content">
              <div class="success-icon">🎉</div>
              <h3>Welcome to Tayari!</h3>
              <p>Your account has been created successfully. We're redirecting you to your personalized learning dashboard.</p>
              <div class="spinner"></div>
            </div>
          `;
          document.body.appendChild(modal);

          setTimeout(() => {
            window.location.href = "https://app.tayari.live/login?redirectTo=%2F&login=1";
          }, 2000);

        } catch (err) {
          console.error(err);
          alert("Unable to submit the form. Please check your connection and try again.");
          submitBtn.disabled = false;
          submitBtn.textContent = 'Start Learning Free →';
        }
      });
    })();


