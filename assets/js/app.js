const dataLoad = async (searchPhone) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`;
  const res = await fetch(url);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  const phoneContainre = document.getElementById("phones-container");

  // Clear Phone Container card before adding new cards
  phoneContainre.textContent = "";

  // Display show all button if there are more than 6 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 6) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  //   Display Only First 6 Phones
  phones = phones.slice(0, 6);

  phones.forEach((phone) => {
    const { image, phone_name } = phone;
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
            <button class="btn btn-primary">Show Details</button>
          </div>
        </div>
    `;
    phoneContainre.appendChild(phoneDiv);
  });
};

const handleSearchPhone = () => {
  const searchField = document.getElementById("input-field");
  const searchValue = searchField.value;
  dataLoad(searchValue);
};
dataLoad();
