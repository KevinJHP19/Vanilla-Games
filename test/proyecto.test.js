import { expect } from 'chai'
import { supabase } from '../src/bd/supabase.js'
import { Proyecto } from '../src/bd/proyecto.js'

describe('Proyecto', () => {
  describe('getById()', () => {
    it('debería devolver el proyecto con el ID especificado', async () => {
      const proyecto = await Proyecto.getById(1)
      expect(proyecto).to.have.property('nombre')
    })
  })
})