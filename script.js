import items from "./items.json" with {type: 'json'}

const storeProductContainer = document.querySelector("[data-store-container]")
const storeProductsTemplate = document.querySelector("#store-products")
const itemContainer = document.querySelector(".cart-container")
const mainSection = document.querySelector(".main-sec")
const countOfAll = document.querySelector(".count-of-all")
const togBtn = document.querySelector(".iconBTN")
const totalNumberSpan = document.querySelector(".total-number")
const ImageURL = "https://dummyimage.com/420x260"
let count = 0

items.forEach((item, index) => {
  loadProducts(item, index)
})

function saveCartToLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(Array.from(itemContainer.querySelectorAll("[data-item]"))));
}  

function loadProducts(item, index) {
  let clone = storeProductsTemplate.content.cloneNode(true)
  dataPassing(clone, item)
  const addToCartButton = clone.querySelector(".add-to-cart")
  addToCartButton.setAttribute("data-item-index", index)
  storeProductContainer.appendChild(clone)
}

function dataPassing(clone, item) {
  const image = clone.querySelector("[data-image]")
  const name = clone.querySelector("[data-name]")
  const price = clone.querySelector("[data-price]")
  const category = clone.querySelector("[data-category]")

  image.src = `${ImageURL}/${item.imageColor}/${item.imageColor}`
  category.innerText = item.category
  name.innerText = item.name
  price.innerText = `$${(item.priceCents / 100).toFixed(2)}`
}

function addToCart(item) {
  mainSection.classList.remove("invisible")
  addItems(item)
  updateItemCount()
  calculateTotalPrice()
  saveCartToLocalStorage()
}

function updateItemCount(item) {
  count += 1
  countOfAllProd()
}

function addItems(item) {
  const itemsTemplate = `<div data-item>
  <div  class="block relative h-24 rounded overflow-hidden">
  <img alt="ecommerce" class="object-cover object-center w-full h-full block rounded" src="https://dummyimage.com/420x260/${
    item.imageColor
  }/${item.imageColor}">
  <button data-remove-from-cart-button class="absolute top-0 right-0 bg-black rounded-tr text-white w-6 h-6 text-lg flex justify-center items-center">&times;</button>
</div>
<div class="mt-2 flex justify-between">
  <div class="flex items-center title-font">
    <h2 class="text-gray-900 text-lg font-medium">
      ${item.name}
    </h2>
    <span class="text-gray-600 text-sm font-bold ml-1"> × 1  </span>
  </div>
  <div data-item-price >$${(item.priceCents / 100).toFixed(2)}</div>
</div>
</div>
</div>`

  itemContainer.innerHTML += itemsTemplate
  
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const button = event.target
    const itemIndex = button.getAttribute("data-item-index")
    const selectedItem = items[itemIndex]
    togBtn.classList.remove("invisible")
    addToCart(selectedItem)
    toggleIcon()
  }
})

function countOfAllProd() {
  countOfAll.innerText = count
}

function removeItem(itemsTemplate, item) {
  const removeBtn = itemsTemplate.querySelector(
    "[data-remove-from-cart-button]"
  )
  if (removeBtn) {
    const itemElement = removeBtn.closest("[data-item]")
    if (itemElement) {
      itemElement.remove()
      count -= 1
      countOfAllProd()
    }
  }
}
itemContainer.addEventListener("click", (e) => {
  const itemsTemplate = event.target.closest("[data-item]")
  if (itemsTemplate) {
    removeItem(itemsTemplate)
  }
  calculateTotalPrice()
  saveCartToLocalStorage()
})

function toggleIcon() {
  togBtn.addEventListener("click", (e) => {
    mainSection.classList.toggle("invisible")
  })
}

const itemsAreHere = document.querySelector(".mb-6")
if (itemsAreHere.innerHTML === "") {
  console.log("empty")
  mainSection.classList.add("invisible")
}

let totalPrice = 0

function calculateTotalPrice() {
  totalPrice = 0
  const cartItems = document.querySelectorAll("[data-item]")
  cartItems.forEach((item) => {
    const priceString = item.querySelector("[data-item-price]").textContent
    const price = parseFloat(priceString.substring(1))
    totalPrice += price
  })

  totalNumberSpan.innerText = `$${totalPrice.toFixed(2)}`
}
