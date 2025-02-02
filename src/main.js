
import { header } from './componentes/header'
import { footer } from './componentes/footer'
import './scss/styles.scss'
import 'bootstrap'
import { enrutador } from "./componentes/enrutador"



// Importamos la vista por defecto (que será home)


// Inyectamos el componente header
document.querySelector('header').innerHTML = header.template
header.script()
// Inyectamos el componente footer
document.querySelector('footer').innerHTML = footer.template

enrutador.observadorRutas()
// Cargamos la página home
window.location = '#/home'



