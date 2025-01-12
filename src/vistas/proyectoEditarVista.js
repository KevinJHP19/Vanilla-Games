export default {
  template: // html
  `
    <div class="container">
      <h1 class="mt-5">Edición de proyecto</h1>
      <div class="d-flex justify-content-end">
        <button class="btn btn-outline-secondary mt-5">
          <i class="bi bi-arrow-bar-left" style="font-size: 1em"></i>
          Volver
        </button>
      </div>
      <form action="" class="form border shadow-sm p-3" novalidate>
        <div class="row mt-2">
          <div class="col-12 col-md-4 pt-2 mb-3">
            <img src=".images/juego.jpg" alt="" class="img-fluid" />
            <label class="form-label mt-2" for="urlImagen"
              ><strong>URL imagen: </strong></label
            >
            <input
              id="urlImagen"
              type="text"
              class="form-control"
              value="http://enlaceImagen.com"
              required
            />
            <div class="invalid-feedback">Por favor, ingresa una URL válida.</div>
          </div>

          <div class="col-12 col-md-8">
            <!-- Formulario nuevo proyecto -->
            <label class="form-label" for="nombre"><strong>Nombre: </strong></label>
            <input
              required
              id="nombre"
              type="text"
              value="Nombre Autor"
              class="form-control"
            />
            <div class="invalid-feedback">El nombre es obligatorio.</div>

            <!-- Descripcion -->
            <label class="form-label mt-2" for="descripcion"><strong>Descripción: </strong></label>
            <textarea
              id="descripcion"
              class="form-control"
              rows="4"
              required
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, sunt? Recusandae labore at voluptatem tempore incidunt distinctio eaque? Est aspernatur laudantium itaque ullam numquam autem dolor quia amet eum consectetur.
            </textarea>
            <div class="invalid-feedback">La descripción es obligatoria.</div>

            <!-- Estado -->
            <label class="form-label mt-2" for="estado"><strong>Estado: </strong></label>
            <select required id="estado" class="form-control">
              <option value="">Selecciona un estado</option>
              <option value="estado">Estado</option>
              <option value="otro estado">Otro estado</option>
            </select>
            <div class="invalid-feedback">Por favor, selecciona un estado.</div>

            <!-- Fecha -->
            <label class="form-label mt-2" for="fecha"><strong>Fecha: </strong></label>
            <input id="fecha" type="date" class="form-control" value="12/12/2023" required />
            <div class="invalid-feedback">Por favor, selecciona una fecha.</div>

            <!-- Enlace al proyecto -->
            <label class="form-label mt-2" for="enlace"><strong>Enlace: </strong></label>
            <input
              id="enlace"
              type="url"
              class="form-control"
              value="http://enlace.com"
              required
            />
            <div class="invalid-feedback">Por favor, ingresa un enlace válido.</div>

            <label class="form-label mt-2" for="repositorio"><strong>Repositorio: </strong></label>
            <input
              id="repositorio"
              type="text"
              class="form-control"
              value="user.github.com/123456"
              required
            />
            <div class="invalid-feedback">El repositorio es obligatorio.</div>

            <input
              type="submit"
              class="btn btn-success mt-3"
              value="Subir proyecto"
            />
          </div>
        </div>
      </form>
    </div>

  `
  ,script: () => {
      console.log('vista registro cargada')
      // Validación bootstrap
  
      // Capturamos el formulario en una variable
      const formulario = document.querySelector('form')
      // Detectamos su evento submit (enviar)
      formulario.addEventListener('submit', (event) => {
        // Detenemos el evento enviar (submit)
          event.preventDefault()
          event.stopPropagation()
      // Comprobamos si el formulario no valida
        if (!formulario.checkValidity()) {
          // Y añadimos la clase 'was-validate' para que se muestren los mensajes
          formulario.classList.add('was-validated')
        }
      })
  }
  
}