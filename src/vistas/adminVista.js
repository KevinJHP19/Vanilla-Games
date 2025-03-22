import { Proyecto } from "../bd/proyecto";
import { User } from "../bd/user"; 
import { ls } from "../componentes/funciones";
import { editarImagenPerfil } from "../componentes/editarImagenPerfil";

export default {
  template: `
      <div class="container">
          <h1 class="mt-5">Panel de administración</h1>
          <!-- tabs -->
          <div class="row mt-5">
            <div class="col-12">
              <ul class="nav nav-tabs">
                <li class="nav-item w-50">
                  <a class="nav-link fichaUsuarios active text-center" aria-current="page">Usuarios</a>
                </li>
                <li class="nav-item w-50">
                  <a class="nav-link fichaProyectos text-center">Proyectos</a>
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
                  <span class="input-group-text" id="addon-wrapping">
                    <i class="bi bi-search"></i>
                  </span>
                  <input id="inputBusqueda" type="text" class="form-control" placeholder="Buscador" aria-label="Username" aria-describedby="addon-wrapping"/>
                  <span class="input-group-text" id="addon-wrapping">
                    <i id="borrarBuscador" class="bi bi-x"></i>
                  </span>
                </div>
              </div>
            </div>
            <div id="tabUsuarios" class="col-12" style="overflow-x: auto"></div>
            <div id="tabProyectos" class="col-12 d-none" style="overflow-x: auto"></div>
            <!-- Panel de tarjetas para proyectos -->
            <div id="tabTarjetas" class="d-xl-none row">
              <!-- Aquí se mostrarán los datos generados por la lógica -->
            </div>
          </div>
        </div>
        ${editarImagenPerfil.template}
  `,
  script: async () => {
    const usuario = ls.getUsuario();

    // **** OBTENEMOS LOS PROYECTOS DESDE LA BD ****
    let datosProyectos = await Proyecto.getAll();
    datosProyectos = datosProyectos.map((dato) => {
      const nuevaFecha = dato.created_at.split("T")[0];
      const fechaFormateada = `${nuevaFecha.split("-")[2]}/${
        nuevaFecha.split("-")[1]
      }/${nuevaFecha.split("-")[0]}`;
      return { ...dato, created_at: fechaFormateada };
    });

    // **** OBTENEMOS LOS USUARIOS REALES DESDE LA BD ****
    const datosUsuarios = await User.getAll();

    // Por defecto se muestran los usuarios
    let selectUsuarios = true;

    // *** Cambiar entre pestañas de usuarios y proyectos ***
    document.querySelector(".nav-tabs").addEventListener("click", (event) => {
      if (event.target.classList.contains("fichaUsuarios")) {
        document.querySelector(".fichaUsuarios").classList.add("active");
        document.querySelector(".fichaProyectos").classList.remove("active");
        selectUsuarios = true;
        document.querySelector("#tabUsuarios").classList.remove("d-none");
        document.querySelector("#tabUsuarios").classList.add("d-block");
        document.querySelector("#tabProyectos").classList.add("d-none");
      } else {
        document.querySelector(".fichaProyectos").classList.add("active");
        document.querySelector(".fichaUsuarios").classList.remove("active");
        selectUsuarios = false;
        document.querySelector("#tabProyectos").classList.remove("d-none");
        document.querySelector("#tabProyectos").classList.add("d-block");
        document.querySelector("#tabUsuarios").classList.add("d-none");
      }
      if (selectUsuarios) {
        pintaUsuarios(datosUsuarios);
      } else {
        pintaProyectos(datosProyectos);
      }
    });

    // ###############################################
    // **** PINTAR PROYECTOS ****
    // ###############################################
    const pintaProyectos = (proyectosFiltrados) => {
      let tablaProyectos = `
          <table class="table table-hover align-middle mt-3" style="min-width: 1000px">
            <thead>
              <tr>
                <th></th>
                <th>Nombre <span><i class="bi bi-caret-down"></i></span></th>
                <th>Descripción <span><i class="bi bi-caret-up"></i></span></th>
                <th>Enlace <span><i class="bi bi-caret-up"></i></span></th>
                <th>Repositorio</th>
                <th>Autor <span><i class="bi bi-caret-up"></i></span></th>
                <th>Fecha <span><i class="bi bi-caret-up"></i></span></th>
                <th>Estado <span><i class="bi bi-caret-up"></i></span></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>`;

      proyectosFiltrados.forEach((proyecto) => {
        tablaProyectos += `
      <tr data-id="${proyecto.id}" class="verDetalle">
        <td>
          <div class="containerImagen">
            <img width="200px" class="verDetalle" data-id="${
              proyecto.id
            }" src="${
          proyecto.imagen || "images/imagenVacia.png"
        }" alt="imagen proyecto"/>
          </div>
        </td>
        <td>${proyecto.nombre}</td>
        <td>${proyecto.descripcion}</td>
        <td><a href="${
          proyecto.enlace
        }" target="_blank"><i class="bi bi-link fs-4"></i></a></td>
        <td><a href="${
          proyecto.repositorio
        }" target="_blank"><i class="bi bi-folder-symlink fs-4"></i></a></td>
        <td>${proyecto.nombre_usuario} ${proyecto.apellidos_usuario || ""}</td>
        <td>${proyecto.created_at}</td>
        <td>${proyecto.estado}</td>
        <td>
          <a data-id="${
            proyecto.id
          }" class="d-none d-sm-inline btn btn-sm btn-outline-primary bi bi-pencil botonAdmin botonEditar"></a>
        </td>
        <td>
          <a data-id="${
            proyecto.id
          }" class="d-none d-sm-inline btn btn-sm btn-outline-danger bi bi-trash3 botonAdmin botonBorrar"></a>
        </td>
      </tr>
      `;
      });
      tablaProyectos += `</tbody></table>`;
      document.querySelector("#tabProyectos").innerHTML = tablaProyectos;
    };

    // ###############################################
    // **** PINTAR USUARIOS ****
    // ###############################################
    const pintaUsuarios = (usuariosFiltrados) => {
      let tablaUsuarios = `
      <form id="formUsuarios" action="" novalidate>
          <table class="table table-hover align-middle mt-3" style="min-width: 1200px">
              <thead>
                  <tr>
                      <th></th>
                      <th>URL imagen <span><i class="bi bi-caret-down"></i></span></th>
                      <th>Email <span><i class="bi bi-caret-down"></i></span></th>
                      <th>Nombre <span><i class="bi bi-caret-up"></i></span></th>
                      <th>Apellidos <span><i class="bi bi-caret-up"></i></span></th>
                      <th>Fecha <span><i class="bi bi-caret-up"></i></span></th>
                      <th>Rol <span><i class="bi bi-caret-up"></i></span></th>
                      <th>Estado <span><i class="bi bi-caret-up"></i></span></th>
                      <th></th>
                      <th></th>
                  </tr>
              </thead>
            `;
      usuariosFiltrados.forEach((usuario) => {
        tablaUsuarios += `
            <tr>
              <td>
                  <div class="containerImagen">
                      <div class="rounded-circle d-flex align-items-end justify-content-end" style="
                              background-image: url(${
                                usuario.avatar || "images/imagenVacia.png"
                              });
                              width: 50px;
                              height: 50px;
                              background-size: cover;
                              background-position: center;
                          ">
                          <i data-id="${usuario.id}" data-avatar="${
          usuario.avatar
        }" data-urlavatar="urlImagen_${
          usuario.id
        }" class="btn btn-success btn-sm rounded-circle bi bi-pencil botonEditarImg" data-bs-toggle="modal" data-bs-target="#modalEditarImagenPerfil"></i>
                      </div>
                  </div>
              </td>
              <td>
                  <input id="urlImagen_${
                    usuario.id
                  }" type="url" name="avatar" class="form-control form-control-sm" value="${
          usuario.avatar
        }"/>
              </td>
              <td>
                  <input required id="email_${
                    usuario.id
                  }" type="email" name="email" class="form-control form-control-sm" value="${
          usuario.email
        }"/>
              </td>
              <td>
                  <input id="nombreUsuario_${
                    usuario.id
                  }" type="text" name="nombre" class="form-control form-control-sm" value="${
          usuario.nombre
        }"/>
              </td>
              <td>
                  <input id="apellidosUsuario_${
                    usuario.id
                  }" type="text" name="apellidos" class="form-control form-control-sm" value="${
          usuario.apellidos
        }"/>
              </td>
              <td>
                  <input type="date" name="created_at" class="form-control form-control-sm" value="${
                    new Date(usuario.created_at).toISOString().split('T')[0]
                  }"/>
              </td>
              <td>
                  <select class="form-control form-control-sm" name="rol"  id="rol_${
                    usuario.id
                  }">
                      <option value="${usuario.rol}">${usuario.rol}</option>
                      <option value="2">opción2</option>
                  </select>
              </td>
              <td>
                  <select class="form-control form-control-sm" name="estado" id="estado_${
                    usuario.id
                  }">
                      <option value="${usuario.estado}">${
          usuario.estado
        }</option>
                      <option value="2">opción2</option>
                  </select>
              </td>
              <td>
                  <button data-id="${
                    usuario.id
                  }" type="submit" class="btn btn-sm btn-success botonActualizar">Actualizar</button>
              </td>
              <td>
                  <i data-id="${
                    usuario.id
                  }" class="btn btn-sm btn-outline-danger bi bi-trash3 botonEliminar"></i>
              </td>
            </tr>
        `;
      });

      tablaUsuarios += `</table></form>`;
      document.querySelector("#tabUsuarios").innerHTML = tablaUsuarios;
    };

    // Pintamos la pestaña inicialmente (usuarios por defecto)
    if (selectUsuarios) {
      pintaUsuarios(datosUsuarios);
    } else {
      pintaProyectos(datosProyectos);
    }
    // Actualizamos vista inicial de usuarios
    pintaUsuarios(datosUsuarios);

    // ####################################################################
    // BOTONES DE EDICIÓN, BORRADO y VISUALIZACIÓN DE DETALLE DE PROYECTOS
    // ####################################################################
    document.querySelector("main").addEventListener("click", async (event) => {
      const boton = event.target.closest(".botonAdmin");
      if (boton) {
        event.preventDefault();
        event.stopPropagation();
        const id = boton.dataset.id;

        if (boton.classList.contains("botonEditar")) {
          console.log("Editar proyecto " + id);
          window.location = `#/proyectoEditar/${id}`;
        } else if (boton.classList.contains("botonBorrar")) {
          if (confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
            try {
              await Proyecto.delete(id);
              alert(`Proyecto ${id} eliminado exitosamente.`);
              let datosProyectos = await Proyecto.getAll();
              datosProyectos = datosProyectos.map((dato) => {
                const nuevaFecha = dato.created_at.split("T")[0];
                const fechaFormateada = `${nuevaFecha.split("-")[2]}/${
                  nuevaFecha.split("-")[1]
                }/${nuevaFecha.split("-")[0]}`;
                return { ...dato, created_at: fechaFormateada };
              });
              pintaProyectos(datosProyectos);
            } catch (error) {
              alert("Error al eliminar el proyecto: " + error.message);
            }
          }
        }
      }
      if (event.target.classList.contains("verDetalle")) {
        const id = event.target.dataset.id;
        window.location = `#/proyectoDetalle/${id}`;
      }
    });

    // ###############################################
    // FILTRO PARA BUSCADOR
    // ###############################################
    const inputBusqueda = document.getElementById("inputBusqueda");
    inputBusqueda.addEventListener("input", () => {
      const textoBusqueda = inputBusqueda.value.toLowerCase().trim();
      let informacion = selectUsuarios ? datosUsuarios : datosProyectos;
      const informacionFiltrada = informacion.filter((item) => {
        for (const key in item) {
          const valorCampo = item[key];
          if (
            typeof valorCampo === "string" &&
            valorCampo.toLowerCase().includes(textoBusqueda)
          ) {
            return true;
          }
        }
        return false;
      });
      if (selectUsuarios) {
        pintaUsuarios(informacionFiltrada);
      } else {
        pintaProyectos(informacionFiltrada);
      }
    });
    document.querySelector("#borrarBuscador").addEventListener("click", () => {
      document.getElementById("inputBusqueda").value = "";
      if (selectUsuarios) {
        pintaUsuarios(datosUsuarios);
      } else {
        pintaProyectos(datosProyectos);
      }
    });

    // VALIDACIÓN DE FORMULARIOS CON BOOTSTRAP
    const formulario = document.querySelector("#formUsuarios");
    formulario.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (
        e.target.classList.contains("botonActualizar") &&
        formulario.checkValidity()
      ) {
        const id = e.target.dataset.id;
        enviaDatos(id);
      } else {
        formulario.classList.add("was-validated");
      }
      if (e.target.classList.contains("botonEliminar")) {
        const tr = e.target.parentNode.parentNode;
        tr.classList.add("d-none");
        const id = e.target.dataset.id;
        borrarUsuario(id);
      }
      if (e.target.classList.contains("botonEditarImg")) {
        const avatar = e.target.dataset.avatar;
        const urlAvatar = e.target.dataset.urlavatar;
        const id = e.target.dataset.id;
        editarImagenPerfil.script(avatar, urlAvatar, id);
      }
    });
    formulario.addEventListener("change", (e) => {
      if (!formulario.checkValidity()) {
        formulario.classList.add("was-validated");
      } else {
        formulario.classList.remove("was-validated");
      }
    });

    function enviaDatos(id) {
      const proyectoEditado = {
        imagen: document.querySelector("#urlImagen_" + id).value,
        nombre: document.querySelector("#nombreUsuario_" + id).value,
        apellidos: document.querySelector("#apellidosUsuario_" + id).value,
        estado: document.querySelector("#estado_" + id).value,
        email: document.querySelector("#email_" + id).value,
      };
      alert(
        `Enviando a la base de datos el objeto con id = ${usuario.id}`
      );
      console.log(
        `Enviando a la base de datos el objeto con id = ${usuario.id}`,
        proyectoEditado
      );
    }

    function borrarUsuario(id) {
      alert("Borrando usuario " + id);
    }
  },
};