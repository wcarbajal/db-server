class Proceso {
  constructor({ id, nombre, descripcion = '', parentId = null }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.parentId = parentId;
    this.hijos = [];
  }

  // Agrega un hijo a este proceso
  agregarHijo(procesoHijo) {
    procesoHijo.parentId = this.id;
    this.hijos.push(procesoHijo);
  }

  // Devuelve los hijos de este proceso
  obtenerHijos() {
    return this.hijos;
  }

  // Devuelve el padre (requiere lista de procesos)
  obtenerPadre(listaProcesos) {
    return listaProcesos.find(proc => proc.id === this.parentId) || null;
  }

  // Devuelve los hermanos (requiere lista de procesos)
  obtenerHermanos(listaProcesos) {
    if (this.parentId === null) return [];
    return listaProcesos.filter(
      proc => proc.parentId === this.parentId && proc.id !== this.id
    );
  }
  // Devuelve el camino desde la raíz hasta este proceso (requiere lista de procesos)
  obtenerCamino(listaProcesos) {
    const camino = [];
    let procesoActual = this;

    while (procesoActual) {
      camino.unshift(procesoActual);
      procesoActual = procesoActual.obtenerPadre(listaProcesos);
    }

    return camino;
  }
}

module.exports = Proceso;