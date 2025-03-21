import { ls } from "../componentes/funciones";
import { User } from "../bd/user";
import { Perfil } from "../bd/perfil";
import { header } from "../componentes/header";

export default {
  template: `
    <div class="container">
        <h1 class="mt-5 text-center">Inicia sesión</h1>
        <div class="m-5 mx-auto" style="max-width: 400px">
          <form class="form border shadow-sm p-3 needs-validation formulario" action="" novalidate>
            <div class="mb-3">
              <label for="email" class="form-label">Email:</label>
              <input id="email" name="email" type="email" class="form-control" required />
              <div class="invalid-feedback">
                Por favor, introduce un email válido.
              </div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Contraseña:</label>
              <input
                required
                id="password"
                name="password"
                type="password"
                minlength="6"
                class="form-control"
              />
              <div class="invalid-feedback">
                La contraseña debe tener al menos 6 caracteres.
              </div>
            </div>
            <div class="form-check mt-3">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked
              />
              <label class="form-check-label" for="flexCheckChecked">
                Recordar sesión
              </label>
            </div>
            <a class="d-block text-end" href="#"
              >¿Has olvidado tu contraseña?</a
            >
            <button type="submit" class="btn btn-primary w-100 mt-3" href="#/proyectos">
              Iniciar sesión
            </button>
          </form>
          <a class="d-block mt-5 btn btn-secondary mx-auto" href="#"
            >¿Eres nuevo? Regístrate</a
          >
        </div>
      </div>`,

  script: () => {
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    // Script para la validación del formulario

    (function () {
      "use strict";

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll(".needs-validation");

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              event.preventDefault();
              enviarDatos(form);
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    })();

    // Función para enviar datos a la bd
    async function enviarDatos(formulario) {
      try {
        // login
        const user = {
          email: formulario.email.value,
          password: formulario.password.value,
        };
        User.logout();
        const usuarioLogueado = await User.login(user);
        console.log("¡login correcto!", usuarioLogueado);
        // Ahora vamos a capturar los datos del perfil del usuario logueado
        console.log("usuarioLogueado", usuarioLogueado);
        const userId = usuarioLogueado.id;
        console.log("userId", userId);
        const perfilLogueado = await Perfil.getByUserId(userId);
        console.log("Perfil logueado", perfilLogueado);
        const usuario = {
          email: usuarioLogueado.email,
          rol: perfilLogueado.rol,
          avatar: perfilLogueado.avatar,
        };
        console.log("perfil localstorage", usuario);
        // Guardamos datos de usaurio en localstorage
        ls.setUsuario(usuario);
        // Cargamos página home
        window.location = "#/proyectos";
        // Actualizamos el header para que se muestren los menús que corresponden al rol
        header.script();
      } catch (error) {
        console.log("Error al iniciar sesión", error);
        alert("El usuario no existe o la contraseña no es correcta", error);
      }
    }
  },
};
     