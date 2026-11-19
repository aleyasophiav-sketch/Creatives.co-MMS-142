const TO_ADDRESS = "orders@examplewebsite142.com"

const form = document.querySelector("#order-details");

function buildMailto(){
    const product = document.querySelector("#product-name").value;
    const size = document.querySelector("#size").value;
    const quantity = document.querySelector("#quantity").value;
    const name = document.querySelector("#full-name").value;
    const email = document.querySelector("#email").value;
    const address = document.querySelector("#street-address").value;

    const subject = "New Order: " + product;

    const body =
        "Order Details\r\n" +
        "Product: " + product + "\r\n" +
        "Size: " + size + "\r\n" +
        "Quantity: " + quantity + "\r\n\r\n" +
        "Customer Details\r\n" +
        "Name: " + name + "\r\n" +
        "Email: " + email + "\r\n" +
        "Address: " + address;
    
    return (
        "mailto:" + TO_ADDRESS +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body)
    );
    
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    window.location.href = buildMailto();
});
