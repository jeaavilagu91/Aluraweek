import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard (name, price, url, id){
    const card = document.createElement("div");
    card.classList.add("card");
    
    card.innerHTML = `
        <div class="card-item">
            <img class="img-producto" src="${url}" alt="${name}">
            <div class="Card-container-info">
                <p>${name}</p>
            </div>
            <div class="precio-botton">
                <div class="precio-producto">
                <p>${price}</p>
                </div>
                <div data-borrar class="boton-borrar" id="id${id}">
                <img src="assest/icon_delete.png" alt="borrar" class="img-borrar"/>
                </div>
            </div>
        </div>
        `;

    const btn = card.querySelector("[data-borrar]");

    btn.addEventListener("click", async () => {
        try {
        await servicesProducts.borrarProducto(id);
        card.remove();
        } catch (error) {
        console.error("Error al borrar el producto:", error);
        }
    });

productContainer.appendChild(card);
return card;
     
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-nombre-producto]").value;
    const price = document.querySelector("[data-precio]").value;
    const url = document.querySelector("[data-imagen]").value;

    servicesProducts.createProducts(name, price, url)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

    limpiarForm();


}); 

const render = async () => {
    try {
        const listProduct = await servicesProducts.productList();
        
        listProduct.forEach((product) => {
            productContainer.appendChild(
                createCard(
                    product.name,
                    product.price,
                    product.url,
                    product.id
                )
            )
        });

    } catch (error) {
        console.log("No cargan los productos", error);
        
    }
}

render() 

const limpiarForm = () => {
    document.querySelector("[data-titulo]").value = "";
    document.querySelector("[data-precio]").value = "";
    document.querySelector("[data-imagen]").value = "";
};