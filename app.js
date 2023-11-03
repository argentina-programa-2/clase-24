let url = "./api/";

const listarProductos = () => {
  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      const productos = data;
      let divProductos = document.querySelector(".table-products");
      divProductos.innerHTML = "";
      productos.map((producto, index) => {
        divProductos.innerHTML += `
        <tr>
          <td class="text-center">${producto.id}</td>
          <td class="text-center">${producto.nombre}</td>
          <td class="text-center">${producto.precio}</td>
          <td class="text-center">${producto.cantidad}</td>
          <td class="text-center">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEditar${index}">
              Editar
            </button>
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalEliminar${index}">
              Eliminar
            </button>
            <div
              class="modal fade"
              id="modalEditar${index}"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <form class="modal-content form-editar">
                  <div class="modal-header">
                    <h3 class="modal-title fs-5" id="exampleModalLabel">
                      Editar Producto
                    </h3>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                  <input
                        style="display:none;"
                        type="number"
                        class="form-control"
                        name="id"
                        id="id"
                        aria-describedby="idProducto"
                        value="${producto.id}"
                      />
                    <div class="mb-3">
                      <label for="nombre_producto" class="form-label">Nombre</label>
                      <input
                        type="text"
                        class="form-control"
                        name="nombre"
                        id="nombre_producto"
                        aria-describedby="nombreProducto"
                        value="${producto.nombre}"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="precio_producto" class="form-label">Precio</label>
                      <input
                        type="number"
                        class="form-control"
                        name="precio"
                        id="precio_producto"
                        aria-describedby="precioProducto"
                        value="${producto.precio}"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="cantidad_producto" class="form-label">Cantidad</label>
                      <input
                        type="number"
                        class="form-control"
                        name="cantidad"
                        id="cantidad_producto"
                        aria-describedby="cantidadProducto"
                        value="${producto.cantidad}"
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Editar</button>
                  </div>
                </form>
              </div>
            </div>
  
            <div
              class="modal fade"
              id="modalEliminar${index}"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <form class="modal-content form-eliminar">
                  <div class="modal-header">
                    <h3 class="modal-title fs-5" id="exampleModalLabel">
                      Eliminar Producto
                    </h3>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <input
                      style="display:none;"
                      type="number"
                      class="form-control"
                      name="id"
                      id="id"
                      aria-describedby="idProducto"
                      value="${producto.id}"
                    />
                    <p>Desea eliminar <b>${producto.nombre}</b> de la lista?</p>
                  </div>
                  <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Eliminar</button>
                  </div>
                </form>
              </div>
            </div>
          </td>
        </tr>`;
        const editar = document.querySelectorAll(".form-editar");
        const eliminar = document.querySelectorAll(".form-eliminar");
        editar.forEach((edit) => {
          edit.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target));
            fetch(`${url}?${data.id}`, {
              method: "PUT",
              body: JSON.stringify(data),
            })
              .then((res) => res.json())
              .then((data) => {
                listarProductos();
              });
          });
        });

        eliminar.forEach((elim) => {
          elim.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target));
            fetch(`${url}?${data.id}`, {
              method: "DELETE",
              body: JSON.stringify(data),
            })
              .then((res) => res.json())
              .then((data) => {
                listarProductos();
              });
          });
        });
      });
    });
};
listarProductos();
document.querySelector(".form-agregar").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      listarProductos();
    });
  console.log(data);
});
