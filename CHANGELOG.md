# Changelog

Listado de cambios realizados a Bizkaibus Service

## [0.0.5] - 2019-06-23

### Added

- Añadidos nuevos tests y actualizados algunos viejos

### Changed

- Cambiada librería de parseo de ficheros XML, de _xml2js_ a _fast-xml-parser_
- Reestructurados servicios para que funcionen con la nueva librería (podría quedar algún error por ahí suelto 😞 ))
- Modificados Tests con _await_ para que no sean un lío loco

### Fixed

- Solucionados errores __(esta vez si)__ que ocurrían al recibir un XML vacío

## [0.0.4] - 2019-06-22

### Fixed

- Solucionado error en _getFromTo_ que hacía que, en los casos en los que no hubiera paradas, la promesa devolviera un error en vez de un array vacío
- Cambiada estructura de _getFromTo_ para adaptarse a los cambios realizados por Bizkaibus
- Actualizadas librerías de __npm__ para corregir vulnerabilidades detectadas en dos librerías: _axios_, _js-yaml_
- Añadido este Changelog xD
