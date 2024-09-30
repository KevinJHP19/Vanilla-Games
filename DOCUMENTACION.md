# Documentación
## Escenario del proyecto
**Vanilla Games S.L.** es una empresa de desarrollo de **minijuegos para navegadores web**, creados con vanillaJS, es decir, desarrollados exclusivamente con **Javascript** como lenguaje de programación (sin frameworks)

En esta empresa trabajan 10 desarrolladores y, habitualmente, suelen tener a tres alumnos/as en prácticas, de los cuales, al menos uno, tendrá muchas posibilidades de formar parte del equipo de desarrollo al acabar su etapa de formación.

El método de trabajo que se utiliza en dicha empresa consiste en **proponer a cada uno de los miembros del equipo el desarrollo de un minijuego** que, al acabar, deberán compartir con el resto de sus compañeros. Estos, a su vez, deben comentar y valorar cada una de las propuestas. Finalmente, en la empresa hay un equipo responsable de seleccionar aquellas propuestas que muestran un mayor potencial, para ser desarrolladas de manera definitiva por todo el equipo de trabajo, con el fin de crear una aplicación para su posterior comercialización.

Hasta la fecha, para el proceso de publicación de proyectos, comentarios y valoración utilizaban algunas herramientas ofimáticas, tipo hoja de cálculo de google. Actualmente pretenden crear una aplicación web tipo intranet para llevar a cabo este propósito.

Como alumno en prácticas, **tu trabajo consiste en crear una aplicación web que permitirá a los desarrolladores de Vanilla Games, publicar sus propuestas de minijuegos**, de manera que el resto de compañeros podrá hacer comentarios y emitir una valoración de cada proyecto publicado en esta plataforma.
##  Requisitos del proyecto y casos de uso general

Los **casos de uso** son una técnica de modelado utilizada en el desarrollo de software para describir las interacciones entre un sistema y sus usuarios. En términos simples, los casos de uso describen cómo los usuarios interactúan con un sistema y qué resultados esperan obtener de él.
Los casos de uso son útiles para comprender los requisitos del sistema y cómo se debe diseñar y desarrollar el software para satisfacer las necesidades de los usuarios. También son útiles para comunicar los requisitos del sistema entre los miembros del equipo de desarrollo, los stakeholders y los usuarios finales.
Además, los casos de uso pueden ser utilizados para:

- Identificar los requisitos funcionales y no funcionales del sistema.
- Ayudar a definir el alcance del proyecto.
- Facilitar la planificación y estimación de tiempo y recursos necesarios para el desarrollo del sistema.
- Facilitar la identificación y resolución de problemas antes de que se implemente el sistema.
- Ayudar a definir las pruebas necesarias para verificar que el sistema cumpla con los requisitos de los usuarios.

En general, los casos de uso son una herramienta esencial para comprender y especificar los requisitos de un sistema, y para garantizar que el software desarrollado satisfaga las necesidades de los usuarios finales.

## Casos de uso general

Esta aplicación web debe permitir a un usuario **registrarse** (con su nombre, apellidos, email y contraseña) y posteriormente **iniciar y cerrar sesión**. Un usuario registrado debe poder **ver un listado de proyectos** publicados por los desarrolladores. También podrá **editar su perfil y subir una imagen** de tipo avatar.

Si el usuario registrado tiene el perfil de **‘desarrollador’** , además, debe poder **publicar proyectos** con información del tipo: nombre de proyecto, una descripción, una imagen representativa y dos enlaces, el del proyecto desplegado en un servidor de pruebas y el del repositorio del código correspondiente, el estado del proyecto, etc. También debe poder **eliminar o editar sus proyectos**.

Por otro lado, el perfil desarrollador debería poder **realizar comentarios** de cada uno de los proyectos publicados y **añadir una valoración** en forma de estrellas.

Finalmente, habrá un administrador que podrá **administrar el perfil** de cada uno de los usuarios registrados en la plataforma (editar, borrar, etc) así como modificar el rol de cada uno de estos. También tendrá **control total sobre los comentarios y valoraciones**.

## Fases de desarrollo
Necesitamos organizarnos un poco. Vamos a planificar como vamos a llevar a cabo las diferentes fases para cumplir con nuestros objetivos:

1. Definición del proyecto y requisitos básicos: En primer lugar debemos tener muy claro qué se espera de nuestra aplicación, por lo que anotaremos cada funcionalidad teniendo en cuanta los diferentes actores (roles de acceso). Esto es lo hemos hecho en el apartado anterior.
2. Definición de las versiones: Una vez conocemos los requisitos del proyecto, dividiremos el trabajo en diferentes versiones, de manera que todas ellas serán operativas, aunque cada una ampliando las funcionalidades.
3. Planificación del proyecto: Basandonos en la metodología Agile devidiremos todo el proceso en diferentes historias/tareas (para cada una de las versiones definidas) que: agruparemos, temporizaremos y representaremos mediante diagramas.
4. Diseño de la interficie: Basandonos en el diseño centrado en el usuario (DCU):
   i. Realizaremos un Benchmarking (para copiarnos de la competencia)
   ii. Crearemos un modelo de usuarios
   iii. Diseñaremos los prototipos de bajo nivel(bocetos, wireframes)
   iv. Diseñaremos el mockup (prototipo de alto nivel) junto a la guía de estilos (usaremos la aplicación Figma)
   v. Haremos pruebas de usabilidad y rediseñaremos los prototipos.
5. Programación del frontend (html/css/js):Maquetaremos los prototipos (html/css) y diseñaremos la lógica de validación de cliente
6. Programación del backend: Utilizaremos un backend como servicio (SUPABASE) para:
   i. Crear las bases de datos
   ii. Diseñar consultas sql y funciones postgres
   iii. Programaremos un ORM en javascript para el mapping de la bd.
7. Integración de frontend y backend en la aplicación:
   i. Programaremos la SPA a partir de los prototipos
   ii. Programaremos la lógica de acceso a la bd empleando el ORM
   iii.Programaremos el resto de funcionalidades (sesiones y roles de acceso, etc)
8. Analisis usabilidad II: Haremos pruebas de usabilidad (test de usuarios) y solucionaremos los posibles conflictos detectados.
9. Testing y despliegue en producción:
   i. Diseñaremos un sistema de testing para crear tests unitarios
   ii. Configuraremos un entorno DevOps para trabajar con Integración continua y despliegue continuo (CI/CD)
   iii. Desplegaremos en producción cada una de las versiones.
## Versiones
Vamos a dividir el desarrollo del proyecto en diferentes versiones a partir de las funcionalidades que podrá realizar:

- VERSIÓN 1.0: Implementación de la publicación de proyectos
- VERSIÓN 2.0: Implementación de los comentarios de los proyectos
- VERSIÓN 3.0: Implementación del sistema de valoración mediante estrellas
- VERSIÓN 4.0: Implementación del sistema de valoración basado en rúbricas o criterios de valoración.
## Arquitectura y tecnologías
A la hora de decidir la arquitectura a implementar en el desarrollo de nuestro proyecto debemos tener en cuenta una serie de consideraciones previas, como la velocidad de carga inicial, el SEO, la experiencia de usuario, etc. pero también debemos considerar aspectos técnicos. Vamos a analizar primero algunas de las posibilidades que podemos elegir para la implementación de nuestro proyecto:
**Server-side rendering (SSR)**:
En SSR, el servidor procesa la petición del cliente y devuelve una página web completamente renderizada. Esto significa que el servidor envía HTML, CSS y JavaScript al navegador web del cliente, y el navegador solo necesita renderizar el contenido. SSR es beneficioso para el SEO y la velocidad de carga inicial de la página.*

**Client-side rendering (CSR)**:
En CSR, el servidor envía una página web vacía o mínima al navegador del cliente y luego el cliente utiliza JavaScript para renderizar el contenido. Esto significa que el navegador necesita descargar e interpretar el código JavaScript para mostrar el contenido. CSR es beneficioso para la interactividad de la página y una mejor experiencia de usuario.

**Static site generation (SSG)**:
En SSG, el contenido de una página web se genera de antemano en archivos HTML estáticos, los cuales se sirven al navegador del cliente. Esto es ideal para sitios web con contenido estático que no necesita actualizaciones frecuentes y para mejorar la velocidad de carga de la página.

**Incremental static regeneration (ISR)**:
ISR es una técnica de SSG que permite actualizar secciones específicas de una página web en lugar de regenerar la página completa cada vez. Esto es útil para páginas web que contienen contenido estático pero que necesitan actualizar secciones específicas de forma frecuente.

## ¿Que arquitectura vamos a utilizar en nuestro proyecto?
En nuestro caso **nos basaremos en CSR**, es decir, renderizamos todo el código html en el navegador. El cliente solo se encargará de responder a las peticiones devolviendo los datos solicitados (en formato json). De esta manera podemos dividir la implementación del proyecto en **FRONTEND y BACKEND**, separando cada funcionalidad y desarrollándola de manera independiente.

## ¿Como diseñaremos nuestro FrontEnd ?
##   Diseño de la interficie
En primer lugar, **para el diseño de la interficie**, crearemos los **bocetos** de nuestra aplicación (con papel y lapiz, como se ha hecho siempre).

Más tarde, éstos evolucionarán hacia el **Wireframe** (Diseño de alambres carente de estilo) que finalmente se convertirá en un **Mockup** (diseño con colores y tipografías definitivas). Para el diseño de este último y para implementación de la **guía de estilos** utilizaremos la herramienta FIGMA.

##  Maquetación del frontend
En primer lugar crearemos los prototipos utilizando **html5, css3** y el framework Bootstrap 5. Utilizaremos una plantilla Bootswatch que adaptaremos a nuestro diseño mediante SASS.

Una vez tenemos los prototipos html creados, los integraremos en la SPA e implementaremos la lógica de programación utilizando **VanillaJS** , es decir, con Javascript puro (ES6, sin usar frameworks)

## ¿Como implementaremos las funcionalidades del BackEnd?
##   Usaremos SUPABASE como servicio de Backend
En el lado del backend utilizaremos Supabase como servicio backend.

Este servicio nos permite almacenar la información en **bases de datos relacionales** en un entorno basado en **postgreSQL.**

También nos ofrece, entre otros:
    - Un sistema de autenticación basado en proveedores como google, github, etc.

    - Un sistema de control de accesos según roles a través de las políticas de permisos.

    - Un storage de almacenamiento de archivos (para las imágenes) en los buckets que nos permite configurar.

    - Una API en javascript para las peticiones más frecuentes que atacan a las tablas de la bd (CRUD) así como un sistema de funciones personalizadas (con sus correspondiente api en js) para hacer consultas específicas (por ejemplo, consultas multitabla)
## Nuestro entorno de desarrollo: VSCODE

En el entorno de desarrollo tendremos a **VSCode** trabajando sobre **Nodejs** y su gestor de paquetes **npm**.

Configuraremos el IDE con los **plugins** necesarios para facilitar un buen flujo de trabajo.

Formatearemos el código siguiendo el estándar **'Standard'** mediante herramientas de verificación de código como **'Eslint'.**

Para el control de versiones trabajaremos con un repositorio **Git** que sincronizaremos con una cuenta de **Github.**

En el proceso de desarrollo emplearemos el flujo de trabajo **‘Flujo de rama de funcionalidad’**. Es decir, crearemos ramas específicas para cada funcionalidad que integraremos en la rama principal una vez testadas las funcionalidades. Así, nuestro repositorio reflejará todo el proceso de trabajo, las diferentes versiones, etc.
## Y para el despliegue de nuestras aplicaciones
Desplegaremos el proyecto en **github pages** (en la fase de pruebas) y utilizaremos un servicio como por ejemplo **RailWay, Netlify,** etc para el despliegue en producción.

## Requesitos y diagrama de casos de uso
En la introducción de esta documentación, en la sección El proyecto Vanilla Games, en concreto en el apartado Requisitos del proyecto y casos de uso general, hemos definido qué se espera de nuestra aplicación web, a partir de los 'Casos de uso general'.

También hemos dividido todo el trabajo de desarrollo en diferentes versiones, con la intención de que nuestro proyecto esté operativo desde el inicio de su implementación, de manera que conforme evolucione a posteriores versiones, aumentaremos su nivel de funcionalidad.

**Por lo tanto, vamos a comenzar por la versión 1.0.**

Lo primero es definir los casos de uso para esta versión. Una primera aproximación podría ser la siguiente:
## Casos de uso para la V1.0 - Definición básica
    - Registrar usuario: Un usuario puede registrarse en la plataforma proporcionando su nombre, apellidos, email y contraseña.
    - Recuperar contraseña: Un usuario registrado puede solicitar la recuperación de su contraseña en caso de que la haya olvidado. Para ello, se le enviará un correo electrónico con las instrucciones para restablecer su contraseña.
    - Iniciar sesión: Un usuario registrado puede iniciar sesión en la plataforma proporcionando su email y contraseña.
    - Cerrar sesión: Un usuario puede cerrar su sesión en la plataforma en cualquier momento.
    - Editar perfil: Un usuario registrado puede editar su perfil, actualizando su nombre, apellidos, email o contraseña.
    - Ver proyectos: Un usuario registrado puede ver un listado de proyectos publicados por los desarrolladores.
    - Publicar proyecto: Un usuario con el perfil de desarrollador puede publicar un proyecto proporcionando información como nombre, descripción, imagen representativa, enlaces a servidor de pruebas y repositorio de código, estado del proyecto, etc.
    - Editar proyecto: Un usuario con el perfil de desarrollador puede editar un proyecto que haya publicado previamente, actualizando la información del proyecto.
    - Eliminar proyecto: Un usuario con el perfil de desarrollador puede eliminar un proyecto que haya publicado previamente.
    - Ver/Editar usuarios: Un adminsrador puede ver una tabla con todos los usuarios que hay registrados y editar la información, incluido el ROL de usuario.
    - Eliminar usuario: Un administrador puede eliminar cualquier usuario registrado en la plataforma.
## Diagrama de casos de uso para la versión 1.0

![alt text](image.png)

# Casos de uso específicos y diagramas de flujo.

En el primer apartado 'Requisitos y diagrama de casos de uso' para esta versión 1.0, hemos definido de manera general los **casos de uso** que se contemplan para cada actor y los hemos reflejado en un **diagrama de casos de uso**.

Es el momento de ser más concretos y detenernos a reflexionar en cada uno de los procesos que se realizarán para cada tarea, incluyendo los posibles errores cometidos por el usuario o el propio sistema.

## Casos de uso específicos
## 1. Registrar usuario


**Actores**: Usuario no registrado.

**Precondiciones**: El usuario no ha iniciado sesión.

**Flujo básico**:

1.El usuario navega a la página de registro.
2.El usuario introduce su nombre, apellidos, email y contraseña.
3.El sistema valida que los campos estén completos y que el email no esté registrado previamente.
4.El sistema crea un nuevo usuario con los datos proporcionados.
5.El sistema muestra un mensaje de confirmación y redirige al usuario a la página de inicio.

**Flujos alternativos**:

3a. El sistema detecta que el email ya está registrado: muestra un mensaje de error y no crea la cuenta.

## 2.Recuperar contraseña

**Actores**: Usuario registrado.

**Precondiciones**: El usuario no ha iniciado sesión.

**Flujo básico**:

1.El usuario navega a la página de registro.
2.El usuario selecciona la opción 'Recuperar contraseña'
3.El sistema valida que el campo 'email' esté completo y que el email esté registrado previamente.
4.El sistema muestra un mensaje de confirmación de envio del mail para la recuperación de contraseña y redirige al usuario a la página de inicio.
**Flujos alternativos**:

3a. El sistema detecta que el email no está registrado: muestra un mensaje de error y no envia el mail.

## 3. Iniciar sesión

**Actores**: Usuario registrado.

**Precondiciones**: El usuario no ha iniciado sesión.

**Flujo básico**:

1.El usuario navega a la página de inicio de sesión.
2.El usuario introduce su email y contraseña.
3.El sistema valida las credenciales y crea una sesión para el usuario.
4.El sistema redirige al usuario a la página principal de la aplicación.

**Flujos alternativos**:

3a. Las credenciales son incorrectas: el sistema muestra un mensaje de error y no crea la sesión.

## 4.Cerrar sesión

**Actores**: Usuario registrado.

**Precondiciones**: El usuario ha iniciado sesión.

**Flujo básico**:

1.El usuario hace clic en el botón de "cerrar sesión".
2.El sistema cierra la sesión del usuario.
3.El sistema redirige al usuario a la página de inicio.

## 4.Ver/Editar perfil

**Actores**: Usuario registrado.

**Precondiciones**: El usuario ha iniciado sesión.

**Flujo básico**:

1.El usuario navega a la página de edición de perfil.
2.El usuario edita su nombre, apellidos y contraseña.
3.El sistema valida los campos y actualiza el perfil del usuario.
4.El sistema muestra un mensaje de confirmación.

**Flujos alternativos**:

3a. El usuario intenta cambiar su email: el sistema valida que el email no esté registrado previamente.

## 5. Ver proyectos

**Actores**: Usuario registrado.

**Precondiciones**: El usuario ha iniciado sesión.

**Flujo básico**:

1.El usuario navega a la página de proyectos.
2.El sistema muestra una lista de proyectos publicados por desarrolladores.
3.El usuario puede hacer clic en un proyecto para ver más detalles.
4.El usuario puede mostrar/filtrar los proyectos a partir de un buscador

## 6. Publicar proyecto

**Actores**: Usuario registrado con perfil de desarrollador.

**Precondiciones**: El usuario ha iniciado sesión y su perfil es de desarrollador.

**Flujo básico**:

1.El usuario navega a la página de publicación de proyecto.
2.El usuario introduce el nombre, descripción, imagen representativa, enlaces de servidor y repositorio, estado y otra información relevante del proyecto.
3.El sistema valida los campos y crea un nuevo proyecto.
4.El sistema muestra un mensaje de confirmación y redirige al usuario a la página de proyectos.

**Flujos alternativos**:

-2a. El desarrollador decide no publicar el proyecto y selecciona la opción de cancelar.
-El sistema descarta la información ingresada en el formulario.
-El sistema muestra un mensaje de confirmación al desarrollador.

## 7. Editar proyecto:

**Actor principal**: Desarrollador

**Objetivo**: Editar la información de un proyecto previamente creado.

**Precondiciones**: El usuario debe haber iniciado sesión como desarrollador y tener al menos un proyecto previamente creado.

**Flujo principal**:

1.El usuario selecciona la opción de "Editar proyecto".
2.El sistema muestra la lista de proyectos previamente creados por el usuario.
3.El usuario selecciona el proyecto que desea editar.
4.El sistema muestra el formulario de edición del proyecto con la información actual del mismo.
5.El usuario realiza los cambios necesarios en la información del proyecto y guarda los cambios.
6.El sistema valida la información ingresada por el usuario y actualiza la información del proyecto en la base de datos.
7.El sistema muestra una confirmación de que la información del proyecto ha sido actualizada correctamente.

## 8. Eliminar proyecto:

**Actor principal**: Desarrollador

**Objetivo**: Eliminar un proyecto previamente creado.

**Precondiciones**: El usuario debe haber iniciado sesión como desarrollador y tener al menos un proyecto previamente creado.

**Flujo principal**:

1.El usuario selecciona la opción de "Eliminar proyecto" del proyecto que desea eliminar.
2.El sistema muestra una confirmación de que el usuario está seguro de eliminar el proyecto seleccionado.
3.El usuario confirma que desea eliminar el proyecto.
4.El sistema elimina el proyecto de la base de datos y muestra una confirmación de que el proyecto ha sido eliminado correctamente.
5.El sistema actualiza la información de proyectos.

## 9. Ver/Editar usuario:

**Actor principal**: Usuario administrador

**Objetivo**: Editar la información de los usuarios registrados.

**Precondiciones**: El usuario debe haber iniciado sesión en la aplicación y tener rol administrador.

**Flujo principal**:

1.El usuario selecciona la opción de "Ver usuarios".
2.El sistema muestra una tabla con 'inputs' con los datos de los usuarios.
3.El administrador realiza los cambios necesarios en la información de los usuarios (incluido el rol y el estado) y guarda los cambios.
4.El sistema valida la información ingresada por el usuario y actualiza la información del usuario en la base de datos.
5.El sistema muestra una confirmación de que la información del perfil ha sido actualizada correctamente.

## 9. Eliminar usuario: 

**Actor principal**: Usuario administrador

**Objetivo**: Eliminar usuario del sistema.

**Precondiciones**: El usuario debe haber iniciado sesión en la aplicación y debe tener rol administrador.

**Flujo principal**:

1.El usuario selecciona la opción de "Ver usuarios".
2.El sistema muestra una tabla con 'inputs' con los datos de los usuarios.
3.El administrador hace clic sobre el icono de eliminar usuario de la fila correspondiente.
4.El sistema informa de que se eliminarán todos sus registros.
5.El sistema muestra una confirmación de que la información de que el usuario ha sido borrado correctamente.

## Errores

Vamos a repasar los diferentes casos de uso analizando el flujo principal y añadiendo los flujos alternativos para contemplar los posibles errores del sistema. Puedes considerar los siguientes mensajes:

-**Error de conexión**: El servidor no puede establecer una conexión con la base de datos, lo que impide que se puedan realizar operaciones en la plataforma. **El sistema debería mostrar un mensaje de error indicando que no se pudo conectar con la base de datos** y ofrecer la posibilidad de volver a intentarlo o contactar con el soporte técnico.

-**Error de validación**: Cuando el sistema recibe información del usuario, debe validarla para asegurarse de que cumple con los requisitos de formato y contenido necesarios. Si la información no es válida, **el sistema debería mostrar un mensaje de error indicando el problema específico**, como "El campo de correo electrónico debe ser una dirección de correo válida".

-**Error de autenticación**: Si un usuario intenta acceder a una página o realizar una acción que requiere autenticación, pero no ha iniciado sesión o sus credenciales son incorrectas, **el sistema debería mostrar un mensaje de error indicando que la acción no está autorizada** y ofrecer la posibilidad de iniciar sesión o recuperar la contraseña.

-**Error de autorización**: Si un usuario intenta realizar una acción que no está autorizada para realizar debido a su rol, **el sistema debería mostrar un mensaje de error indicando que la acción no está autorizada** y ofrecer la posibilidad de volver a la página anterior.

-**Error de servidor**: En caso de que se produzca un error interno en el servidor, como una excepción no controlada, **el sistema debería mostrar un mensaje de error genérico indicando que se produjo un error** y ofrecer la posibilidad de volver a intentarlo o contactar con el soporte técnico.
