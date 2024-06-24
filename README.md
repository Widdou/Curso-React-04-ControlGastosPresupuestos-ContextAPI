# Context API

Pemirte tener un Estado Global dentro de la App. `useContext`

Un Context envuelve la aplicación y todos los nodos hijos tienen acceso al contexto.
Removiendo la necesidad de PropDrilling para comunicar la app con varios estados.

Su ventaja es que es una solucion nativa a React, sin dependencias externas.
Puede tener algo de boilerplate, comparado con otras librerias como Zustand ó Redux Toolkit.


Context & Provider & Consumer

`createContext()`

## Conectar el Contexto a la Aplicación
Para que la aplicación tenga acceso a nuestro contexto, es necesario que el contexto envuelva a la aplicacion, para ello. Literalmente, dentro de la definición root hacemos que la App sea hija de un componente 'Provider' del contexto

```root.tsx
  <ContextProvider>
    <App/>
  </ContextProvider>
```

## Acceder al contenido del Contexto

`useContext()`

Se recomienda utilizar un `customHook` para el contexto

---

1. Definir un Context
2. Definir un ContextProvider
3. Conectar un Context con su respectivo Provider
4. Envolver la aplicación con el Provider
5. Construir un CustomHook que maneje la llamada al contexto para simplicar su consumo

# Librerias: Headless UI & HeroIcons + React-Date-Picker

Para los modales de `ExpenseModal`
`npm i @headlessui/react`
`npm i @heroicons/react`

- React Date Picker
- UUID V4
- react-swipeable-list  =>  Deslizar cartas en una lista
- react-circular-progressbar#   C u r s o - R e a c t - 0 4 - C o n t r o l G a s t o s P r e s u p u e s t o s - C o n t e x t A P I  
 