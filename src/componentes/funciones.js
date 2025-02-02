export const ls = {
    getUsuario: () => {
        

        //definimos usuario anonimo por si no hay datos en LocalStorage

        let usuario = {
            email: 'anomino',
            rol: 'no logueado',
            avatar: ''
        }

        const usuarioJSON = localStorage.getItem('usuarioVanilla')
        //si hay un usuario logueado actualizamos usuario, sino devolvemos usuario anonimo
        if(usuarioJSON){
            // parseamos datos de localstorage
            usuario = JSON.parse(usuarioJSON)
        }
         
        

        return usuario
        },
    
    setUsuario: (usuario) => {
        //convertimos el objeto a una cadena JSON
        const usuarioJSON = JSON.stringify(usuario)
        // Guardar en LocalStorage
        localStorage.setItem('usuarioVanilla', usuarioJSON)
    }

}