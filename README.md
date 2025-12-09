# reto-front-vanilla-react

Repositorio con las dos soluciones de la prueba. Una version con Javascript vanilla y otra en React. Cada carpeta contiene su propio codigo.

## Scripts

### React
1. `cd reto-front-react`
2. `npm install`
3. `npm run dev` para lanzar la aplicación con Vite en `http://localhost:5173`.

### Vanilla
1. Abre index.html con el navegador. También se puede servir con Live Server o algo similar.

## Aclaraciones

He añadido los requisitos opcionales de la prueba y un botón de Rehacer además del de Deshacer que se pedía.

Para los movimientos en el historico de la lista de strings me inspiré en Git: hay un puntero head que marca el estado actual de la lista de strings y con los botones de Undo y Redo se navga por esa lista de cambios. También se hace una poda con los cambios "futuros" si se edita la lista desde un punto anterior del histórico.

He guardado copias completas de cada punto del histórico de la lista porque me parecía una opción más sólida a costa de memoria. En caso de que estuviera pensado para listas de muchos elementos o con un histórico muy largo, habría que cambiarlo a un sistema de cambios incrementales con la acción realizada en cada paso y el string afectado (aunque también haría que cada punto del histórico sería dependiente del anterior, sería cuestión de analizar el contexto real).

Aunque la prueba no lo pedía, he añadido un archivo de tests para el componente StringList, para que hubiera un ejemplo. He usado Jest con Babel para el jsx.
