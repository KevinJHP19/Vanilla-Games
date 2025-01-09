import { header } from './componentes/header.js'
import { footer } from './componentes/footer.js'

async function cargarVista () {
    const componente = await import('./vistas/homeVista.js')
    const vista = componente.default
    // Inyectamos la vista home
    document.querySelector('main').innerHTML = vista.template
  }
  cargarVista()
  
  //Inyectamos el componente header
  document.querySelector('header').innerHTML = header.template
  
  //Inyectamos el componente footer
  document.querySelector('footer').innerHTML = footer.template