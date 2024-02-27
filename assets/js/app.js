const dataLoad = async () => {
  const url = "https://openapi.programming-hero.com/api/phones?search=iphone";
  const res = await fetch(url);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  phones.forEach((phone) => {
    const phoneContainre = document.getElementById("phones-container");
    console.log(phoneContainre);
    const { image, phone_name } = phone;
    const phoneDiv = document.createElement("div");

    phoneDiv.classList = "card bg-base-100 shadow-xl p-6";
    console.log(phoneDiv);
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
dataLoad();
