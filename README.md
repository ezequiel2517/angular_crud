# Proyecto
El proyecto es un front que consulta una API CRUD de productos bancarios.

## Running front
Ejecutar `npm install` y `ng serve`.

## Running unit tests
Por cuestión de tiempo, solo agregué test unitarios sobre las validaciones del formulario. Se pueden ejecutar con `ng test --include=**/formulario.component.spec.ts`.

## Consideraciones importantes
- Se agrega un timeout al cargar los productos para simular espera de la API y mostrar un modal de carga.
- Se tiene en cuenta un diseño responsive del front, las media queries se encuentran en los *.scss del componente que corresponda.  
- Se manejan variables globales para los colores, revisar `styles/colors.scss`
- Se agregó un menú por fuera de lo requerido, para simplicidad en la navegación.
