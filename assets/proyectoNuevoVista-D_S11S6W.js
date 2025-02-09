const proyectoNuevoVista = {
  template: `<main>
            <div class="container">
                <h1 class="mt-5">Nuevo proyecto</h1>
                <div class="d-flex justify-content-end">
                    <bottom class="btn btn-outline-secondary mt-5">
                        <i class="bi bi-arrow-bar-left" style="font-size: 1em"></i>
                        Volver</bottom
                    >
                </div>

                <div class="row mt-2">
                    <div class="col-12 col-md-4 pt-2 mb-3">
                        <img src=".images/juego.jpg" alt="" class="img-fluid" />
                    </div>
                    <div class="col-12 col-md-8">
                        <!-- Formulario nuevo proyecto -->
                        <form action="" class="form">
                                          
                            <label class="form-label" for="nombre"><strong>Nombre: </strong></label>
                            <input required id="nombre" type="text" value="Nombre Autor" class="form-control" />
                            
                            <label class="form-label mt-2" for="descripcion"
                            ><strong>Descripción: </strong></label
                            >
                            <textarea id="descripcion" class="form-control" rows="4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, sunt? Recusandae labore at voluptatem tempore incidunt distinctio eaque? Est aspernatur laudantium itaque ullam numquam autem dolor quia amet eum consectetur.</textarea>
                            
                            <label class="form-label mt-2" for="estado"><strong>Estado: </strong></label>
                            <select required id="estado" class="form-control">
                            <option value="estado">estado</option>
                            <option value="otro estado">otro estado</option>
                            </select>

                            <label class="form-label mt-2" for="fecha"><strong>Fecha: </strong></label>
                            <input id="fecha" type="date" class="form-control" value="12/12/2023"/>

                            <label class="form-label mt-2" for="enlace"><strong>Enlace: </strong></label>
                            <input id="enlace" type="url" class="form-control" value="http://enlace.com" />


                            <label class="form-label mt-2" for="repositorio"
                            ><strong>Repositorio: </strong></label
                            >
                            <input id="repositorio" type="text" class="form-control" value="user.github.com/123456" />

                            <input type="submit" class="btn btn-success mt-3" value="Subir proyecto">
                        </form>
                    </div>
                </div>
                
            </div>
    `
};
export {
  proyectoNuevoVista as default
};
