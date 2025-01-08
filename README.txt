Para este trabajo, hemos desarrollado una aplicación web completamente funcional que permite consultar 
todos los premios Nobel otorgados a lo largo de la historia. A través de esta aplicación, los usuarios 
pueden obtener información detallada sobre los premios Nobel, y adicionalmente, acceder a artículos científicos 
relacionados con cada premio, los cuales son proporcionados por una segunda API.

La primera API es de acceso libre, mientras que la segunda requiere una clave de API (API key) para su utilización.

A continuación se proporcionan los enlaces a la documentación de ambas APIs:

- https://www.nobelprize.org/organization/developer-zone-2/
- https://api.core.ac.uk/docs/v3

La interfaz de la página es simple y fácil de usar, pero cuenta con un funcionamiento completamente operativo. 
Las APIs están interconectadas de tal forma que, mediante el parámetro 'q' en la URL de la segunda API, se pasa 
información obtenida de la primera API, como el año del premio Nobel que se está consultando, la categoría del 
premio y los nombres de los galardonados.

Es importante tener en cuenta lo siguiente:

- En ciertos años no se otorgaron premios Nobel, principalmente durante la Segunda Guerra Mundial, lo que puede 
resultar en la ausencia de premiados en esos años.
- El Premio Nobel de Economía comenzó a otorgarse en 1969.
- La segunda API tiene un límite de consultas, permitiendo un máximo de cuatro consultas por minuto. Cuando se 
alcanza este límite, la aplicación mostrará un mensaje informando al usuario. Tras un breve período de espera y 
al refrescar la página, deberían aparecer nuevamente los artículos disponibles. Este diseño asegura un acceso 
eficiente y fluido a la información, a pesar de las restricciones impuestas por la segunda API.