import { expect } from 'chai';
import { Proyecto } from '../src/bd/proyecto.js';
import { supabase } from '../src/bd/supabase.js';

describe('Proyecto Model', () => {
  const mockProyecto = {
    id: 1,
    created_at: '2025-02-10T12:00:00Z',
    user_id: 'user123',
    nombre: 'Proyecto Test',
    descripcion: 'Descripción de prueba',
    imagen: 'https://via.placeholder.com/150',
    enlace: 'https://ejemplo.com',
    repositorio: 'https://github.com/test',
    autor: 'Autor Test',
    estado: 'activo',
  };

  beforeEach(() => {
    supabase.from = () => ({
      select: () => ({
        order: async () => ({ data: [mockProyecto], error: null }),
        eq: async () => ({ data: [mockProyecto], error: null }),
      }),
      insert: async () => ({ data: [mockProyecto], error: null }),
      update: async () => ({ error: null }),
      delete: async () => ({ error: null }),
    });
  });

  it('getAll() debe retornar una lista de proyectos', async () => {
    const proyectos = await Proyecto.getAll();
    expect(proyectos).to.be.an('array').with.lengthOf(1);
    expect(proyectos[0]).to.be.an.instanceOf(Proyecto);
    expect(proyectos[0].nombre).to.equal('Proyecto Test');
  });

  it('getById() debe retornar un proyecto específico', async () => {
    const proyecto = await Proyecto.getById(1);
    expect(proyecto).to.be.an.instanceOf(Proyecto);
    expect(proyecto.id).to.equal(1);
  });

  it('getByUserId() debe retornar los proyectos de un usuario', async () => {
    const proyectos = await Proyecto.getByUserId('user123');
    expect(proyectos).to.be.an.instanceOf(Proyecto);
    expect(proyectos.user_id).to.equal('user123');
  });

  it('create() debe insertar un nuevo proyecto', async () => {
    const nuevoProyecto = await Proyecto.create(mockProyecto);
    expect(nuevoProyecto).to.be.an.instanceOf(Proyecto);
    expect(nuevoProyecto.id).to.equal(1);
  });

  it('update() debe modificar un proyecto existente', async () => {
    const actualizado = await Proyecto.update(1, { nombre: 'Nuevo Nombre' });
    expect(actualizado).to.be.true;
  });

  it('delete() debe eliminar un proyecto', async () => {
    const eliminado = await Proyecto.delete(1);
    expect(eliminado).to.be.true;
  });
});
