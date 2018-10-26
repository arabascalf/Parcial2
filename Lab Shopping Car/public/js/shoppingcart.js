
var myDataProductos;

function getDataProductos() {

    var my_producto = $("#id_productos").val();

    myDataProductos.forEach(function (tweet) {
        //alert(tweet.nombre);
        if (tweet.id == my_producto) {

            $('#Precio').val(tweet.price);
            $('#Descuento').val(tweet.discount);
            $('#Imagen').attr("src", tweet.image);
        }

    });
}


function getProducts() {

    var listProducts = []

    var myProduct1 = new ShoppingCarProduct();
    myProduct1.id = "001";
    myProduct1.name = "Mason Jar #1";
    myProduct1.price = "125";
    myProduct1.image = "https://images-na.ssl-images-amazon.com/images/I/41oeaySiY%2BL._SX425_.jpg";
    myProduct1.discount = 10;

    var myProduct2 = new ShoppingCarProduct();
    myProduct2.id = "002";
    myProduct2.name = "Mason Jar #2";
    myProduct2.price = "175";
    myProduct2.image = "https://i5.walmartimages.com/asr/e559c93e-ee02-4f50-8db2-cd30d6a645c4_1.e94aaff08e6e40c518ff36b0526be351.jpeg";
    myProduct2.discount = 25;

    var myProduct3 = new ShoppingCarProduct();
    myProduct3.id = "003";
    myProduct3.name = "Mason Jar #3";
    myProduct3.price = "250";
    myProduct3.image = "https://images-na.ssl-images-amazon.com/images/I/81o4deKFrgL._SL1500_.jpg";
    myProduct3.discount = 50;

    var myProduct4 = new ShoppingCarProduct();
    myProduct3.id = "004";
    myProduct3.name = "Mason Jar #4";
    myProduct3.price = "50";
    myProduct3.image = "https://ii2.pepperfry.com/media/catalog/product/c/e/800x880/ceradeco-glass-400-ml-mason-jars---set-of-2-ceradeco-glass-400-ml-mason-jars---set-of-2-zxcacw.jpg";
    myProduct3.discount = 75;

    var myProduct5 = new ShoppingCarProduct();
    myProduct3.id = "005";
    myProduct3.name = "Mason Jar #5";
    myProduct3.price = "50";
    myProduct3.image = "https://ii2.pepperfry.com/media/catalog/product/c/e/800x880/ceradeco-glass-400-ml-mason-jars---set-of-2-ceradeco-glass-400-ml-mason-jars---set-of-2-zxcacw.jpg";
    myProduct3.discount = 90;

    var myProduct6 = new ShoppingCarProduct();
    myProduct3.id = "006";
    myProduct3.name = "Mason Jar #6";
    myProduct3.price = "500";
    myProduct3.image = "https://ii2.pepperfry.com/media/catalog/product/c/e/800x880/ceradeco-glass-400-ml-mason-jars---set-of-2-ceradeco-glass-400-ml-mason-jars---set-of-2-zxcacw.jpg";
    myProduct3.discount = 0;

    listProducts.push(myProduct1);
    listProducts.push(myProduct2);
    listProducts.push(myProduct3);
    listProducts.push(myProduct4);
    listProducts.push(myProduct5);
    listProducts.push(myProduct6);

    try {
        tweets = JSON.stringify(listProducts);
        tweets = JSON.parse(tweets);
        myDataProductos = tweets;

        tweets.forEach(function (tweet) {
            $('#id_productos').append($("<option></option>").attr("value", tweet.id).text(tweet.name));
        });
    }
    catch (e) {
        alert("error : " + e);
    }
}


// <!-- Shopping Car -->

var currentUserShoppingCart;
var i;


Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function (key) {
    return this.getItem(key) && JSON.parse(this.getItem(key));
}


function HeaderShoppingCar() {
    this.idMov = 0;
    this.idUser = 0;
    this.idCliente = 0;
    this.nombreCliente = '';
    this.tipoMov = 0;

    this.strSerie = '';
    this.strFolio = '';

    this.strConcepto = '';
    this.strFormaPago = '';
    this.decSubTotal = 0;

    this.decDescuento = 0;
    this.decIva = 0;
    this.decTotal = 0;

}

function ShoppingCarItem() {
    this.Par = i;
    this.ProductID = 0;

    this.ProductName = '';
    this.Precio = 0;
    this.Cantidad = 0;

    this.Importe = 0;
    this.Descuento = 0;
    this.Imagen = '';

    this.PorcDesc1 = 0;
    this.PorcDesc2 = 0;
    this.PorcDesc3 = 0;
    this.Desc1 = 0;
    this.Desc2 = 0;
    this.Desc3 = 0;
    this.ImporteNeto = 0;

}


function ShoppingCarProduct() {
    this.id = 0;
    this.name = '';
    this.price = 0;
    this.discount = 0;
    this.image = "";
}


function initialize() {
    currentUserShoppingCart = new Array();
    i = 0;
    getProducts();
}


function addCar() {

    try {

        var cantidad = document.getElementById("Cantidad").value;

        if (cantidad == "") throw "Teclea cantidad";
        if (isNaN(cantidad)) throw "Numeros solamente";
        if (cantidad < 1) throw "Mayor a 0";

        var item = new ShoppingCarItem();
        item.Par = i + 1;
        item.ProductID = $("#id_productos").val();

        item.ProductName = $("#id_productos :selected").text().toUpperCase();

        item.Precio = parseFloat(document.getElementById("Precio").value);
        item.Descuento = parseFloat(document.getElementById("Descuento").value);
        item.Imagen = document.getElementById("Imagen").src;
        item.Cantidad = cantidad;
        var importe = 0;

        importe = item.Precio * item.Cantidad * ((100 - item.Descuento) / 100);

        item.Importe = Math.round(importe * 100) / 100;

        var exist = 0;
        for (var c = currentUserShoppingCart.length; c--;) {
            var it = currentUserShoppingCart[c];

            if (it.ProductID == item.ProductID) {
                var Cantidad = 0;
                Cantidad = parseFloat(currentUserShoppingCart[c].Cantidad);
                Cantidad += parseFloat(item.Cantidad);
                currentUserShoppingCart[c].Cantidad = Cantidad;

                var importe = 0;

                importe = item.Precio * Cantidad * ((100 - item.Descuento) / 100);

                currentUserShoppingCart[c].Importe = Math.round(importe * 100) / 100;

                exist = 1;
            }


        }

        if (exist == 0) {
            currentUserShoppingCart[i] = item;
            i++;
        }

        sessionStorage.setObject('UserShoppingCart', currentUserShoppingCart);
        //alert("show");
        showScar();
        document.getElementById("Precio").innerHTML = '0';
        document.getElementById('id_productos').focus();
    }
    catch (err) {
        var msgError = "Ocurrio un error en la página.\n\n";
        msgError += "Descripción: " + err + "\n\n";
        msgError += "Click OK para continuar.\n\n";

        document.getElementById('Cantidad').value = '';
        document.getElementById('Cantidad').focus();
        alert(msgError);

    }
}



function showScar() {
    var tableCirs = document.getElementById('tableProducts');

    for (var c = tableCirs.rows.length - 1; c > 0; c--) {
        tableCirs.deleteRow(c);
    }

    var userShoppingCart = sessionStorage.getObject('UserShoppingCart');

    if (!userShoppingCart) {
        $('car').innerHTML = '<br />UserShoppingCart does NOT exist in sessionStorage.';
        return;
    }


    var totalUni = 0;
    var totImporte = 0;

    userShoppingCart.forEach(function (tweet) {

        //alert("" + tweet.cir);

        var rowCir = tableCirs.insertRow(-1);

        var rowCount = tableCirs.rows.length - 1;

        var cellCantidad = rowCir.insertCell(0);
        var cellProducto = rowCir.insertCell(1);
        var cellPrecio = rowCir.insertCell(2);

        var cellImporte = rowCir.insertCell(3);
        var cellImagen = rowCir.insertCell(4);
        var cellDescuento = rowCir.insertCell(5);
        var cellAgregar = rowCir.insertCell(6);
        var cellBorrar = rowCir.insertCell(7);
        var url = "<a class=\"btn btn-danger\" type=\"button\" href=\"javascript: void();\" onclick=\"deleteItem(" + tweet.ProductID + ")\">Borrar</a>";
        var urlAgregar = "<a class=\"btn btn-success\" type=\"button\" href=\"javascript: void();\" onclick=\"addOneMoreItem(" + tweet.ProductID + ")\">Agregar</a>";

        cellCantidad.innerHTML = tweet.Cantidad;
        cellProducto.innerHTML = tweet.ProductName;
        cellPrecio.innerHTML = tweet.Precio;
        cellImagen.innerHTML = '<img src="' + tweet.Imagen + '" class="image-thumbnail" height="100" width="150">';
        cellDescuento.innerHTML = tweet.Descuento;

        cellImporte.innerHTML = tweet.Importe;
        cellAgregar.innerHTML = urlAgregar;
        cellBorrar.innerHTML = url;

        totalUni += parseFloat(tweet.Cantidad);

        totImporte += tweet.Importe;

    });

    document.getElementById('totalUnidades').innerHTML = '<b>' + parseFloat(totalUni) + '</b>';

    document.getElementById('totalImporte').innerHTML = '<b id="tImporte">' + totImporte + '</b>';

}

function deleteItem(item) {
    for (var c = currentUserShoppingCart.length; c--;) {
        var it = currentUserShoppingCart[c];
        if (it.ProductID == item) {
            var cantidad = 0;
            cantidad = parseFloat(currentUserShoppingCart[c].Cantidad);
            cantidad--;
            if (cantidad == 0) {
                currentUserShoppingCart.splice(c, 1);
                i--;
            } else {
                currentUserShoppingCart[c].Cantidad = cantidad;
                var importe = 0;
                importe = it.Precio * cantidad * ((100 - it.Descuento) / 100);
                currentUserShoppingCart[c].Importe = Math.round(importe * 100) / 100;
            }
        }
    }
    sessionStorage.setObject('UserShoppingCart', currentUserShoppingCart);
    showScar();

}

function addOneMoreItem(itemId) {
    for (var c = currentUserShoppingCart.length; c--;) {
        var it = currentUserShoppingCart[c];

        if (it.ProductID == itemId) {
            var Cantidad = 0;
            Cantidad = parseFloat(currentUserShoppingCart[c].Cantidad) + 1;
            currentUserShoppingCart[c].Cantidad = Cantidad;
            var importe = 0;
            importe = it.Precio * Cantidad * ((100 - it.Descuento) / 100);
            currentUserShoppingCart[c].Importe = Math.round(importe * 100) / 100;
        }
    }
    sessionStorage.setObject('UserShoppingCart', currentUserShoppingCart);
    showScar();
}

function clearSessionStorage() {
    sessionStorage.clear();
}

// <!-- Shopping Car -->
