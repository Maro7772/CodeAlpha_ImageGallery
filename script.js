const imagesData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800",
    category: "nature"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    category: "nature"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    category: "tech"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    category: "tech"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800",
    category: "nature"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    category: "tech"
  }
];

let currentFilteredImages = [...imagesData];
let currentIndex = 0;

const gridContainer = document.getElementById("grid-container");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const filterBtns = document.querySelectorAll(".filter-btn");

function renderImages(filter) {
  gridContainer.innerHTML = "";
  currentFilteredImages =
    filter === "all"
      ? imagesData
      : imagesData.filter((img) => img.category === filter);

  currentFilteredImages.forEach((img, index) => {
    const item = document.createElement("div");
    item.className = "grid-item";
    item.innerHTML = `
            <img src="${img.src}" alt="${img.category}">
            <div class="overlay"><span>View Image</span></div>
        `;
    item.onclick = () => openLightbox(index);
    gridContainer.appendChild(item);
  });
}

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = currentFilteredImages[currentIndex].src;
  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.style.display = "none";
  document.body.style.overflow = "auto";
}

document.getElementById("close-btn").onclick = closeLightbox;

document.getElementById("next-btn").onclick = (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % currentFilteredImages.length;
  lightboxImg.src = currentFilteredImages[currentIndex].src;
};

document.getElementById("prev-btn").onclick = (e) => {
  e.stopPropagation();
  currentIndex =
    (currentIndex - 1 + currentFilteredImages.length) %
    currentFilteredImages.length;
  lightboxImg.src = currentFilteredImages[currentIndex].src;
};

lightbox.onclick = closeLightbox;

filterBtns.forEach((btn) => {
  btn.onclick = () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    renderImages(btn.getAttribute("data-filter"));
  };
});

renderImages("all");
