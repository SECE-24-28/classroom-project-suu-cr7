const API_URL = "https://69383b2c4618a71d77cf75ba.mockapi.io/api/v1/plans";  
// ⬆️ Replace with your MockAPI endpoint

const plansContainer = document.getElementById("plansContainer");
const loadingText = document.getElementById("loading");

// Fetch API Data
async function fetchPlans() {
  try {
    const res = await fetch(API_URL);
    const plans = await res.json();

    loadingText.style.display = "none";
    displayPlans(plans);

  } catch (err) {
    loadingText.innerText = "Failed to load plans!";
  }
}

function displayPlans(plans) {
  plansContainer.innerHTML = "";

  plans.forEach(plan => {
    const card = document.createElement("div");
    card.className =
      "bg-white p-4 shadow rounded-lg hover:shadow-lg transition cursor-pointer";

    card.innerHTML = `
      <h2 class="text-xl font-bold text-blue-600">₹${plan.price}</h2>
      <p class="mt-2"><strong>Validity:</strong> ${plan.validity}</p>
      <p><strong>Data:</strong> ${plan.data}</p>
      <p class="text-gray-700 mt-1">${plan.description}</p>

      <button class="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
              onclick="selectPlan('${plan.type}', ${plan.price}, '${plan.validity}', '${plan.data}', '${plan.description}')">
        Select
      </button>
    `;

    plansContainer.appendChild(card);
  });
}

// Open Popup
function selectPlan(type, price, validity, data, desc) {
  document.getElementById("popup").classList.remove("hidden");

  document.getElementById("popupTitle").innerText = type.toUpperCase() + " PLAN";
  document.getElementById("popupPrice").innerText = "₹" + price;
  document.getElementById("popupValidity").innerText = "Validity: " + validity;
  document.getElementById("popupData").innerText = "Data: " + data;
  document.getElementById("popupDesc").innerText = desc;
}

// Close Popup
function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

// Call API on page load
fetchPlans();
