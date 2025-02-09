const registroVista = {
  template: `
    <div class="container">
                <h1 class="mt-5 text-center">Registro</h1>
                <div class="m-5 mx-auto" style="max-width: 400px">
                    
                    <form novalidate action="" class="form border shadow-sm p-3 needs-validation" >
                        <div class="mb-3">
                            <label for="nombre" class="form-label">Nombre:</label>
                            <input id="nombre" type="text" class="form-control" required />
                            <div class="invalid-feedback">Por favor ingresa tu nombre.</div>
                        </div>
                        <div class="mb-3">
                            <label for="apellidos" class="form-label">Apellidos:</label>
                            <input id="apellidos" type="text" class="form-control" required />
                            <div class="invalid-feedback">Por favor ingresa tus apellidos.</div>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email:</label>
                            <input id="email" type="email" class="form-control" required />
                            <div class="invalid-feedback">El formato del email no es correcto.</div>
                        </div>
                        <div class="mb-3">
                            <label for="pass" class="form-label mt-3">Contraseña:</label>
                            <input id="pass" type="password" class="form-control" required minlength="6" />
                            <div class="invalid-feedback">La contraseña debe tener al menos 6 caracteres.</div>

                        <input type="submit" class="btn btn-primary w-100 mt-3" value="Enviar" />
                    </form>
                </div>
            </div>`,
  script: () => {
    console.log("vista registro cargada");
    const formulario = document.querySelector("form");
    formulario.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!formulario.checkValidity()) {
        formulario.classList.add("was-validated");
      }
    });
  }
};
export {
  registroVista as default
};
