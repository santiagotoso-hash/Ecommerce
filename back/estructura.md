Un Usuario podrá registrarse e ingresar a la aplicación mediante usuario y contraseña.
    USER CREDENTIALS
    Username
    Password
El Usuario registrado puede realizar compras de productos mediante un carrito de compras (solo una unidad de cada producto) emitiendo una Orden de compra que registra la información en un Detalle de Compras.


Las Órdenes de compras son asociadas al Usuario y estas a su vez tienen asociado un Detalle de Compra con la información de los productos adquiridos.

Un Usuario Administrador, tendrá la posibilidad de actualizar la información de los productos cargados en la base de datos así como actualizar stock o agregar imágenes mediante un servicio de nube.



USER
id
name
email
password
role
createdAt
updatedAt
RELACIONES -    CON ORDER 1 - N
                CON CART 1 - 1

PRODUCT 
id
name
description
price
stock
imageUrl
createdAt
updatedAt
categoryId
            CON ORDER 1 - 1
            CON USER 

CATEGORIA
id
name

CART
id
userId

CARTITEM
id
cartId
productId

ORDER
id
date
status
total
userId

ADMIN

