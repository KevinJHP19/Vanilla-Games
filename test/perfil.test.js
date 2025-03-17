import { expect } from "chai";
import { supabase } from "../src/bd/supabase.js";
import { Perfil } from "../src/bd/perfil.js";

const ArrayPerfiles = [
  { nombre: "Iban", apellidos: "A borrarme", rol: "alumno", estado: "pendiente", avatar: null },
  { nombre: "carrebola", apellidos: "Yo mismo", rol: "admin", estado: "pendiente", avatar: null },
  { nombre: "Pepe", apellidos: "Gotera", rol: "registrado", estado: "pendiente", avatar: null },
  { nombre: "Juan", apellidos: "Eustaquio", rol: "alumno", estado: "pendiente", avatar: null },
];

before(async function () {
  try {
    await supabase.from("perfiles").delete().is("user_id", null);
  } catch (error) {
    console.error("Error limpiando la tabla antes de las pruebas:", error.message);
  }
});

describe("************** Perfil: CRUD Testing", function () {
  describe("getAll()", function () {
    it("debería devolver un array vacío inicialmente", async function () {
      const perfiles = await Perfil.getAll();
      expect(perfiles).to.be.an("array").that.is.empty;
    });
  });

  describe("create()", function () {
    it("debería crear 4 perfiles correctamente", async function () {
      await Promise.all(ArrayPerfiles.map((perfil) => Perfil.create(perfil)));
      const perfiles = await Perfil.getAll();
      expect(perfiles).to.be.an("array").that.has.lengthOf(4);
      expect(perfiles[3].nombre).to.equal(ArrayPerfiles[3].nombre);
    });
  });

  describe("getById()", function () {
    it("debería devolver el perfil correcto por ID", async function () {
      const perfiles = await Perfil.getAll();
      const ultimoPerfil = perfiles[perfiles.length - 1];
      const perfil = await Perfil.getById(ultimoPerfil.id);

      expect(perfil).to.be.an.instanceof(Perfil);
      expect(perfil.nombre).to.equal(ultimoPerfil.nombre);
    });
  });

  describe("actualizarPerfil", function () {
    it("debería actualizar el nombre y apellidos", async function () {
      const perfiles = await Perfil.getAll();
      const perfilId = perfiles[perfiles.length - 1].id;

      await Perfil.update(perfilId, { nombre: "Jose", apellidos: "GoteraNueva" });
      const perfilActualizado = await Perfil.getById(perfilId);

      expect(perfilActualizado.nombre).to.equal("Jose");
      expect(perfilActualizado.apellidos).to.equal("GoteraNueva");
    });
  });

  describe("borraPerfil", function () {
    it("debería eliminar el último perfil correctamente", async function () {
      let perfiles = await Perfil.getAll();
      const perfilId = perfiles[perfiles.length - 1].id;

      const borrado = await Perfil.delete(perfilId);
      expect(borrado).to.be.true;

      perfiles = await Perfil.getAll();
      expect(perfiles.length).to.equal(3);
    });
  });
});





