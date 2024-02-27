const dataLoad = async (searchPhone = "iphone", isShowAll) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`;
  const res = await fetch(url);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

// Show Display Phone
const displayPhones = (phones, isShowAll) => {
  const phoneContainre = document.getElementById("phones-container");

  // Clear Phone Container card before adding new cards
  phoneContainre.textContent = "";

  // Display show all button if there are more than 6 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 6 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  //   Display Only First 3 Phones is not show all
  if (!isShowAll) {
    phones = phones.slice(0, 3);
  }

  phones.forEach((phone) => {
    const { image, phone_name, slug } = phone;
    const phoneDiv = document.createElement("div");

    phoneDiv.classList = "card bg-base-100 shadow-xl p-6";
    phoneDiv.innerHTML = `
    <figure>
          <img class="bg-[#F3F9FE] p-10 rounded-xl"
            src="${image}"
          />
        </figure>
        <div class="card-body flex items-center justify-center gap-2 px-0">
          <h2 class="card-title font-bold">${phone_name}</h2>
          <p class="text-center">
            There are many variations of passages of available, but the majority
            have suffered
          </p>
          <h2 class="card-title font-bold">$999</h2>
          <div class="card-actions justify-end">
            <button onClick="showDetailsModal('${slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
    `;
    phoneContainre.appendChild(phoneDiv);
  });

  // hide loading spinner
  toggleLadingSpinner(false);
};

// Handle Search Phone
const handleSearchPhone = (isShowAll) => {
  toggleLadingSpinner(true);
  const searchField = document.getElementById("input-field");
  const searchValue = searchField.value;
  dataLoad(searchValue, isShowAll);
};

// Loading Spinner
const toggleLadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading === true) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle Show All
const showAllPhone = () => {
  handleSearchPhone(true);
};

// Show Details Modal
const showDetailsModal = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

// show phone details
const showPhoneDetails = (phone) => {
  // console.log(phone);
  const { brand, image, name, slug, releaseDate, mainFeatures, others } = phone;
  const { storage, displaySize, chipSet, memory } = mainFeatures;
  console.log(phone);
  const showDetailsContainer = document.getElementById(
    "show-details-container"
  );

  showDetailsContainer.innerHTML = `
  <figure class="flex flex-col items-center justify-center">
      <img class="bg-[#F3F9FE] p-10 rounded-xl"
            src="${image}"
      />
  </figure>
  <h2 class="card-title font-bold">${name}</h2>
  <p><strong>Storage: </strong>${storage}</p>
  <p><strong>Display Size: </strong>${displaySize}</p>
  <p><strong>Chipset: </strong>${chipSet}</p>
  <p><strong>Memory: </strong>${memory}</p>
  <p><strong>Slug: </strong>${slug}</p>
  <p><strong>Relase Date: </strong>${releaseDate}</p>
  <p><strong>Brand: </strong>${brand}</p>
  <p><strong>GPS: </strong>${others ? others.GPS : ""}</p>
  
  `;
  show_modal_box.showModal();
};

dataLoad();
