# Esquema de Base de Datos (PocketBase) - Taller "El Pistón"

Este documento contiene las colecciones y relaciones a configurar en el panel de administración de PocketBase (`http://127.0.0.1:8090/_/`).

## Colecciones

### 1. `clientes`
- `nombre` (text, requerido)
- `telefono` (text)
- `direccion` (text)

### 2. `vehiculos`
- `matricula` (text, requerido, único)
- `marca` (text)
- `modelo` (text)
- `anio` (number)
- `kilometraje` (number)
- `cliente_id` (relation -> `clientes`)

### 3. `mecanicos`
- `nombre` (text, requerido)
- `especialidad` (text)
- `telefono` (text)

### 4. `repuestos`
- `nombre` (text, requerido)
- `codigo` (text, único)
- `precio_venta` (number)
- `existencias` (number)

### 5. `ordenes`
- `vehiculo_id` (relation -> `vehiculos`)
- `mecanico_id` (relation -> `mecanicos`)
- `fecha_entrada` (date)
- `problema` (text)
- `estado` (select: `recibida`, `en_diagnostico`, `en_reparacion`, `lista`, `entregada`, `cancelada`)
- `total_pagado` (number)
- `saldo_pendiente` (number)

### 6. `trabajos_orden`
- `orden_id` (relation -> `ordenes`)
- `descripcion` (text)
- `precio_mano_obra` (number)

### 7. `repuestos_orden`
- `orden_id` (relation -> `ordenes`)
- `repuesto_id` (relation -> `repuestos`)
- `cantidad` (number)
