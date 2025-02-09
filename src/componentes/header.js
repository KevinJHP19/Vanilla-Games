
import { ls } from './funciones.js'
import { menuRol, menuUsuario } from './menus.js'
import { editarPerfil } from './editarPerfil.js'

export const header = {
    template: // html
    `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#/home"
        ><img
          src="images/logo.svg"
          alt=""
          width="30"
          height="24"
          class="d-inline-block align-text-top router-link"
        />
        Vanilla Games</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">


      <!-- Menu comun para todos los usuarios -->
  <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
    <li class="nav-item">
      <a class="nav-link active router-link" aria-current="page" href="#/home">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link router-link" aria-current="page" href="#">TOP5 Proyectos</a>
    </li>
    <li class="nav-item">
      <a class="nav-link router-link" aria-current="page" href="#">A cerca de</a>
    </li>
  </ul>

  <!-- Aqui va el menu rol -->
  <div id="menuRol"></div>

  <!--Aqui va el menu usuario -->
  <div id="menuUsuario"></div>
  
  
      </div>
    </div>
  </nav>
  <div id="modal">
  </div>
    `,
    script: () => {
      console.log('header Cargado')

      document.querySelector("#modal").innerHTML = editarPerfil.template;

      ls.setUsuario({ email: "chafardera@gmial.com", rol: "registrado" });

      const rolUsuario = ls.getUsuario().rol

      switch (rolUsuario) {
        case 'registrado':
          //menu rol
          document.querySelector('#menuRol').innerHTML = menuRol.templateRegistrado
          //menu usuario
          document.querySelector('#menuUsuario').innerHTML = menuUsuario.templateRegistrado
          break
        case 'desarrollador':
          //menu rol
          document.querySelector('#menuRol').innerHTML = menuRol.templateDesarrollador
          // menu usuario
          document.querySelector('#menuUsuario').innerHTML = menuUsuario.templateDesarrollador
          break
        case 'admin':
          document.querySelector('#menuRol').innerHTML = menuRol.templateAdmin
          
          document.querySelector('#menuUsuario').innerHTML = menuUsuario.templateAdmin
          break
        default : // Para usuario anonimos
        //menu rol
        document.querySelector('#menuRol').innerHTML = menuRol.templateAnonimo
      }
      try {
        document.querySelector('#emailUserMenu').innerHTML = ls.getUsuario().email
        document.querySelector('#rolUserMenu').innerHTML = ls.getUsuario().rol

        const imagen = ls.getUsuario().avatar === '' ? 'images/avatar.svg' : ls.getUsuario().avatar
        document.querySelector('#avatarMenu').setAttribute('src', imagen)
      } catch (error) {
        console.error('El usuario no esta registrado y no tiene menú de usuario');
       }
       //cerrar sesion
       //capturamos clic sobre el item de cerrar sesion
       document.querySelector('header').addEventListener('click', (event) => {
        if(event.target.classList.contains('cerrarSesion')){
          event.preventDefault()

          ls.setUsuario('')

          window.location = '#/home'
          header.script()
        }
       })

      
    
    }
  }
  
  