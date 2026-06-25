window.BANCO = (window.BANCO || []).concat([
  {
    id: "saa-521",
    dominio: 3,
    tema: "CloudFront",
    tipo: "single",
    enunciado: "Una aplicación de noticias entrega imágenes y artículos estáticos desde un bucket S3 a usuarios de todo el mundo. El equipo observa que las solicitudes que no aciertan en la caché de los edge locations generan demasiada carga sobre el origen S3, especialmente para contenido poco popular pero solicitado desde muchas regiones distintas. ¿Qué configuración de CloudFront reduce MÁS la carga sobre el origen y mejora el ratio de aciertos de caché?",
    opciones: [
      "Activar Origin Shield en la región más cercana al bucket S3 para consolidar las solicitudes de los edge locations antes de llegar al origen",
      "Reducir el TTL mínimo de la caché a cero para que CloudFront siempre revalide contra el origen",
      "Asociar una función Lambda@Edge en el evento viewer-request para reescribir cada solicitud",
      "Desactivar la compresión automática para evitar transformaciones en el edge"
    ],
    correctas: [0],
    explicacion: "Origin Shield añade una capa de caché centralizada que agrega las solicitudes de todos los edge locations y reduce drásticamente los accesos al origen, mejorando el cache hit ratio. Reducir el TTL a cero aumenta los accesos al origen. Lambda@Edge no mejora el caching. Desactivar compresión no reduce la carga del origen."
  },
  {
    id: "saa-522",
    dominio: 3,
    tema: "CloudFront",
    tipo: "single",
    enunciado: "Un sitio de comercio electrónico necesita ejecutar lógica ligera de manipulación de cabeceras HTTP y reescritura de URLs en CADA solicitud de los usuarios, con la MENOR latencia posible y al menor costo, sin necesidad de acceso a la red ni a librerías externas. ¿Qué opción cumple mejor estos requisitos?",
    opciones: [
      "CloudFront Functions ejecutadas en el evento viewer-request",
      "Lambda@Edge ejecutada en el evento origin-request",
      "Una función Lambda regional invocada por API Gateway",
      "Un contenedor Fargate detrás de un Application Load Balancer"
    ],
    correctas: [0],
    explicacion: "CloudFront Functions se ejecutan en los edge locations con latencia submilisegundo y costo muy bajo, ideales para manipulación de cabeceras y reescritura de URLs. Lambda@Edge tiene mayor latencia y costo y se usa para lógica más pesada. Lambda regional y Fargate no se ejecutan en el edge y añaden latencia."
  },
  {
    id: "saa-523",
    dominio: 3,
    tema: "CloudFront",
    tipo: "single",
    enunciado: "Una aplicación recibe formularios con números de tarjeta de crédito que deben permanecer cifrados desde el edge hasta una aplicación de backend específica, de modo que sistemas intermedios y logs no puedan ver el dato sensible en claro. ¿Qué característica de CloudFront cumple este requisito?",
    opciones: [
      "Field-level encryption con un par de claves pública/privada asignado a campos específicos",
      "Cifrado SSL/TLS estándar entre el viewer y CloudFront",
      "Signed URLs con políticas personalizadas",
      "Geo-restriction basada en países"
    ],
    correctas: [0],
    explicacion: "El field-level encryption cifra campos específicos con una clave pública en el edge, y solo la aplicación con la clave privada puede descifrarlos, manteniendo el dato protegido a través de toda la cadena. TLS solo protege el transporte. Signed URLs controlan acceso, no cifran campos. Geo-restriction restringe por país."
  },
  {
    id: "saa-524",
    dominio: 3,
    tema: "CloudFront",
    tipo: "multiple",
    enunciado: "Un equipo quiere optimizar el comportamiento de caché de CloudFront para una API dinámica. Necesitan controlar de forma independiente qué se incluye en la clave de caché y qué se reenvía al origen para personalización. ¿Qué DOS afirmaciones sobre las políticas de CloudFront son correctas? (Elegí 2)",
    opciones: [
      "La cache policy define qué cabeceras, cookies y query strings forman parte de la clave de caché",
      "La origin request policy permite reenviar valores al origen sin que formen parte de la clave de caché",
      "La cache policy y la origin request policy son siempre el mismo objeto y no pueden separarse",
      "La origin request policy aumenta automáticamente el TTL de los objetos en caché",
      "Las query strings nunca pueden incluirse en la clave de caché"
    ],
    correctas: [0, 1],
    explicacion: "La cache policy controla la clave de caché (cabeceras, cookies, query strings y TTLs), mientras que la origin request policy controla qué se reenvía al origen sin afectar la clave de caché, lo que permite personalización sin fragmentar la caché. Son objetos separados, la origin request policy no toca el TTL y las query strings sí pueden formar parte de la clave."
  },
  {
    id: "saa-525",
    dominio: 3,
    tema: "Global Accelerator",
    tipo: "single",
    enunciado: "Una plataforma de juegos online TCP/UDP necesita reducir la latencia y el jitter para jugadores globales que se conectan a endpoints en varias regiones de AWS, con conmutación por error rápida y direcciones IP estáticas anycast. El contenido no es cacheable. ¿Qué servicio ofrece el MEJOR rendimiento de red?",
    opciones: [
      "AWS Global Accelerator con grupos de endpoints en múltiples regiones",
      "Amazon CloudFront con varios orígenes regionales",
      "Route 53 con política de enrutamiento por latencia",
      "Un Network Load Balancer único en la región principal"
    ],
    correctas: [0],
    explicacion: "Global Accelerator usa la red troncal de AWS y direcciones IP anycast estáticas para enrutar tráfico TCP/UDP al endpoint óptimo con baja latencia y failover rápido, ideal para tráfico no cacheable. CloudFront está orientado a contenido cacheable HTTP. Route 53 solo resuelve DNS y no acelera el transporte. Un único NLB no es global."
  },
  {
    id: "saa-526",
    dominio: 3,
    tema: "Global Accelerator",
    tipo: "single",
    enunciado: "Un arquitecto compara opciones para distribuir tráfico HTTP cacheable de un sitio web estático a una audiencia global, buscando MÁXIMO rendimiento de entrega y caché en el edge. ¿Cuál es la opción más adecuada?",
    opciones: [
      "Amazon CloudFront con un Origin Access Control hacia el bucket S3",
      "AWS Global Accelerator apuntando a un Application Load Balancer",
      "Route 53 con registros de failover hacia varios buckets",
      "Un proxy inverso EC2 con Nginx en cada región"
    ],
    correctas: [0],
    explicacion: "Para contenido HTTP estático y cacheable, CloudFront es la mejor opción porque cachea en los edge locations y reduce latencia y carga de origen. Global Accelerator no cachea y se orienta a tráfico no cacheable. Route 53 solo hace DNS. Un proxy EC2 por región es operativamente costoso y menos eficiente que el CDN gestionado."
  },
  {
    id: "saa-527",
    dominio: 3,
    tema: "ElastiCache",
    tipo: "single",
    enunciado: "Una aplicación lee con muy alta frecuencia los mismos perfiles de usuario desde una base de datos relacional. Se quiere añadir una caché en memoria con la estrategia que SOLO carga datos en la caché cuando se solicitan y no han sido encontrados, minimizando el uso de memoria para datos poco accedidos. ¿Qué estrategia describe esto?",
    opciones: [
      "Lazy loading (cache-aside): la aplicación consulta la caché y, ante un miss, lee de la base de datos y escribe el resultado en la caché",
      "Write-through: cada escritura en la base de datos actualiza simultáneamente la caché",
      "Read replica promotion para servir lecturas",
      "TTL negativo para invalidar todos los registros"
    ],
    correctas: [0],
    explicacion: "Lazy loading o cache-aside solo carga datos en la caché tras un miss, por lo que únicamente se almacena lo que realmente se solicita, ahorrando memoria. Write-through escribe siempre, llenando la caché con datos que podrían no leerse. Las read replicas no son una caché en memoria y un TTL negativo no es una estrategia válida."
  },
  {
    id: "saa-528",
    dominio: 3,
    tema: "ElastiCache",
    tipo: "single",
    enunciado: "Un dataset que debe almacenarse en ElastiCache for Redis supera con creces la memoria de un solo nodo y requiere distribución horizontal de los datos manteniendo alta disponibilidad. ¿Qué configuración ofrece el MEJOR escalado en memoria?",
    opciones: [
      "Redis en modo cluster (cluster mode enabled) con múltiples shards y réplicas por shard",
      "Un único nodo Redis grande con cluster mode disabled",
      "Memcached con un solo nodo vertical de gran tamaño",
      "Redis con cluster mode disabled y varias réplicas de lectura"
    ],
    correctas: [0],
    explicacion: "El modo cluster de Redis particiona (sharding) los datos en múltiples shards, permitiendo superar la memoria de un nodo, y cada shard puede tener réplicas para alta disponibilidad. Un único nodo o cluster mode disabled no escala más allá de un nodo en escritura/almacenamiento. Memcached no ofrece la misma persistencia/replicación gestionada por shard."
  },
  {
    id: "saa-529",
    dominio: 3,
    tema: "ElastiCache",
    tipo: "single",
    enunciado: "Una aplicación financiera no puede tolerar lecturas de datos obsoletos desde la caché y necesita que la caché esté siempre consistente con la base de datos tras cada escritura, asumiendo mayor latencia de escritura. ¿Qué estrategia es la más adecuada?",
    opciones: [
      "Write-through, escribiendo en la base de datos y en la caché en la misma operación",
      "Lazy loading sin TTL",
      "Sólo lazy loading con TTL muy largo",
      "Deshabilitar la caché por completo"
    ],
    correctas: [0],
    explicacion: "Write-through mantiene la caché actualizada en cada escritura, evitando datos obsoletos a costa de mayor latencia de escritura. El lazy loading puede servir datos antiguos hasta el siguiente miss o expiración del TTL. Deshabilitar la caché no aporta rendimiento. Un TTL largo agrava la obsolescencia."
  },
  {
    id: "saa-530",
    dominio: 3,
    tema: "DynamoDB",
    tipo: "single",
    enunciado: "Una tabla DynamoDB que respalda una aplicación de microsegundos de latencia experimenta lecturas repetidas muy intensas de los mismos ítems. Se requiere reducir la latencia de lectura por debajo del milisegundo sin cambiar el modelo de datos. ¿Qué solución ofrece el MEJOR rendimiento de lectura?",
    opciones: [
      "Amazon DynamoDB Accelerator (DAX) como caché en memoria delante de la tabla",
      "Aumentar las RCU aprovisionadas de la tabla",
      "Crear un índice secundario global adicional",
      "Habilitar DynamoDB Streams hacia Lambda"
    ],
    correctas: [0],
    explicacion: "DAX es una caché en memoria totalmente gestionada para DynamoDB que entrega lecturas en microsegundos para cargas de lectura intensiva con ítems repetidos. Aumentar RCU mejora throughput pero no baja la latencia a microsegundos. Un GSI sirve patrones de consulta distintos. Streams es para captura de cambios, no para acelerar lecturas."
  },
  {
    id: "saa-531",
    dominio: 3,
    tema: "DynamoDB",
    tipo: "single",
    enunciado: "Una tabla DynamoDB sufre throttling porque una pequeña cantidad de claves de partición recibe la mayor parte del tráfico de escritura (hot partitions). El esquema usa un identificador de cliente como clave de partición. ¿Qué técnica distribuye MEJOR la carga de escritura?",
    opciones: [
      "Write sharding: añadir un sufijo aleatorio o calculado a la clave de partición para repartir las escrituras entre más particiones",
      "Reducir el número de atributos por ítem",
      "Cambiar a modo de capacidad aprovisionada con RCU altas",
      "Crear una réplica global en otra región"
    ],
    correctas: [0],
    explicacion: "El write sharding agrega un sufijo a la clave de partición para distribuir las escrituras de claves calientes entre más particiones, eliminando el hot partition. Reducir atributos no cambia la distribución de claves. Subir RCU afecta lecturas, no escrituras. Una réplica global replica el mismo problema en otra región."
  },
  {
    id: "saa-532",
    dominio: 3,
    tema: "DynamoDB",
    tipo: "single",
    enunciado: "Un equipo necesita soportar múltiples patrones de consulta con un solo índice secundario global en DynamoDB para minimizar costos y mantener buen rendimiento, reutilizando la misma clave del GSI para distintos tipos de entidad. ¿Qué técnica de diseño aplica?",
    opciones: [
      "GSI overloading, reutilizando atributos genéricos de clave del índice para almacenar distintos tipos de datos",
      "Crear un GSI por cada patrón de consulta",
      "Usar solo scans con filtros",
      "Habilitar capacidad bajo demanda para todos los GSI"
    ],
    correctas: [0],
    explicacion: "El GSI overloading reutiliza los mismos atributos de clave del índice para almacenar diferentes tipos de entidad, soportando varios patrones de consulta con un único GSI y reduciendo costo. Crear un GSI por patrón aumenta costo. Los scans son ineficientes. La capacidad bajo demanda no resuelve el diseño de acceso."
  },
  {
    id: "saa-533",
    dominio: 3,
    tema: "Aurora",
    tipo: "single",
    enunciado: "Una aplicación con tráfico de lectura muy variable usa Amazon Aurora. El equipo quiere escalar automáticamente la capacidad de lectura agregando y quitando réplicas según la carga, sin intervención manual, manteniendo un único endpoint de lectura. ¿Qué característica utiliza?",
    opciones: [
      "Aurora Auto Scaling para réplicas de lectura, combinado con el reader endpoint",
      "Aumentar manualmente la clase de instancia del writer",
      "Crear réplicas de lectura cross-region permanentes",
      "Activar Multi-AZ en una instancia RDS estándar"
    ],
    correctas: [0],
    explicacion: "Aurora Auto Scaling agrega o elimina réplicas de lectura automáticamente según métricas de carga, y el reader endpoint balancea las conexiones de lectura entre ellas. Escalar el writer no escala lecturas horizontalmente. Las réplicas cross-region permanentes no se ajustan por demanda. Multi-AZ de RDS estándar es para HA, no escalado de lectura."
  },
  {
    id: "saa-534",
    dominio: 3,
    tema: "RDS Proxy",
    tipo: "single",
    enunciado: "Una flota de funciones Lambda abre y cierra miles de conexiones a una base de datos RDS MySQL, agotando las conexiones disponibles y degradando el rendimiento durante picos. ¿Qué solución mejora MÁS el rendimiento y la escalabilidad de las conexiones?",
    opciones: [
      "Amazon RDS Proxy para agrupar y reutilizar conexiones (connection pooling)",
      "Aumentar el parámetro max_connections al máximo posible",
      "Migrar a una instancia con más vCPU",
      "Crear una réplica de lectura adicional"
    ],
    correctas: [0],
    explicacion: "RDS Proxy mantiene un pool de conexiones reutilizables, evitando el agotamiento por la apertura masiva de conexiones desde Lambda y mejorando la escalabilidad. Subir max_connections consume memoria y no es sostenible. Más vCPU no resuelve el patrón de conexiones. Una réplica de lectura no soluciona el agotamiento de conexiones de escritura."
  },
  {
    id: "saa-535",
    dominio: 3,
    tema: "RDS",
    tipo: "single",
    enunciado: "Una empresa necesita servir lecturas de baja latencia a usuarios en una región geográficamente distante del writer de RDS MySQL, sin afectar el rendimiento de la base de datos principal. ¿Qué opción ofrece el MEJOR rendimiento de lectura local en esa región remota?",
    opciones: [
      "Una réplica de lectura cross-region de RDS en la región remota",
      "Aumentar las IOPS del volumen del writer",
      "Habilitar el cacheo de consultas en la aplicación únicamente",
      "Mover el writer a una instancia más grande"
    ],
    correctas: [0],
    explicacion: "Una réplica de lectura cross-region coloca una copia de solo lectura cerca de los usuarios remotos, reduciendo la latencia de lectura y descargando al writer. Aumentar IOPS o el tamaño del writer no acerca los datos a los usuarios remotos. El cacheo en la aplicación es complementario pero no resuelve la latencia de las lecturas que faltan en caché."
  },
  {
    id: "saa-536",
    dominio: 3,
    tema: "EBS",
    tipo: "single",
    enunciado: "Una base de datos transaccional de misión crítica necesita un volumen EBS con la MÁXIMA cantidad de IOPS y el mayor rendimiento por volumen, con durabilidad del 99.999%, para una instancia compatible. ¿Qué tipo de volumen EBS es el más adecuado?",
    opciones: [
      "io2 Block Express",
      "gp3 con IOPS al máximo",
      "st1 (throughput optimized HDD)",
      "sc1 (cold HDD)"
    ],
    correctas: [0],
    explicacion: "io2 Block Express ofrece la mayor cantidad de IOPS y throughput por volumen, baja latencia y durabilidad de 99.999%, ideal para bases de datos críticas. gp3 tiene límites de IOPS inferiores. st1 y sc1 son volúmenes HDD orientados a throughput secuencial y cargas frías, con IOPS bajas, no aptos para cargas transaccionales."
  },
  {
    id: "saa-537",
    dominio: 3,
    tema: "EBS",
    tipo: "single",
    enunciado: "Una carga de trabajo necesita 800 MiB/s de throughput secuencial sostenido a bajo costo en un volumen único conectado a una instancia EC2, sin requerir IOPS muy altas. ¿Qué tipo de volumen EBS optimiza mejor el costo para este perfil?",
    opciones: [
      "st1 (throughput optimized HDD)",
      "io2 Block Express",
      "gp2 de tamaño mínimo",
      "sc1 (cold HDD)"
    ],
    correctas: [0],
    explicacion: "st1 está optimizado para throughput secuencial alto a bajo costo, ideal para cargas como big data y logs que necesitan MiB/s pero no IOPS altas. io2 Block Express es caro y orientado a IOPS. gp2 mínimo no entrega ese throughput sostenido. sc1 es para datos fríos con throughput inferior al de st1."
  },
  {
    id: "saa-538",
    dominio: 3,
    tema: "EBS",
    tipo: "single",
    enunciado: "Un administrador necesita superar el límite de IOPS y throughput de un solo volumen EBS para una aplicación que tolera reconstruir los datos desde un backup en caso de fallo de un disco. ¿Qué configuración maximiza el rendimiento agregado?",
    opciones: [
      "Combinar varios volúmenes EBS en un arreglo RAID 0 (striping)",
      "Configurar los volúmenes en RAID 1 (mirroring)",
      "Usar un único volumen sc1 grande",
      "Activar EBS Multi-Attach en un volumen gp2"
    ],
    correctas: [0],
    explicacion: "RAID 0 distribuye (striping) la E/S entre varios volúmenes EBS, sumando IOPS y throughput, adecuado cuando la durabilidad se asegura con backups. RAID 1 duplica datos y no aumenta el rendimiento agregado de escritura. Un sc1 grande es lento. Multi-Attach comparte un volumen entre instancias, no aumenta el rendimiento agregado."
  },
  {
    id: "saa-539",
    dominio: 3,
    tema: "EFS",
    tipo: "single",
    enunciado: "Una carga de trabajo de análisis genómico requiere un sistema de archivos compartido que soporte miles de operaciones concurrentes con el MAYOR throughput agregado y altamente paralelizable, aceptando una latencia por operación ligeramente superior. ¿Qué modo de rendimiento de EFS se recomienda?",
    opciones: [
      "Performance mode Max I/O",
      "Performance mode General Purpose",
      "Throughput mode Bursting con almacenamiento mínimo",
      "Modo de una sola zona (One Zone) sin réplicas"
    ],
    correctas: [0],
    explicacion: "El modo Max I/O escala a niveles más altos de operaciones agregadas por segundo para cargas masivamente paralelas, a costa de algo más de latencia por operación. General Purpose tiene menor latencia pero menos throughput agregado. El modo de throughput o One Zone no determinan la capacidad de operaciones concurrentes de la misma forma."
  },
  {
    id: "saa-540",
    dominio: 3,
    tema: "EFS",
    tipo: "single",
    enunciado: "Un equipo quiere que EFS ajuste automáticamente el throughput según la demanda, pagando solo por lo que usa y sin depender del tamaño del sistema de archivos ni de créditos de bursting. ¿Qué modo de throughput cumple este objetivo con el MEJOR rendimiento bajo demanda?",
    opciones: [
      "Elastic Throughput",
      "Bursting Throughput",
      "Provisioned Throughput fijo y permanente",
      "Max I/O performance mode"
    ],
    correctas: [0],
    explicacion: "Elastic Throughput escala el rendimiento de lectura y escritura automáticamente según la carga y se cobra por uso, ideal para patrones impredecibles. Bursting depende de créditos y tamaño. Provisioned implica pagar capacidad fija aunque no se use. Max I/O es un performance mode, no un modo de throughput."
  },
  {
    id: "saa-541",
    dominio: 3,
    tema: "FSx for Lustre",
    tipo: "single",
    enunciado: "Una carga HPC necesita un sistema de archivos POSIX de altísimo throughput y baja latencia que procese datasets almacenados en Amazon S3, cargando y exportando datos entre S3 y el file system de forma transparente. ¿Qué servicio es el más adecuado?",
    opciones: [
      "Amazon FSx for Lustre integrado con un bucket S3",
      "Amazon EFS con throughput aprovisionado",
      "Amazon FSx for Windows File Server",
      "Amazon S3 montado directamente como sistema de archivos"
    ],
    correctas: [0],
    explicacion: "FSx for Lustre ofrece throughput de cientos de GB/s y baja latencia para HPC y se integra de forma nativa con S3, presentando los objetos como archivos y exportando resultados. EFS no alcanza ese rendimiento HPC. FSx for Windows es para cargas SMB/Windows. Montar S3 como filesystem no ofrece el rendimiento de Lustre."
  },
  {
    id: "saa-542",
    dominio: 3,
    tema: "FSx for ONTAP",
    tipo: "single",
    enunciado: "Una empresa migra cargas que requieren protocolos NFS y SMB simultáneos, snapshots, clonación instantánea y tiering automático a almacenamiento de menor costo, con funciones de NetApp. ¿Qué servicio de AWS satisface estos requisitos?",
    opciones: [
      "Amazon FSx for NetApp ONTAP",
      "Amazon FSx for Lustre",
      "Amazon EFS",
      "Amazon EBS io2"
    ],
    correctas: [0],
    explicacion: "FSx for NetApp ONTAP soporta NFS, SMB e iSCSI de forma simultánea, con snapshots, clonación eficiente y tiering automático a un nivel de capacidad de menor costo, ofreciendo las funciones de ONTAP. FSx for Lustre es para HPC. EFS solo NFS. EBS es almacenamiento de bloque de una sola instancia."
  },
  {
    id: "saa-543",
    dominio: 3,
    tema: "Instance Store",
    tipo: "single",
    enunciado: "Una base de datos NoSQL temporal necesita la MENOR latencia de E/S posible para datos efímeros que pueden reconstruirse, sin requerir persistencia tras el detenido de la instancia. ¿Qué opción de almacenamiento ofrece el mejor rendimiento?",
    opciones: [
      "Instance Store NVMe local de la instancia EC2",
      "Un volumen EBS gp3 con IOPS máximas",
      "Amazon EFS con Elastic Throughput",
      "Amazon S3 con Transfer Acceleration"
    ],
    correctas: [0],
    explicacion: "El Instance Store NVMe local entrega la latencia y el IOPS más bajos al estar físicamente conectado a la instancia, ideal para datos efímeros y reconstruibles. EBS es almacenamiento de red con algo más de latencia. EFS y S3 son almacenamiento de red de mayor latencia para este patrón de E/S intensivo."
  },
  {
    id: "saa-544",
    dominio: 3,
    tema: "Placement Groups",
    tipo: "single",
    enunciado: "Un clúster HPC con comunicación nodo a nodo muy intensa necesita la MENOR latencia de red y el MAYOR ancho de banda entre instancias EC2 dentro de una sola AZ. ¿Qué tipo de placement group debe usarse?",
    opciones: [
      "Cluster placement group",
      "Spread placement group",
      "Partition placement group",
      "Sin placement group, repartiendo entre varias AZ"
    ],
    correctas: [0],
    explicacion: "El cluster placement group agrupa instancias físicamente cercanas en una misma AZ para lograr baja latencia y alto ancho de banda de red entre ellas, ideal para HPC. El spread maximiza el aislamiento de hardware. El partition es para sistemas distribuidos grandes. Repartir entre AZ aumenta la latencia."
  },
  {
    id: "saa-545",
    dominio: 3,
    tema: "EFA",
    tipo: "single",
    enunciado: "Una aplicación de dinámica de fluidos computacional usa MPI y requiere comunicación entre nodos con latencia extremadamente baja y bypass del kernel del sistema operativo para escalar a miles de núcleos. ¿Qué tecnología de red debe habilitarse en las instancias EC2?",
    opciones: [
      "Elastic Fabric Adapter (EFA)",
      "Elastic Network Adapter (ENA) estándar",
      "Una segunda ENI en otra subred",
      "Un Network Load Balancer entre los nodos"
    ],
    correctas: [0],
    explicacion: "EFA proporciona comunicación de baja latencia con bypass del sistema operativo mediante su interfaz OS-bypass, optimizada para MPI y aplicaciones HPC a gran escala. ENA estándar no ofrece el bypass del kernel necesario. Añadir una ENI o un NLB no reduce la latencia de comunicación MPI entre nodos."
  },
  {
    id: "saa-546",
    dominio: 3,
    tema: "Graviton",
    tipo: "single",
    enunciado: "Una empresa quiere reducir costos y mejorar la relación precio-rendimiento de cargas de trabajo escalables de propósito general y contenedores compatibles, sin reescribir lógica de negocio significativa. ¿Qué elección de procesador ofrece la MEJOR relación precio-rendimiento?",
    opciones: [
      "Instancias basadas en AWS Graviton (ARM)",
      "Instancias con la generación más antigua de procesadores x86",
      "Solo instancias con GPU",
      "Instancias optimizadas para memoria de la familia más cara"
    ],
    correctas: [0],
    explicacion: "Los procesadores Graviton basados en ARM ofrecen una relación precio-rendimiento superior para muchas cargas de propósito general y contenedores, reduciendo costos. Procesadores x86 antiguos rinden menos. Las GPU son para cómputo acelerado específico. Las instancias optimizadas para memoria más caras no maximizan la relación precio-rendimiento general."
  },
  {
    id: "saa-547",
    dominio: 3,
    tema: "EC2",
    tipo: "single",
    enunciado: "Una aplicación de caché en memoria y procesamiento de grandes conjuntos de datos en RAM presenta cuellos de botella por falta de memoria, mientras la CPU permanece infrautilizada. ¿Qué familia de instancias EC2 es la más adecuada?",
    opciones: [
      "Instancias optimizadas para memoria (familia R o X)",
      "Instancias optimizadas para cómputo (familia C)",
      "Instancias de propósito general pequeñas (familia T)",
      "Instancias optimizadas para almacenamiento (familia D)"
    ],
    correctas: [0],
    explicacion: "Las instancias optimizadas para memoria (R y X) ofrecen una alta relación de memoria por vCPU, ideales para cachés en memoria y grandes datasets en RAM. Las de cómputo (C) priorizan CPU. Las T son de bajo costo y burst. Las D priorizan almacenamiento denso, no memoria."
  },
  {
    id: "saa-548",
    dominio: 3,
    tema: "Lambda",
    tipo: "single",
    enunciado: "Una función Lambda intensiva en CPU procesa imágenes y resulta demasiado lenta. El equipo nota que el tiempo de ejecución baja al subir la memoria asignada. ¿Por qué aumentar la memoria mejora el rendimiento de la función?",
    opciones: [
      "Lambda asigna CPU de forma proporcional a la memoria configurada, por lo que más memoria implica más capacidad de CPU",
      "Más memoria reduce automáticamente el número de invocaciones concurrentes",
      "La memoria adicional habilita el uso de GPU en Lambda",
      "Aumentar la memoria desactiva el cold start permanentemente"
    ],
    correctas: [0],
    explicacion: "En Lambda la potencia de CPU (y la red) se escala proporcionalmente a la memoria asignada, así que aumentar la memoria da más CPU y reduce el tiempo de ejecución de cargas CPU-bound. No reduce concurrencia ni habilita GPU. El cold start no se elimina permanentemente al subir memoria."
  },
  {
    id: "saa-549",
    dominio: 3,
    tema: "Lambda",
    tipo: "single",
    enunciado: "Una API serverless crítica sufre latencias inaceptables por cold starts durante picos repentinos de tráfico. Se requiere garantizar que un número definido de entornos de ejecución esté siempre inicializado y listo. ¿Qué característica de Lambda resuelve esto?",
    opciones: [
      "Provisioned Concurrency para mantener entornos pre-inicializados",
      "Reserved Concurrency para limitar el máximo de ejecuciones",
      "Aumentar el timeout de la función",
      "Habilitar DynamoDB Streams como disparador"
    ],
    correctas: [0],
    explicacion: "Provisioned Concurrency mantiene un número configurado de entornos inicializados y listos, eliminando los cold starts para esas invocaciones. Reserved Concurrency solo limita la concurrencia máxima sin pre-calentar. Aumentar el timeout no afecta el cold start. DynamoDB Streams es un disparador, no una solución de latencia de arranque."
  },
  {
    id: "saa-550",
    dominio: 3,
    tema: "Kinesis",
    tipo: "single",
    enunciado: "Un stream de Kinesis Data Streams tiene varios consumidores que comparten el límite de throughput de lectura por shard, lo que aumenta la latencia de entrega a medida que se agregan consumidores. Se necesita que cada consumidor reciba su propio throughput dedicado y baja latencia. ¿Qué característica se debe usar?",
    opciones: [
      "Enhanced fan-out, que da a cada consumidor 2 MB/s por shard dedicados con entrega push de baja latencia",
      "Aumentar el período de retención del stream",
      "Reducir el número de shards para concentrar el tráfico",
      "Usar el SDK con polling estándar más frecuente"
    ],
    correctas: [0],
    explicacion: "El enhanced fan-out asigna a cada consumidor un canal dedicado de 2 MB/s por shard con entrega push de baja latencia, evitando la contención del throughput compartido. Aumentar la retención no cambia el throughput de lectura. Reducir shards baja la capacidad. El polling estándar sigue compartiendo el límite de lectura."
  },
  {
    id: "saa-551",
    dominio: 3,
    tema: "Kinesis",
    tipo: "single",
    enunciado: "Un stream de Kinesis Data Streams empieza a recibir ProvisionedThroughputExceededException porque la tasa de ingesta supera la capacidad actual. ¿Cuál es la forma correcta de aumentar la capacidad de ingesta del stream?",
    opciones: [
      "Aumentar el número de shards (resharding mediante split), ya que la capacidad escala con la cantidad de shards",
      "Incrementar el tamaño de cada registro",
      "Activar enhanced fan-out en todos los consumidores",
      "Reducir el período de retención"
    ],
    correctas: [0],
    explicacion: "La capacidad de ingesta de Kinesis Data Streams escala con el número de shards (cada shard admite 1 MB/s o 1000 registros/s de escritura), por lo que dividir shards aumenta el throughput. Cambiar el tamaño del registro no añade capacidad. Enhanced fan-out es para lectura. La retención no afecta el throughput de escritura."
  },
  {
    id: "saa-552",
    dominio: 3,
    tema: "Athena",
    tipo: "multiple",
    enunciado: "Las consultas de Amazon Athena sobre un gran conjunto de datos en S3 son lentas y costosas porque escanean todos los datos. El equipo quiere reducir el volumen escaneado y mejorar el rendimiento de forma significativa. ¿Qué DOS medidas son las más efectivas? (Elegí 2)",
    opciones: [
      "Convertir los datos a un formato columnar comprimido como Parquet para leer solo las columnas necesarias",
      "Particionar los datos por columnas de filtrado frecuente para reducir los datos escaneados por consulta",
      "Almacenar los datos en CSV sin comprimir y sin particiones",
      "Consolidar todos los datos en un único objeto gigante por tabla",
      "Ejecutar siempre las consultas con SELECT * sobre todas las columnas"
    ],
    correctas: [0, 1],
    explicacion: "Usar un formato columnar comprimido como Parquet permite leer solo las columnas necesarias, y el particionado reduce los datos escaneados por cada consulta, mejorando rendimiento y costo. CSV sin particiones escanea todo, un único objeto gigante limita el paralelismo y SELECT * escanea todas las columnas innecesariamente."
  },
  {
    id: "saa-553",
    dominio: 3,
    tema: "Redshift",
    tipo: "single",
    enunciado: "Un clúster de Amazon Redshift sufre colas de consultas durante picos de concurrencia que degradan los tiempos de respuesta de los usuarios de BI. Se necesita absorber automáticamente los picos de consultas concurrentes de lectura sin sobreaprovisionar permanentemente. ¿Qué característica se debe habilitar?",
    opciones: [
      "Concurrency Scaling para añadir capacidad de clúster transitoria durante los picos de lectura",
      "Redshift Spectrum para consultar datos en S3",
      "Aumentar permanentemente el número de nodos al máximo",
      "Cambiar todas las tablas a distribución ALL"
    ],
    correctas: [0],
    explicacion: "Concurrency Scaling agrega clústeres transitorios automáticamente para manejar picos de consultas concurrentes de lectura, eliminando colas sin sobreaprovisionar de forma permanente. Spectrum consulta S3 pero no resuelve la concurrencia. Aumentar nodos permanentemente es costoso. La distribución ALL replica tablas y no resuelve la concurrencia."
  },
  {
    id: "saa-554",
    dominio: 3,
    tema: "Redshift Spectrum",
    tipo: "single",
    enunciado: "Una empresa quiere consultar petabytes de datos históricos almacenados en S3 directamente desde Redshift, sin cargarlos al clúster, uniéndolos con tablas locales del data warehouse. ¿Qué característica permite esto con buen rendimiento?",
    opciones: [
      "Amazon Redshift Spectrum",
      "Amazon Athena Federated Query hacia Redshift",
      "Copiar todos los datos de S3 a las tablas del clúster con COPY",
      "Amazon QuickSight con SPICE"
    ],
    correctas: [0],
    explicacion: "Redshift Spectrum permite consultar datos en S3 directamente desde Redshift y unirlos con tablas locales, sin cargar los petabytes al clúster, usando una capa de cómputo separada para escanear S3. COPY cargaría todos los datos. Athena Federated y QuickSight resuelven otros casos y no integran S3 dentro de consultas Redshift de la misma forma."
  },
  {
    id: "saa-555",
    dominio: 3,
    tema: "API Gateway",
    tipo: "single",
    enunciado: "Una API REST en API Gateway sirve respuestas que cambian poco y recibe muchas solicitudes idénticas, generando carga innecesaria en el backend y aumentando la latencia. ¿Qué característica reduce la latencia y descarga el backend?",
    opciones: [
      "Habilitar el caching de API Gateway en la etapa (stage) con un TTL adecuado",
      "Cambiar el tipo de endpoint a regional sin más cambios",
      "Aumentar el límite de throttling de la API",
      "Activar logs de acceso detallados"
    ],
    correctas: [0],
    explicacion: "El caching de API Gateway almacena respuestas en la etapa durante el TTL configurado, sirviendo solicitudes repetidas desde la caché y reduciendo latencia y carga del backend. Cambiar el endpoint o subir el throttling no cachea respuestas. Los logs de acceso no mejoran el rendimiento."
  },
  {
    id: "saa-556",
    dominio: 3,
    tema: "SQS",
    tipo: "single",
    enunciado: "Un sistema de procesamiento de pedidos usa una cola SQS y una flota EC2 en un Auto Scaling Group. Durante picos, los mensajes se acumulan y aumenta la latencia de procesamiento. ¿Qué métrica es la MÁS adecuada para escalar el ASG y mantener el throughput?",
    opciones: [
      "ApproximateNumberOfMessagesVisible de la cola, usada en una política de target tracking",
      "El uso de CPU promedio de las instancias únicamente",
      "El número de conexiones de red por instancia",
      "La latencia de disco de los volúmenes EBS"
    ],
    correctas: [0],
    explicacion: "ApproximateNumberOfMessagesVisible refleja el backlog de la cola y es la métrica ideal para escalar el ASG según la cantidad de trabajo pendiente, manteniendo el throughput. La CPU puede no correlacionarse con el backlog. Las conexiones de red y la latencia de disco no representan la carga de la cola."
  },
  {
    id: "saa-557",
    dominio: 3,
    tema: "Firehose",
    tipo: "single",
    enunciado: "Un pipeline usa Amazon Data Firehose para entregar registros a S3. El equipo quiere optimizar el rendimiento de entrega y reducir el número de objetos pequeños, controlando cada cuántos MB o segundos se agrupan los datos antes de escribirlos. ¿Qué configuración deben ajustar?",
    opciones: [
      "Los parámetros de buffering (tamaño en MB e intervalo en segundos) de Firehose",
      "El número de shards del stream",
      "El TTL de DynamoDB asociado",
      "El performance mode de un sistema EFS"
    ],
    correctas: [0],
    explicacion: "Firehose agrupa registros según el buffer size (MB) y el buffer interval (segundos), y ajustar estos valores controla el tamaño de los objetos entregados y la eficiencia, reduciendo objetos pequeños. Firehose no usa shards configurables como Kinesis Data Streams. El TTL de DynamoDB y el performance mode de EFS no aplican aquí."
  },
  {
    id: "saa-558",
    dominio: 3,
    tema: "MSK",
    tipo: "multiple",
    enunciado: "Una empresa migra una plataforma de streaming basada en Apache Kafka a AWS y quiere maximizar el rendimiento manteniendo compatibilidad con sus aplicaciones Kafka existentes. ¿Qué DOS afirmaciones sobre Amazon MSK son correctas? (Elegí 2)",
    opciones: [
      "Amazon MSK ejecuta Apache Kafka gestionado, manteniendo compatibilidad con las APIs y herramientas nativas de Kafka",
      "El rendimiento de un topic puede escalarse aumentando el número de particiones y distribuyéndolas entre brokers",
      "MSK obliga a reescribir los productores y consumidores con una API propietaria de AWS",
      "MSK no permite ajustar el tipo ni la cantidad de brokers",
      "El número de particiones de un topic no influye en el paralelismo de consumo"
    ],
    correctas: [0, 1],
    explicacion: "MSK es Apache Kafka gestionado, compatible con las APIs y herramientas nativas, por lo que no requiere reescribir clientes. El throughput y el paralelismo de consumo escalan con el número de particiones distribuidas entre brokers, cuyo tipo y cantidad sí se pueden ajustar."
  },
  {
    id: "saa-559",
    dominio: 3,
    tema: "OpenSearch",
    tipo: "multiple",
    enunciado: "Un equipo opera un dominio de Amazon OpenSearch Service para búsqueda y análisis de logs y necesita mejorar el rendimiento de consultas e indexación a gran escala. ¿Qué DOS prácticas mejoran el rendimiento? (Elegí 2)",
    opciones: [
      "Usar nodos dedicados de tipo master para estabilizar el clúster y nodos de datos optimizados para la carga",
      "Diseñar correctamente el número de shards por índice para distribuir la carga entre los nodos de datos",
      "Colocar todos los datos en un único shard gigante por índice",
      "Eliminar todas las réplicas para reducir el uso de almacenamiento siempre",
      "Ejecutar consultas con wildcards iniciales en todos los campos de texto"
    ],
    correctas: [0, 1],
    explicacion: "Los nodos master dedicados estabilizan el clúster y un buen dimensionamiento de shards distribuye la carga de indexación y consulta entre los nodos de datos. Un único shard gigante crea cuellos de botella, eliminar todas las réplicas reduce disponibilidad y rendimiento de lectura, y los wildcards iniciales son consultas costosas."
  },
  {
    id: "saa-560",
    dominio: 3,
    tema: "Spot HPC",
    tipo: "multiple",
    enunciado: "Una empresa ejecuta simulaciones HPC tolerantes a interrupciones y quiere maximizar el rendimiento de cómputo minimizando el costo. ¿Qué DOS estrategias son las más apropiadas? (Elegí 2)",
    opciones: [
      "Usar instancias Spot para los nodos de trabajo, aprovechando su menor costo en cargas tolerantes a interrupciones",
      "Agrupar las instancias en un cluster placement group para baja latencia de red entre nodos",
      "Usar exclusivamente instancias On-Demand de la familia más cara para todos los nodos",
      "Distribuir los nodos entre múltiples regiones para minimizar la latencia interna del clúster",
      "Deshabilitar EFA para reducir el costo de red"
    ],
    correctas: [0, 1],
    explicacion: "Las instancias Spot reducen drásticamente el costo de las cargas HPC tolerantes a interrupciones, y un cluster placement group minimiza la latencia de red entre nodos para mejorar el rendimiento. Usar solo On-Demand caro encarece sin beneficio, distribuir entre regiones aumenta la latencia interna y deshabilitar EFA degrada la comunicación MPI."
  }
]);
