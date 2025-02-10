import { supabase } from './supabase.js';

export class Proyecto {

    constructor({
        id = null, // ID único del proyecto
        created_at = null, // Fecha de creación del proyecto
        user_id = null, // ID del usuario propietario del proyecto
        nombre = null, // Nombre del proyecto
        descripcion = null, // Descripción del proyecto
        imagen = null, // URL de la imagen del proyecto
        enlace = null, // URL del enlace del proyecto
        repositorio = null, // URL del repositorio del proyecto
        autor = null, // Nombre del autor del proyecto
        estado = "activo", // Estado del proyecto (activo/inactivo)
      }) {
        // Asignación de valores a las propiedades del proyecto
        this.id = id;
        this.created_at = created_at;
        this.user_id = user_id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.enlace = enlace;
        this.repositorio = repositorio;
        this.autor = autor;
        this.estado = estado;
      }
      static async getAll() {
        const { data: proyectos, error } = await supabase
          .from('proyectos')
          .select('*')
          .order('created_at', { ascending: false })
    
        if (error) {
          throw new Error(error.message)
        }
    
        return proyectos.map((proyecto) => new Proyecto(proyecto))
      }
    
      static async getById(id) {
        const { data: proyecto, error } = await supabase
          .from('proyectos')
          .select('*')
          .eq('id', id)
    
        if (error) {
          throw new Error(error.message)
        }
    
        return new Proyecto(proyecto[0])
      }
    
      static async getByUserId(userId) {
        const { data: proyectos, error } = await supabase
          .from('proyectos')
          .select('*')
          .eq('user_id', userId)
    
        if (error) {
          throw new Error(error.message) 
        }
    
        return new Proyecto(proyectos[0])
      }
    
      static async create(proyectoData) {
        const { data, error } = await supabase
          .from('proyectos')
          .insert(proyectoData)
          .select()
    
        if (error) {
          throw new Error(`Error creando proyecto: ${error.message}`)
        }
    
        return data ? new Proyecto(data[0]) : null
      }
    
      static async update(id, newData) {
        const { error } = await supabase
          .from('proyectos')
          .update(newData)
          .eq('id', id)
    
        if (error) {
          throw new Error(`Error actualizando proyecto: ${error.message}`)
        }
    
        return true
      }
    
      static async delete(id) {
        const { error } = await supabase
          .from('proyectos')
          .delete()
          .eq('id', id)
    
        if (error) {
          throw new Error(`Error eliminando proyecto: ${error.message}`)
        }
    
        return true
      }
      
}