import { proyectos, perfiles } from "../bd/datosPrueba.js";
import { ls } from "../componentes/funciones.js";
import { editarImagenPerfil } from "../componentes/editarImagenPerfil.js";

export default {
  // html
  template: `
      <div class="container-fluid">
          <h1 class="mt-5">Panel de administración</h1>
          <!-- tabs -->
          <div class="row mt-5">
            <div class="col-12">
              <ul class="nav nav-tabs">
                <li class="nav-item w-50">
                  <a class="nav-link fichaUsuarios active" aria-current="page">Usuarios</a>
                </li>
                <li class="nav-item w-50">
                  <a class="nav-link fichaProyectos">Proyectos</a>
                </li>
              </ul>
            </div>
          </div>
  
          <!-- tabla proyectos -->
          <div class="border border-top-0 p-3">
            <div class="row">
              <div class="d-flex col-12 col-sm-8 mb-3">
                <!-- Buscador -->
                <div class="input-group flex-nowrap">
                  <span class="input-group-text" id="addon-wrapping"
                    ><i class="bi bi-search"></i
                  ></span>
                  <input
                    id="inputBusqueda"
                    type="text"
                    class="form-control"
                    placeholder="Buscador"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                  />
                  <span class="input-group-text" id="addon-wrapping"
                    ><i id="borrarBuscador" class="bi bi-x"></i
                  ></span>
                </div>
              </div>
            </div>
            <div id="tabUsuarios" class="col-12" style="overflow-x: auto">                
            </div>
            <div id="tabProyectos" class="col-12" style="overflow-x: auto">                
            </div>
            <!-- Panel de tarjetas para proyectos -->
            <div id="tabTarjetas" class="d-xl-none row">
              <!-- Aqui van los datos generados por la lógica -->
            </div>
          </div>
        </div>
        ${editarImagenPerfil.template} 
              `,
  script: () => {
    // Capturamos los datos del usuario logueado
    const usuario = ls.getUsuario();

    // **** AQUI DEBEMOS CAPTURAR LOS PROYECTOS DE LA BASE DE DATOS ****

    // Capturamos proyectos y guardamos en variable para poder ser filtrada
    const datosProyectos = proyectos;
    const datosUsuarios = perfiles;

    // Definimos que por defecto se muestran 'proyectos'
    let selectUsuarios = true;
    // *** Detectamos si se cambia de proyectos a usuarios al hacer click en las pestañas ***
    document.querySelector(".nav-tabs").addEventListener("click", (event) => {
      if (event.target.classList.contains("fichaUsuarios")) {
        // Si click en Usuarios cambiamos pestaña activa
        document.querySelector(".fichaUsuarios").classList.add("active");
        document.querySelector(".fichaProyectos").classList.remove("active");
        selectUsuarios = true;
        console.log("tabusuarios");
        document.querySelector("#tabUsuarios").classList.add("d-block");
        document.querySelector("#tabUsuarios").classList.remove("d-none");
        document.querySelector("#tabProyectos").classList.add("d-none");
      } else {
        // Si click en Proyectos cambiamos pestaña activa
        document.querySelector(".fichaProyectos").classList.add("active");
        document.querySelector(".fichaUsuarios").classList.remove("active");
        selectUsuarios = false;
        console.log("tabProyectos");
        document.querySelector("#tabProyectos").classList.add("d-block");
        document.querySelector("#tabProyectos").classList.remove("d-none");
        document.querySelector("#tabUsuarios").classList.add("d-none");
      }

      // Actualizamos los datos en el panel central
      pintaUsuarios(datosUsuarios);
      pintaProyectos(datosProyectos);
    });

    // ###############################################
    // **** PINTAR PROYECTOS ****
    // ###############################################

    const pintaProyectos = (proyectosFiltrados) => {
      let tablaProyectos = `
          <table
            class="table table-hover align-middle mt-3"
            style="min-width: 1000px"
          >
            <thead>
              <tr>
                <th></th>
                <th>
                  Nombre <span><i class="bi bi-caret-down"></i></span>
                </th>
                <th>
                  Descripción <span><i class="bi bi-caret-up"></i></span>
                </th>
                <th>
                  Enlace <span><i class="bi bi-caret-up"></i></span>
                </th>
                <th>Repositorio</th>
                <th>
                  Autor <span><i class="bi bi-caret-up"></i></span>
                </th>
                <th>
                  Fecha <span><i class="bi bi-caret-up"></i></span>
                </th>
                <th>
                  Estado <span><i class="bi bi-caret-up"></i></span>
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>`;

      // Iteramos para cada proyecto del array 'proyectos'
      proyectosFiltrados.forEach((proyecto) => {
        // sumamos un tr con los datos del proyecto
        tablaProyectos += `
      <tr>
        <td>
          <div class="containerImagen">
            <img 
              width="200px" 
              src=${proyecto.imagen || "images/imagenVacia.png"} 
              alt="imagen proyecto"
              class="verDetalle"/>
          </div>
        </td>
        <td>${proyecto.nombre}</td>
        <td>${proyecto.descripcion}</td>
        <td><a href="${
          proyecto.enlace
        }"><i class="bi bi-link fs-4"></i></a></td>
        <td><a href="${
          proyecto.repositorio
        }"><i class="bi bi-folder-symlink fs-4"></i></a></td>
        <td>${proyecto.nombre_usuario} ${proyecto.apellidos_usuario}</td>
        <td>${proyecto.created_at}</td>
        <td>${proyecto.estado}</td>
        <td>
          <a
          data-user_id = ${proyecto.user_id}
          class="d-none d-sm-inline btn btn-sm btn-outline-primary bi bi-pencil botonAdmin botonEditar"
          ></a>
        </td>
        <td>
          <a
            data-user_id = ${proyecto.user_id}
            class="d-none d-sm-inline btn btn-sm btn-outline-danger bi bi-trash3 botonAdmin botonBorrar"
          ></a>
        </td>
      </tr>
            
      `;
      });

      tablaProyectos += `
          </tbody>
        </table>
      <!-- Aquí se inyencta el contenido de las tablas -->
      `;
      // inyectamos el resultado en el tbody
      document.querySelector("#tabProyectos").innerHTML = tablaProyectos;
    };

    // ####################################################################
    // *** PINTAR USUARIOS ***
    // ####################################################################

    const pintaUsuarios = (usuariosFiltrados) => {
      let tablaUsuarios = `
      <form id="formUsuarios" action"" novalidate>
          <table
              class="table table-hover align-middle mt-3"
              style="min-width: 1200px"
          >
              <thead>
                  <tr>
                      <th></th>
                      <th>
                          URL imagen <span><i class="bi bi-caret-down"></i></span>
                      </th>
                      <th>
                          Email <span><i class="bi bi-caret-down"></i></span>
                      </th>
                      <th>
                          Nombre <span><i class="bi bi-caret-up"></i></span>
                      </th>
                      <th>
                          Apellidos <span><i class="bi bi-caret-up"></i></span>
                      </th>
                      <th>
                          Fecha <span><i class="bi bi-caret-up"></i></span>
                      </th>
                      <th>
                          Rol <span><i class="bi bi-caret-up"></i></span>
                      </th>
                      <th>
                          Estado <span><i class="bi bi-caret-up"></i></span>
                      </th>
                      <th></th>
                      <th></th>
                  </tr>
              </thead>
            `;

      // Iteramos para cada proyecto del array 'proyectos'
      usuariosFiltrados.forEach((usuario) => {
        // sumamos un tr con los datos del proyecto
        tablaUsuarios += `
            <tr>
              <td>
                  <div class="containerImagen">
                      <div
                          class="rounded-circle d-flex align-items-end justify-content-end"
                          style="
                              background-image: url(${
                                usuario.avatar || "images/imagenVacia.png"
                              });
                              width: 50px;
                              height: 50px;
                              background-size: cover;
                              background-position: center;
                          "
                      >
                          <i data-id = "${usuario.user_id}"
                          data-avatar="${usuario.avatar}"
                          data-urlAvatar = "urlImagen_${
                            usuario.user_id
                          }" class="btn btn-success btn-sm rounded-circle bi bi-pencil botonEditarImg"
                          data-bs-toggle="modal"
                          data-bs-target="#modalEditarImagenPerfil"></i>
                      </div>
                  </div>
              </td>
              <td>
                  <input
                      id="urlImagen_${usuario.user_id}"
                      type="url"
                      name="avatar"
                      class="form-control form-control-sm"
                      value="${usuario.avatar}"
                  />
              </td>
              <td>
                  <input
                    required
                      id="email_${usuario.user_id}"
                      type="email"
                      name="email"
                      class="form-control form-control-sm"
                      value="${usuario.email}"
                  />
              </td>
              <td>
                  <input
                      id="nombreUsuario_${usuario.user_id}"
                      type="text"
                      name="nombre"
                      class="form-control form-control-sm"
                      value="${usuario.nombre}"
                  />
              </td>
              <td>
                  <input
                      id="apellidosUsuario_${usuario.user_id}"
                      type="text"
                      name="apellidos"
                      class="form-control form-control-sm"
                      value="${usuario.apellidos}"
                  />
              </td>

              <td>
                  <input
                      type="date"
                      name="created_at"
                      class="form-control form-control-sm"
                      value="${usuario.created_at}"
                  />
              </td>
              <td>
                  <select class="form-control form-control-sm" name="rol" id="rol_${
                    usuario.user_id
                  }">
                      <option value="${usuario.rol}">${usuario.rol}</option>
                      <option value="2">opción2</option>
                  </select>
              </td>
              <td>
                  <select class="form-control form-control-sm" name="estado" id="estado_${
                    usuario.user_id
                  }">
                      <option value="${usuario.estado}">${
          usuario.estado
        }</option>
                      <option value="2">opción2</option>
                  </select>
              </td>

              <td><button data-id="${
                usuario.user_id
              }" type="submit" class="btn btn-sm btn-success botonActualizar">Actualizar</button></td>
              
              <td><i data-id="${
                usuario.user_id
              }" class="btn btn-sm btn-outline-danger bi bi-trash3 botonEliminar"></i></td>
            </tr>
        `;
      });

      tablaUsuarios += `
        </table>
      </form>
      `;
      // inyectamos el resultado en el tbody
      document.querySelector("#tabUsuarios").innerHTML = tablaUsuarios;
    };

    pintaUsuarios(datosUsuarios);

    // ####################################################################
    // BOTONES DE EDICIÓN, BORRADO y VISUALIZACIÓN DE DETALLE DE PROYECTOS
    // ####################################################################

    // Detectamos clic sobre main (Usamos delegación de eventos porque la tabla y tarjetas se actualizan constantemente en el DOM)
    document.querySelector("main").addEventListener("click", (event) => {
      let id = "";
      // Si hemos pulsado sobre uno de los botones DE EDICIÓN O BORRADO
      if (event.target.classList.contains("botonAdmin")) {
        const boton = event.target;
        // Capturamos el id de su dataset
        const id = boton.dataset.id;
        if (boton.classList.contains("botonEditar")) {
          // Si se trata de editar
          console.log("Editar proyecto " + id);

          // Cargamos la vista para editar proyecto pasandole como parámetro el id
          window.location = `#/proyectoEditar/${id}`;
        } else if (boton.classList.contains("botonBorrar")) {
          // Si se trata de borrar
          alert("Borrar proyecto " + id);

          // *** AQUÍ VA LA FUNCIÓN QUE BORRA DE LA BASE DE DATOS EL PROYECTO CORRESPONDIENTE AL ID ***
        }
      }
      // Si hacemos clic sobre la imagen de detalle
      if (event.target.classList.contains("verDetalle")) {
        id = event.target.dataset.id;

        window.location = `#/proyectoDetalle/${id}`;
      }
    });

    // ###############################################
    // *** FILTRO PARA BUSCADOR ***
    // ###############################################

    // Capturamos el input de búsqueda
    const inputBusqueda = document.getElementById("inputBusqueda");
    // Agregamos un evento de escucha para el evento de entrada en el input de búsqueda
    inputBusqueda.addEventListener("input", () => {
      // Capturamos el texto de búsqueda del input, conviértelo a minúsculas y elimina espacios en blanco al principio y al final
      const textoBusqueda = inputBusqueda.value.toLowerCase().trim();
      // Filtramos los proyectos que coinciden con el texto de búsqueda en cualquier campo
      let informacion = [];
      if (selectUsuarios) {
        informacion = datosUsuarios;
      } else {
        informacion = datosProyectos;
      }
      const informacionFiltrada = informacion.filter((proyecto) => {
        // Itera sobre las propiedades (campos) de cada proyecto
        for (const key in proyecto) {
          // Obtenemos el valor del campo actual
          const valorCampo = proyecto[key];
          // Verificamos si el valor del campo es una cadena y si contiene el texto de búsqueda
          if (
            typeof valorCampo === "string" &&
            valorCampo.toLowerCase().includes(textoBusqueda)
          ) {
            // Si hay coincidencia, devuelve true para incluir el proyecto en la lista filtrada
            return true;
          }
        }
        // Si no se encontró coincidencia en ningún campo, devuelve false para excluir el proyecto
        return false;
      });
      // Volvemos a pintar los datos con los proyectos o usuarios filtrados por el buscador
      if (selectUsuarios) {
        pintaUsuarios(informacionFiltrada);
      } else {
        pintaProyectos(informacionFiltrada);
      }
    });
    // Borrar datos del input del buscador
    document.querySelector("#borrarBuscador").addEventListener("click", () => {
      // Borramos contenido del buscador
      document.getElementById("inputBusqueda").value = "";
      // Actualizamos array con todos los proyectos
      // const proyectosFiltrados = datos
      // Actualizamos los datos en el panel central

      if (selectUsuarios) {
        pintaUsuarios(datosUsuarios);
      } else {
        pintaProyectos(datosProyectos);
      }
    });

    // ###############################################
    // *** VALIDACION DE FORMULARIOS CON BOOTSTRAP ***
    // ###############################################

    const formulario = document.querySelector("#formUsuarios");

    formulario.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Click en el evento de boton actualizar

      if (
        e.target.classList.contains("botonActualizar") &&
        formulario.checkValidity()
      ) {
        const id = e.target.dataset.id;
        enviaDatos(id);
      } else {
        formulario.classList.add("was-validated");
      }

      // Click en el boton de eliminar usuario

      if (e.target.classList.contains("botonEliminar")) {
        const tr = e.target.parentNode.parentNode;

        // Ocultamos el TR haciendo así que no aparezca el contenido en nuestro DIV
        tr.classList.add("d-none");
        const id = e.target.dataset.id;
        borrarUsuario(id);
      }

      // Click en el evento editar imagen de vista admin

      if (e.target.classList.contains("botonEditarImg")) {
        // Capturamos datos para enviar al modal
        const avatar = e.target.dataset.avatar;
        const urlAvatar = e.target.dataset.urlavatar;
        const id = e.target.dataset.id;
        // Abrimos ventana de edición de perfil (del componente editarImagenPerfil)
        editarImagenPerfil.script(avatar, urlAvatar, id);
      }
    });

    // Si el input cambia a un formato que no valida, aparece mensaje de error

    formulario.addEventListener("change", (e) => {
      // Comprobamos si el formulario no valida
      if (!formulario.checkValidity()) {
        console.log("Formulario no válido");
        // Añadimos la clase para mostrar mensajes de error
        formulario.classList.add("was-validated");
      } else {
        formulario.classList.remove("was-validated"); // Limpia errores si todo esta correcto
      }
    });

    // Función para enviar datos a la base de datos
    function enviaDatos(id) {
      // capturamos los datos del tr correspondiente al botón pulsado
      const proyectoEditado = {
        imagen: document.querySelector("#urlImagen_" + id).value,
        nombre: document.querySelector("#nombreUsuario_" + id).value,
        apellidos: document.querySelector("#apellidosUsuario_" + id).value,
        estado: document.querySelector("#estado_" + id).value,
        email: document.querySelector("#email_" + id).value,
      };
      alert(
        `Enviando a la base de datos el objeto con id = ${usuario.user_id}`
      );
      console.log(
        `Enviando a la base de datos el objeto con id = ${usuario.user_id}`,
        proyectoEditado
      );
    }

    // Función para borrar registro de la base de datos
    function borrarUsuario(id) {
      alert("Borrando usuario " + id);
    }
  },
};