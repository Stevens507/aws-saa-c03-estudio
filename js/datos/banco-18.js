window.BANCO = (window.BANCO || []).concat([
  {
    id: "saa-681",
    dominio: 3,
    tema: "CloudFront",
    tipo: "single",
    enunciado: "Una plataforma de noticias sirve contenido estático desde un bucket S3 a través de CloudFront. Durante eventos de alto tráfico, el origen recibe miles de peticiones simultáneas por los mismos objetos cuando expiran en la caché, generando latencia y picos de costo en el origen. El equipo necesita reducir las solicitudes al origen sin cambiar los TTL. ¿Qué configuración es la MÁS adecuada?",
    opciones: [
      "Habilitar Origin Shield en la región más cercana al bucket S3 de origen",
      "Reducir el TTL mínimo a 0 para revalidar siempre contra el origen",
      "Activar el cifrado de campo a nivel de Lambda@Edge en la respuesta",
      "Migrar el origen a un Application Load Balancer con instancias EC2"
    ],
    correctas: [0],
    explicacion: "Origin Shield añade una capa centralizada de caché que consolida las solicitudes (collapsing) y protege al origen ante objetos expirados. Reducir el TTL aumentaría las peticiones al origen. El cifrado de campo no afecta el throughput de caché. Migrar a ALB+EC2 no resuelve el problema y es menos performante que S3 con Origin Shield."
  },
  {
    id: "saa-682",
    dominio: 3,
    tema: "Global Accelerator",
    tipo: "single",
    enunciado: "Una empresa de juegos en línea ejecuta servidores TCP/UDP en EC2 detrás de un Network Load Balancer en tres regiones. Los jugadores reportan latencia variable y reconexiones lentas durante failovers regionales. Necesitan IPs estáticas globales y conmutación rápida usando la red troncal de AWS. ¿Qué servicio cumple MEJOR estos requisitos?",
    opciones: [
      "Amazon CloudFront con orígenes personalizados por región",
      "AWS Global Accelerator con endpoints en los NLB de cada región",
      "Route 53 con política de enrutamiento por latencia y health checks",
      "Una Transit Gateway con peering entre las tres regiones"
    ],
    correctas: [1],
    explicacion: "Global Accelerator ofrece dos IPs Anycast estáticas, soporta TCP/UDP, enruta por la red troncal de AWS y realiza failover en segundos. CloudFront está pensado para HTTP/S y caché, no para tráfico de juegos UDP de baja latencia. Route 53 depende del TTL de DNS para failover (más lento). Transit Gateway conecta VPCs, no acelera el tráfico de clientes en Internet."
  },
  {
    id: "saa-683",
    dominio: 3,
    tema: "ElastiCache",
    tipo: "single",
    enunciado: "Una aplicación de e-commerce usa ElastiCache for Redis en un solo nodo para almacenar el catálogo. El dataset creció a 200 GB y el conjunto de claves ya no cabe en un nodo, además de necesitar escritura distribuida. ¿Qué cambio proporciona el MAYOR throughput de escritura y capacidad horizontal?",
    opciones: [
      "Aumentar verticalmente a un tipo de nodo con más memoria",
      "Habilitar Redis Cluster Mode con múltiples shards para particionar las claves",
      "Agregar réplicas de lectura al nodo primario existente",
      "Cambiar a ElastiCache for Memcached con un único nodo grande"
    ],
    correctas: [1],
    explicacion: "Redis Cluster Mode particiona (sharding) el keyspace en múltiples shards, cada uno con su primario, distribuyendo escrituras y capacidad de memoria horizontalmente. El escalado vertical tiene límite de tamaño de nodo. Las réplicas solo escalan lecturas, no escrituras. Memcached de un nodo no resuelve el sharding ni la durabilidad de Redis."
  },
  {
    id: "saa-684",
    dominio: 3,
    tema: "DynamoDB",
    tipo: "single",
    enunciado: "Una aplicación de microblogging usa DynamoDB y experimenta latencia de lectura por encima de lo aceptable en consultas repetidas de perfiles populares con patrón de lectura intensiva. El equipo quiere reducir la latencia a microsegundos sin reescribir la lógica de la aplicación de forma significativa. ¿Cuál es la solución MÁS adecuada?",
    opciones: [
      "Crear un índice secundario global (GSI) para los perfiles populares",
      "Habilitar DynamoDB Accelerator (DAX) como caché en memoria de la tabla",
      "Aumentar la capacidad de lectura aprovisionada (RCU) de la tabla",
      "Activar DynamoDB Streams para mantener una copia en ElastiCache"
    ],
    correctas: [1],
    explicacion: "DAX es una caché en memoria totalmente gestionada y compatible con la API de DynamoDB que reduce las lecturas a microsegundos con cambios mínimos en el código. Un GSI cambia el patrón de acceso pero no acelera lecturas repetidas. Subir RCU no entrega latencia de microsegundos. Construir una caché manual con Streams+ElastiCache es más complejo que DAX."
  },
  {
    id: "saa-685",
    dominio: 3,
    tema: "RDS Proxy",
    tipo: "single",
    enunciado: "Una función Lambda con alta concurrencia abre conexiones directas a una base de datos Amazon RDS for MySQL. Durante picos, la base alcanza el límite de conexiones y aparecen errores 'too many connections'. ¿Qué solución mejora el rendimiento manteniendo la base disponible bajo concurrencia masiva?",
    opciones: [
      "Aumentar el parámetro max_connections en el grupo de parámetros de RDS",
      "Implementar RDS Proxy para hacer pooling y multiplexar las conexiones",
      "Migrar la lógica a EC2 con conexiones persistentes en un solo proceso",
      "Habilitar réplicas de lectura para repartir las conexiones de escritura"
    ],
    correctas: [1],
    explicacion: "RDS Proxy mantiene un pool de conexiones reutilizables y multiplexa la enorme cantidad de conexiones efímeras de Lambda hacia un número reducido de conexiones a la base, evitando el agotamiento. Subir max_connections consume más memoria y no escala bien. EC2 no soluciona la concurrencia de Lambda. Las réplicas de lectura no ayudan con conexiones de escritura."
  },
  {
    id: "saa-686",
    dominio: 3,
    tema: "Aurora",
    tipo: "single",
    enunciado: "Un servicio de reportes sobre Amazon Aurora MySQL ve crecer la carga de lectura analítica de forma impredecible a lo largo del día. El equipo quiere que la capacidad de lectura escale automáticamente según la utilización sin gestionar instancias manualmente. ¿Qué configuración es la MÁS adecuada?",
    opciones: [
      "Configurar Aurora Auto Scaling para réplicas de lectura según métrica de CPU/conexiones",
      "Aumentar manualmente el tamaño de la instancia primaria a una memory optimized",
      "Habilitar Multi-AZ con una réplica en espera para distribuir las lecturas",
      "Migrar el clúster a RDS for MySQL con réplicas de lectura estáticas"
    ],
    correctas: [0],
    explicacion: "Aurora Auto Scaling agrega o elimina réplicas de lectura automáticamente según métricas como CPU promedio o número de conexiones, escalando el throughput de lectura sin intervención manual. Subir la primaria no escala lecturas elásticamente. La instancia en espera Multi-AZ de RDS no sirve lecturas. RDS con réplicas estáticas no escala automáticamente."
  },
  {
    id: "saa-687",
    dominio: 3,
    tema: "EBS",
    tipo: "multiple",
    enunciado: "Estás seleccionando almacenamiento de bloques de alto rendimiento para distintas cargas en EC2. ¿Cuáles afirmaciones sobre los tipos de volumen EBS y técnicas relacionadas son CORRECTAS? (Elegí dos.)",
    opciones: [
      "io2 Block Express ofrece hasta 256.000 IOPS y latencia sub-milisegundo en un único volumen",
      "Combinar varios volúmenes EBS en RAID 0 (striping) suma su IOPS y throughput agregados",
      "gp3 puede superar los 100.000 IOPS por volumen sin recurrir a RAID",
      "st1 (throughput optimized HDD) es la mejor opción para una base de datos OLTP de baja latencia",
      "sc1 (cold HDD) entrega menor latencia por operación que io2 Block Express"
    ],
    correctas: [0, 1],
    explicacion: "io2 Block Express alcanza 256.000 IOPS con latencia sub-milisegundo por volumen, y RAID 0 distribuye las E/S sumando IOPS y throughput de varios volúmenes. gp3 tope en 16.000 IOPS por volumen. st1 es HDD secuencial, inadecuado para OLTP de baja latencia. sc1 es HDD frío, con mayor latencia que io2."
  },
  {
    id: "saa-688",
    dominio: 3,
    tema: "FSx for Lustre",
    tipo: "single",
    enunciado: "Un equipo de machine learning necesita procesar un dataset de entrenamiento de varios terabytes almacenado en S3 con cómputo distribuido que exige throughput de cientos de GB/s y latencia sub-milisegundo en lecturas. Quieren que los datos de S3 estén disponibles como un sistema de archivos POSIX. ¿Qué solución es la MÁS performante?",
    opciones: [
      "Montar el bucket S3 mediante una pasarela S3 File Gateway en las instancias",
      "Usar Amazon FSx for Lustre vinculado al bucket S3 como repositorio de datos",
      "Copiar los datos a EFS en modo de rendimiento General Purpose",
      "Descargar el dataset a volúmenes gp3 individuales en cada instancia"
    ],
    correctas: [1],
    explicacion: "FSx for Lustre está diseñado para HPC/ML con throughput de cientos de GB/s y latencia sub-milisegundo, y se integra de forma nativa con S3 exponiendo los objetos como archivos POSIX. S3 File Gateway está pensado para acceso híbrido, no para HPC. EFS no alcanza ese throughput por cliente. Copiar a gp3 es lento y no comparte datos eficientemente."
  },
  {
    id: "saa-689",
    dominio: 3,
    tema: "Kinesis",
    tipo: "multiple",
    enunciado: "Estás diseñando una canalización de ingesta y análisis en streaming de alto rendimiento con servicios de Kinesis y MSK. ¿Cuáles afirmaciones son CORRECTAS? (Elegí dos.)",
    opciones: [
      "Enhanced Fan-Out de Kinesis Data Streams da a cada consumidor registrado 2 MB/s dedicados por shard",
      "Kinesis Data Firehose puede convertir registros a Parquet y entregarlos a S3 sin gestionar shards",
      "Aumentar el número de shards en Kinesis Data Streams reduce el throughput total del stream",
      "Firehose ofrece latencia de milisegundos en tiempo real, igual que Data Streams con Enhanced Fan-Out",
      "Amazon MSK no es compatible con las APIs de Apache Kafka y obliga a reescribir los clientes"
    ],
    correctas: [0, 1],
    explicacion: "Enhanced Fan-Out entrega 2 MB/s dedicados por consumidor y por shard, y Firehose convierte a Parquet y entrega a S3 sin shards. Aumentar shards incrementa (no reduce) el throughput. Firehose tiene latencia de buffering de segundos a minutos, no de milisegundos. MSK es totalmente compatible con las APIs de Kafka."
  },
  {
    id: "saa-690",
    dominio: 3,
    tema: "Redshift",
    tipo: "single",
    enunciado: "Un data warehouse en Amazon Redshift sufre colas de consultas durante horas pico cuando muchos usuarios ejecutan reportes simultáneos, mientras que fuera de pico el clúster está infrautilizado. Necesitan absorber los picos de concurrencia sin sobreaprovisionar el clúster de forma permanente. ¿Qué característica resuelve esto?",
    opciones: [
      "Habilitar Concurrency Scaling para agregar capacidad transitoria automáticamente",
      "Cambiar la distribución de las tablas a estilo ALL en todas las tablas",
      "Aumentar permanentemente el número de nodos del clúster principal",
      "Migrar las consultas a Amazon Athena sobre los datos en S3"
    ],
    correctas: [0],
    explicacion: "Concurrency Scaling añade clústeres transitorios automáticamente durante picos de concurrencia y los retira al bajar la demanda, manteniendo un rendimiento consistente sin sobreaprovisionar. La distribución ALL no resuelve concurrencia y puede saturar almacenamiento. Agregar nodos fijos genera costo permanente. Athena cambia el motor pero no es lo solicitado."
  },
  {
    id: "saa-691",
    dominio: 3,
    tema: "Lambda",
    tipo: "single",
    enunciado: "Una API crítica respaldada por Lambda presenta latencias elevadas en las primeras invocaciones tras periodos de inactividad debido a arranques en frío (cold starts), afectando picos predecibles cada mañana. El equipo necesita eliminar la latencia de arranque para esos picos. ¿Qué configuración es la MÁS adecuada?",
    opciones: [
      "Aumentar la memoria asignada a la función para acelerar la inicialización",
      "Configurar Provisioned Concurrency, opcionalmente con escalado programado",
      "Reducir el tamaño del paquete de despliegue moviendo dependencias a capas",
      "Aumentar el timeout de la función para tolerar los arranques en frío"
    ],
    correctas: [1],
    explicacion: "Provisioned Concurrency mantiene un número de entornos de ejecución inicializados y listos, eliminando los cold starts; combinado con Application Auto Scaling programado cubre picos predecibles. Más memoria acelera algo el arranque pero no lo elimina. Reducir el paquete ayuda marginalmente. Subir el timeout no afecta la latencia de arranque."
  },
  {
    id: "saa-692",
    dominio: 3,
    tema: "API Gateway",
    tipo: "single",
    enunciado: "Una API REST en Amazon API Gateway sirve datos de referencia que cambian raramente, pero el backend Lambda y la base de datos se saturan por peticiones idénticas repetidas. El equipo quiere reducir la latencia y la carga del backend para respuestas idénticas. ¿Qué función debe habilitar?",
    opciones: [
      "Habilitar el caché de etapa (stage cache) de API Gateway con un TTL adecuado",
      "Activar el throttling por método para limitar las peticiones de cada cliente",
      "Configurar un Usage Plan con API keys para los consumidores",
      "Habilitar las solicitudes de tipo proxy hacia el backend Lambda"
    ],
    correctas: [0],
    explicacion: "El caché de API Gateway almacena las respuestas por endpoint durante el TTL configurado, sirviendo respuestas idénticas sin invocar el backend, lo que reduce latencia y descarga Lambda/base de datos. El throttling solo limita peticiones, no las cachea. Los usage plans gestionan cuotas. La integración proxy no introduce caché."
  },
  {
    id: "saa-693",
    dominio: 3,
    tema: "Placement Groups",
    tipo: "multiple",
    enunciado: "Estás optimizando la red de un clúster de cómputo de alto rendimiento (HPC) en EC2. ¿Cuáles afirmaciones sobre placement groups y aceleración de red entre nodos son CORRECTAS? (Elegí dos.)",
    opciones: [
      "Un cluster placement group minimiza la latencia entre instancias para cargas tightly coupled",
      "Elastic Fabric Adapter (EFA) acelera la comunicación entre nodos MPI mediante OS-bypass",
      "Un spread placement group ofrece la menor latencia de red entre instancias para HPC",
      "EFA mejora principalmente el rendimiento de la E/S de disco local, no la red entre nodos",
      "Distribuir las instancias en varias AZ reduce la latencia de comunicación entre nodos"
    ],
    correctas: [0, 1],
    explicacion: "El cluster placement group agrupa las instancias en una zona de baja latencia para cargas acopladas, y EFA acelera la comunicación entre nodos MPI con OS-bypass. El spread placement maximiza el aislamiento, no la baja latencia. EFA acelera la red entre nodos, no la E/S de disco. Distribuir en varias AZ aumenta la latencia."
  },
  {
    id: "saa-694",
    dominio: 3,
    tema: "EFA",
    tipo: "single",
    enunciado: "Un clúster de simulación HPC con MPI necesita comunicación entre nodos con latencia ultra baja y bypass del sistema operativo para escalar a miles de núcleos. ¿Qué tecnología de red de AWS debe configurarse en las instancias EC2?",
    opciones: [
      "Elastic Network Adapter (ENA) estándar en cada instancia",
      "Elastic Fabric Adapter (EFA) para comunicaciones de baja latencia con OS-bypass",
      "Múltiples interfaces ENI agrupadas con link aggregation",
      "AWS PrivateLink entre las instancias del clúster"
    ],
    correctas: [1],
    explicacion: "EFA proporciona OS-bypass mediante la interfaz libfabric, reduciendo la latencia de comunicación entre nodos y permitiendo que aplicaciones MPI/HPC escalen a miles de núcleos. ENA estándar no ofrece OS-bypass. Agregar ENIs no reduce la latencia de MPI. PrivateLink expone servicios, no acelera comunicación HPC entre nodos."
  },
  {
    id: "saa-695",
    dominio: 3,
    tema: "EFS",
    tipo: "single",
    enunciado: "Una flota de instancias EC2 comparte un sistema de archivos Amazon EFS. Una aplicación genera ráfagas de E/S muy altas de forma sostenida y empieza a agotar los créditos de burst del modo Bursting Throughput, provocando caídas de rendimiento. ¿Qué cambio garantiza throughput alto y predecible independientemente del tamaño del sistema de archivos?",
    opciones: [
      "Cambiar al modo de rendimiento Max I/O manteniendo Bursting Throughput",
      "Configurar el modo de throughput Elastic o Provisioned Throughput",
      "Migrar el sistema de archivos a la clase de almacenamiento Infrequent Access",
      "Aumentar el número de instancias EC2 que montan el sistema de archivos"
    ],
    correctas: [1],
    explicacion: "Provisioned (o Elastic) Throughput desacopla el throughput del tamaño del sistema de archivos, entregando rendimiento alto y predecible sin depender de créditos de burst. Max I/O escala IOPS pero aumenta latencia por operación y no resuelve el agotamiento de créditos. IA cambia el costo/almacenamiento, no el throughput. Más instancias no aumenta el throughput agregado del FS."
  },
  {
    id: "saa-696",
    dominio: 3,
    tema: "Cómputo",
    tipo: "multiple",
    enunciado: "Estás eligiendo cómputo más performante o eficiente para distintos perfiles de carga en EC2. ¿Cuáles afirmaciones son CORRECTAS? (Elegí dos.)",
    opciones: [
      "Las instancias AWS Graviton (ARM) ofrecen mejor relación precio-rendimiento para cargas compatibles con ARM",
      "Las cargas en memoria (in-memory) se benefician más de instancias memory optimized que de compute optimized",
      "Las instancias compute optimized son la mejor opción para bases de datos en memoria de gran tamaño",
      "Aumentar el tamaño de una instancia siempre reduce la latencia de red entre nodos sin placement group",
      "Reservar capacidad con Savings Plans mejora el rendimiento por núcleo de las instancias x86"
    ],
    correctas: [0, 1],
    explicacion: "Graviton mejora la relación precio-rendimiento en cargas ARM, y las cargas in-memory requieren instancias memory optimized. Las compute optimized priorizan CPU, no memoria. El tamaño puede subir el ancho de banda pero la baja latencia entre nodos se logra con cluster placement group. Los Savings Plans reducen el precio, no el rendimiento por núcleo."
  },
  {
    id: "saa-697",
    dominio: 3,
    tema: "SQS",
    tipo: "single",
    enunciado: "Un sistema procesa trabajos mediante una cola SQS consumida por un Auto Scaling Group de EC2. Durante las cargas masivas, la profundidad de la cola crece rápido y los trabajos se acumulan porque el ASG escala por CPU, que no refleja el backlog. ¿Cuál es el enfoque MÁS efectivo para escalar el procesamiento?",
    opciones: [
      "Escalar el ASG con una política de target tracking sobre el backlog por instancia",
      "Aumentar el visibility timeout de la cola para reprocesar menos mensajes",
      "Convertir la cola estándar en una cola FIFO para ordenar el procesamiento",
      "Migrar el consumo a una sola instancia EC2 de mayor tamaño"
    ],
    correctas: [0],
    explicacion: "Escalar según una métrica personalizada de backlog por instancia (ApproximateNumberOfMessages dividido por la capacidad de cada instancia) ajusta el ASG a la profundidad real de la cola, procesando los picos. La CPU no refleja el backlog. Cambiar el visibility timeout o a FIFO no aumenta la capacidad de procesamiento. Una sola instancia grande limita el paralelismo."
  },
  {
    id: "saa-698",
    dominio: 3,
    tema: "Athena",
    tipo: "single",
    enunciado: "Un equipo consulta logs en S3 con Amazon Athena. Las consultas son lentas y costosas porque escanean grandes volúmenes de archivos JSON sin comprimir. Quieren reducir el tiempo de consulta y el costo (que se cobra por datos escaneados). ¿Qué optimización tiene el MAYOR impacto?",
    opciones: [
      "Convertir los datos a formato columnar comprimido (Parquet) y particionarlos",
      "Aumentar el límite de concurrencia de consultas en el workgroup de Athena",
      "Mover los archivos JSON a la clase de almacenamiento S3 Intelligent-Tiering",
      "Habilitar el cifrado del lado del servidor en el bucket de origen"
    ],
    correctas: [0],
    explicacion: "Parquet es columnar y comprimido, por lo que Athena lee solo las columnas necesarias y menos bytes; el particionado permite descartar particiones (partition pruning), reduciendo drásticamente datos escaneados, costo y latencia. La concurrencia no reduce el escaneo por consulta. Cambiar la clase de almacenamiento o el cifrado no afecta el volumen escaneado."
  },
  {
    id: "saa-699",
    dominio: 3,
    tema: "CloudFront",
    tipo: "single",
    enunciado: "Un sitio necesita ejecutar lógica ligera de manipulación de cabeceras HTTP y reescritura de URL en cada solicitud, con la mínima latencia y el menor costo, escalando a millones de peticiones por segundo. La lógica es simple y no requiere acceso a la red ni librerías pesadas. ¿Qué opción es la MÁS adecuada?",
    opciones: [
      "Lambda@Edge en el evento origin-request con un runtime de Node.js",
      "CloudFront Functions en los eventos viewer-request/viewer-response",
      "Una función Lambda regional invocada desde el origen ALB",
      "Una capa de instancias EC2 actuando como proxy inverso"
    ],
    correctas: [1],
    explicacion: "CloudFront Functions ejecuta JavaScript ligero en las ubicaciones de borde con latencia sub-milisegundo, escala a millones de RPS y cuesta menos, ideal para manipulación de cabeceras y reescrituras simples. Lambda@Edge es más potente pero con mayor latencia y costo, justificado solo si se necesita más cómputo o acceso a red. Lambda regional o EC2 añaden saltos y latencia."
  },
  {
    id: "saa-700",
    dominio: 3,
    tema: "DynamoDB",
    tipo: "single",
    enunciado: "Una tabla DynamoDB que registra eventos por dispositivo usa el ID de dispositivo como clave de partición. Unos pocos dispositivos muy activos concentran la mayoría de las escrituras, generando una partición caliente (hot partition) y throttling pese a tener capacidad suficiente en total. ¿Qué técnica resuelve MEJOR el desbalance de escritura?",
    opciones: [
      "Aplicar write sharding añadiendo un sufijo aleatorio a la clave de partición",
      "Crear un índice secundario local (LSI) sobre la marca de tiempo",
      "Cambiar la tabla a modo de capacidad on-demand para evitar throttling",
      "Aumentar la capacidad de escritura aprovisionada (WCU) de toda la tabla"
    ],
    correctas: [0],
    explicacion: "El write sharding agrega un sufijo (por ejemplo aleatorio o calculado) a la clave de partición para distribuir las escrituras de los dispositivos calientes entre múltiples particiones físicas, eliminando la hot partition. Un LSI no redistribuye la clave de partición. On-demand y subir WCU no resuelven un keyspace mal distribuido; el adaptive capacity ayuda pero un sufijo es la técnica directa de diseño."
  },
  {
    id: "saa-701",
    dominio: 3,
    tema: "Aurora Global",
    tipo: "single",
    enunciado: "Una aplicación global tiene usuarios en Norteamérica y Asia. Los usuarios en Asia experimentan latencia alta en las lecturas porque todo el tráfico va a la región primaria de Aurora en us-east-1. Necesitan lecturas locales de baja latencia en Asia con replicación con retardo típicamente inferior a un segundo. ¿Qué solución es la MÁS adecuada?",
    opciones: [
      "Configurar Amazon Aurora Global Database con una región secundaria en Asia",
      "Crear réplicas de lectura de Aurora dentro de la misma región us-east-1",
      "Habilitar el caché de DynamoDB Accelerator (DAX) frente a la base de datos",
      "Usar Route 53 con enrutamiento por geolocalización hacia us-east-1"
    ],
    correctas: [0],
    explicacion: "Aurora Global Database replica los datos a regiones secundarias con latencia típica de réplica menor a un segundo, permitiendo lecturas locales de baja latencia en Asia. Réplicas en la misma región no reducen la latencia transpacífica. DAX es para DynamoDB. Route 53 por geolocalización dirige el tráfico pero seguiría apuntando a la única región us-east-1."
  },
  {
    id: "saa-702",
    dominio: 3,
    tema: "FSx for NetApp ONTAP",
    tipo: "single",
    enunciado: "Una empresa migra una aplicación on-premises que requiere un sistema de archivos compartido multiprotocolo (NFS y SMB) con snapshots, deduplicación y compresión, además de rendimiento alto. Quiere una solución gestionada en AWS con cambios mínimos en la aplicación. ¿Qué servicio elige?",
    opciones: [
      "Amazon FSx for NetApp ONTAP",
      "Amazon EFS con puntos de acceso por aplicación",
      "Amazon FSx for Windows File Server únicamente",
      "Amazon S3 con un File Gateway multiprotocolo"
    ],
    correctas: [0],
    explicacion: "FSx for NetApp ONTAP ofrece acceso multiprotocolo NFS y SMB, snapshots, deduplicación, compresión y alto rendimiento como servicio gestionado, ideal para migrar cargas ONTAP existentes. EFS es solo NFS. FSx for Windows es solo SMB. S3 con File Gateway no es un sistema de archivos POSIX/SMB de alto rendimiento equivalente."
  },
  {
    id: "saa-703",
    dominio: 3,
    tema: "Instance Store",
    tipo: "single",
    enunciado: "Una base de datos NoSQL distribuida con su propia replicación necesita el almacenamiento local de menor latencia y máximo IOPS posible para sus archivos temporales y de caché, tolerando que los datos sean efímeros. ¿Qué opción de almacenamiento es la MÁS performante?",
    opciones: [
      "Volúmenes io2 Block Express conectados por red a las instancias",
      "Instance Store NVMe local de instancias optimizadas para almacenamiento",
      "Amazon EFS montado con throughput aprovisionado",
      "Volúmenes gp3 en configuración RAID 1 para redundancia"
    ],
    correctas: [1],
    explicacion: "El Instance Store NVMe está físicamente conectado al host, ofreciendo la menor latencia y el mayor IOPS, perfecto para datos efímeros como cachés y temporales cuando la aplicación ya replica los datos. io2 es excelente pero es almacenamiento de red (algo más de latencia). EFS añade latencia de red. gp3 en RAID 1 prioriza redundancia, no la latencia mínima local."
  },
  {
    id: "saa-704",
    dominio: 3,
    tema: "Route 53",
    tipo: "single",
    enunciado: "Una aplicación está desplegada en cuatro regiones. Se desea dirigir a cada usuario al endpoint regional que le ofrezca la menor latencia de red, con failover automático si una región falla. La aplicación es HTTP/S estándar y no requiere IPs estáticas. ¿Qué configuración de DNS es la MÁS adecuada?",
    opciones: [
      "Política de enrutamiento por geolocalización en Route 53",
      "Política de enrutamiento por latencia en Route 53 con health checks",
      "Política de enrutamiento ponderado distribuyendo 25% a cada región",
      "Política de enrutamiento simple con todos los registros A"
    ],
    correctas: [1],
    explicacion: "El enrutamiento por latencia de Route 53 dirige a cada usuario a la región con menor latencia medida, y los health checks permiten failover automático al sacar registros no saludables. La geolocalización enruta por ubicación geográfica, no por latencia real. El ponderado reparte por porcentajes fijos. El simple no considera latencia ni salud."
  },
  {
    id: "saa-705",
    dominio: 3,
    tema: "OpenSearch",
    tipo: "multiple",
    enunciado: "Una plataforma de observabilidad sobre Amazon OpenSearch Service busca acelerar las consultas sobre datos recientes y reducir costo en datos fríos durante picos de ingesta. ¿Cuáles afirmaciones de diseño son CORRECTAS? (Elegí dos.)",
    opciones: [
      "Usar nodos de datos hot para datos recientes y UltraWarm/Cold para datos antiguos optimiza rendimiento y costo",
      "Mantener nodos maestros dedicados mejora la estabilidad del clúster y la fiabilidad de las consultas",
      "Aumentar las réplicas de cada índice a cinco acelera la velocidad de ingesta de datos",
      "Consolidar todos los datos en un único shard primario muy grande maximiza el paralelismo de consulta",
      "Desactivar los nodos maestros dedicados libera cómputo y mejora el rendimiento de las consultas"
    ],
    correctas: [0, 1],
    explicacion: "La arquitectura hot-warm-cold acelera consultas recientes y abarata datos fríos, y los nodos maestros dedicados mejoran la estabilidad. Subir réplicas a cinco encarece y ralentiza la ingesta. Un único shard gigante limita el paralelismo. Quitar los maestros dedicados perjudica la estabilidad del clúster."
  },
  {
    id: "saa-706",
    dominio: 3,
    tema: "Redshift Spectrum",
    tipo: "single",
    enunciado: "Un equipo de analítica tiene datos calientes en Amazon Redshift y un historial enorme en S3 en formato Parquet. Necesitan ejecutar consultas que combinen ambos conjuntos sin cargar todo el historial en el clúster, manteniendo buen rendimiento. ¿Qué característica usar?",
    opciones: [
      "Redshift Spectrum para consultar el Parquet en S3 desde Redshift",
      "Cargar todo el historial de S3 en tablas locales del clúster",
      "Migrar las consultas a Amazon Athena ejecutándolas por separado",
      "Configurar AWS Glue para copiar S3 a Redshift cada hora"
    ],
    correctas: [0],
    explicacion: "Redshift Spectrum permite consultar directamente datos en S3 (por ejemplo Parquet) y unirlos con tablas locales de Redshift sin ingerir el historial al clúster, manteniendo rendimiento y escalando el cómputo de Spectrum por separado. Cargar todo a tablas locales es costoso y no escalable. Athena separado pierde la unión con tablas de Redshift. Copiar cada hora duplica datos y latencia."
  },
  {
    id: "saa-707",
    dominio: 3,
    tema: "Kinesis Firehose",
    tipo: "single",
    enunciado: "Una empresa necesita ingerir logs en streaming y entregarlos a Amazon S3 en formato Parquet, con buffering, compresión y transformación, sin administrar servidores ni gestionar shards manualmente. La latencia de minutos es aceptable. ¿Qué servicio es el MÁS adecuado?",
    opciones: [
      "Amazon Kinesis Data Streams con consumidores Lambda personalizados",
      "Amazon Kinesis Data Firehose con conversión de formato a Parquet",
      "Amazon MSK (Managed Streaming for Apache Kafka) con conectores",
      "Amazon SQS con un consumidor que escriba lotes en S3"
    ],
    correctas: [1],
    explicacion: "Kinesis Data Firehose es totalmente gestionado, sin shards, con buffering, compresión, transformación vía Lambda y conversión nativa a Parquet/ORC antes de entregar a S3, ideal cuando bastan latencias de minutos. Data Streams requiere gestionar shards y construir el consumidor. MSK exige operar el clúster/conectores. SQS no hace buffering ni conversión de formato nativa."
  },
  {
    id: "saa-708",
    dominio: 3,
    tema: "EBS Multi-Attach",
    tipo: "single",
    enunciado: "Una aplicación de clustering necesita que un mismo volumen de bloques sea accedido concurrentemente por varias instancias EC2 en la misma zona de disponibilidad con alto IOPS, usando un sistema de archivos consciente de clúster. ¿Qué configuración de almacenamiento lo permite?",
    opciones: [
      "Un volumen io2 con EBS Multi-Attach habilitado entre las instancias",
      "Un volumen gp3 montado por turnos en una instancia a la vez",
      "Amazon EFS, que es de bloques y soporta acceso concurrente",
      "Réplicas de un volumen gp2 sincronizadas manualmente entre instancias"
    ],
    correctas: [0],
    explicacion: "EBS Multi-Attach permite que un volumen io1/io2 se adjunte a varias instancias EC2 en la misma AZ simultáneamente con alto IOPS, siempre que se use un sistema de archivos consciente de clúster. gp3 no soporta Multi-Attach. EFS es de archivos (NFS), no de bloques. Sincronizar réplicas manualmente no ofrece acceso concurrente real al mismo bloque."
  },
  {
    id: "saa-709",
    dominio: 3,
    tema: "ElastiCache",
    tipo: "multiple",
    enunciado: "Estás diseñando una capa de caché con ElastiCache for Redis para una aplicación con lecturas muy intensivas, cuyo dataset cabe en un nodo, pero que necesita alta disponibilidad y escalado de lecturas. ¿Cuáles afirmaciones son CORRECTAS? (Elegí dos.)",
    opciones: [
      "Agregar réplicas de lectura a un grupo de replicación escala el throughput de lectura",
      "Multi-AZ con failover automático mejora la disponibilidad al promover una réplica si falla el primario",
      "Las réplicas de lectura de Redis aumentan el throughput de escritura del primario",
      "Cluster Mode es obligatorio incluso cuando el dataset cabe en un solo nodo",
      "Memcached ofrece replicación y failover automático equivalentes a Redis"
    ],
    correctas: [0, 1],
    explicacion: "Las réplicas de lectura escalan las lecturas y Multi-AZ con failover automático mejora la disponibilidad promoviendo una réplica. Las réplicas no aumentan el throughput de escritura del primario. Cluster Mode no es obligatorio si el dataset cabe en un nodo. Memcached no ofrece replicación ni failover automático como Redis."
  },
  {
    id: "saa-710",
    dominio: 3,
    tema: "Fargate",
    tipo: "single",
    enunciado: "Un equipo ejecuta contenedores con cargas variables e impredecibles y quiere eliminar la gestión de servidores y el ajuste de capacidad del clúster, pagando solo por los recursos que consumen las tareas, manteniendo buen rendimiento al escalar. ¿Qué opción de cómputo es la MÁS adecuada?",
    opciones: [
      "Ejecutar los contenedores en ECS sobre AWS Fargate",
      "Ejecutar los contenedores en ECS sobre un ASG de instancias EC2 autoadministrado",
      "Desplegar los contenedores en una sola instancia EC2 grande",
      "Empaquetar los contenedores en AMIs y lanzarlos con EC2 spot manual"
    ],
    correctas: [0],
    explicacion: "Fargate es cómputo serverless para contenedores: no hay servidores que administrar ni capacidad de clúster que ajustar, y se paga por la vCPU/memoria de cada tarea, escalando según la demanda. Un ASG de EC2 con ECS requiere gestionar la capacidad del clúster. Una sola instancia limita el escalado. Gestionar AMIs y spot manual añade operación significativa."
  },
  {
    id: "saa-711",
    dominio: 3,
    tema: "CloudFront",
    tipo: "single",
    enunciado: "Una aplicación sirve contenido dinámico personalizado por usuario a través de CloudFront. La tasa de aciertos de caché (cache hit ratio) es muy baja porque la política de caché incluye cabeceras y cookies que varían por usuario y no afectan la respuesta. ¿Qué ajuste mejora MEJOR la tasa de aciertos?",
    opciones: [
      "Configurar una cache policy que solo incluya en la clave de caché las cabeceras/cookies relevantes",
      "Reenviar todas las cabeceras, cookies y query strings al origen siempre",
      "Reducir el TTL por defecto a cero para revalidar cada solicitud",
      "Deshabilitar la compresión automática de objetos en CloudFront"
    ],
    correctas: [0],
    explicacion: "Una cache policy que limita la clave de caché solo a los elementos que realmente afectan la respuesta hace que más solicitudes coincidan con objetos cacheados, elevando el cache hit ratio. Reenviar todo fragmenta la caché y baja los aciertos. TTL cero elimina la caché. Desactivar la compresión no mejora los aciertos."
  },
  {
    id: "saa-712",
    dominio: 3,
    tema: "Lambda",
    tipo: "single",
    enunciado: "Una función Lambda con uso intensivo de CPU procesa imágenes y tarda más de lo deseado. El equipo nota que la función está asignada con poca memoria. ¿Qué ajuste tiene el efecto MÁS directo para acelerar la ejecución en una función CPU-bound?",
    opciones: [
      "Aumentar la asignación de memoria, lo que incrementa proporcionalmente la CPU disponible",
      "Aumentar el timeout de la función para permitir ejecuciones más largas",
      "Activar Provisioned Concurrency para evitar arranques en frío",
      "Reducir el tamaño del paquete de despliegue de la función"
    ],
    correctas: [0],
    explicacion: "En Lambda la potencia de CPU (y red) se asigna de forma proporcional a la memoria configurada; aumentar la memoria entrega más vCPU y acelera funciones CPU-bound. Subir el timeout solo permite correr más tiempo, no más rápido. Provisioned Concurrency ataca cold starts, no la velocidad de cómputo. Reducir el paquete afecta arranque, no la ejecución intensiva."
  },
  {
    id: "saa-713",
    dominio: 3,
    tema: "DynamoDB Global Tables",
    tipo: "single",
    enunciado: "Una aplicación con usuarios en múltiples continentes usa DynamoDB y necesita lecturas y escrituras de baja latencia en varias regiones a la vez, con replicación activa-activa gestionada. ¿Qué solución cumple los requisitos con el MEJOR rendimiento?",
    opciones: [
      "Habilitar DynamoDB Global Tables con réplicas en las regiones de los usuarios",
      "Crear una tabla en una región y exponerla globalmente vía API Gateway",
      "Usar DAX multirregión frente a una única tabla regional",
      "Replicar manualmente con DynamoDB Streams hacia tablas en cada región"
    ],
    correctas: [0],
    explicacion: "Global Tables ofrece replicación activa-activa multirregión totalmente gestionada, dando lecturas y escrituras locales de baja latencia en cada región. Exponer una tabla regional vía API Gateway no reduce la latencia de la base subyacente. DAX es caché regional, no replicación multirregión de escritura. Replicar manualmente con Streams es complejo y propenso a errores frente a Global Tables."
  },
  {
    id: "saa-714",
    dominio: 3,
    tema: "Networking",
    tipo: "single",
    enunciado: "Dos flotas de EC2 dentro de la misma VPC transfieren grandes volúmenes de datos entre sí y el throughput de red parece limitado por el tamaño de paquete. El arquitecto quiere maximizar el throughput reduciendo la sobrecarga por paquete. ¿Qué configuración debe aplicar?",
    opciones: [
      "Habilitar jumbo frames (MTU 9001) entre las instancias dentro de la VPC",
      "Reducir el MTU a 1500 para mayor compatibilidad con Internet",
      "Activar el reenvío de origen/destino en las interfaces de red",
      "Colocar las instancias en un spread placement group separado"
    ],
    correctas: [0],
    explicacion: "Los jumbo frames (MTU 9001) permiten enviar más datos por paquete dentro de la VPC, reduciendo la sobrecarga por encabezados y aumentando el throughput en transferencias internas. Bajar a MTU 1500 es para tráfico que sale a Internet y reduce eficiencia interna. El source/dest check es de enrutamiento. Spread placement maximiza aislamiento, no throughput entre las instancias."
  },
  {
    id: "saa-715",
    dominio: 3,
    tema: "EMR",
    tipo: "single",
    enunciado: "Un trabajo de procesamiento Spark sobre grandes volúmenes de datos en S3 necesita escalar el cómputo de forma elástica y reducir costo aprovechando capacidad spot, manteniendo el rendimiento para cargas batch tolerantes a interrupciones. ¿Qué configuración de Amazon EMR es la MÁS adecuada?",
    opciones: [
      "Un clúster EMR con nodos core On-Demand y nodos task en instancias Spot con managed scaling",
      "Un clúster EMR de un solo nodo maestro sin nodos task",
      "Ejecutar Spark en una única instancia EC2 de gran tamaño",
      "Un clúster EMR con todos los nodos, incluido HDFS, en instancias Spot"
    ],
    correctas: [0],
    explicacion: "Usar nodos core On-Demand (que mantienen HDFS estable) y nodos task en Spot con EMR managed scaling escala elásticamente el cómputo y reduce costo, tolerando interrupciones en las tareas batch. Un solo nodo no escala. Una única EC2 no aprovecha el procesamiento distribuido. Poner todo, incluido HDFS, en Spot arriesga la pérdida de datos si los nodos core se interrumpen."
  },
  {
    id: "saa-716",
    dominio: 3,
    tema: "Storage RAID",
    tipo: "single",
    enunciado: "Una aplicación legacy necesita un único volumen lógico con más IOPS y throughput de los que ofrece un solo volumen EBS, sin requerir redundancia adicional (la durabilidad la maneja la replicación de la aplicación). ¿Qué técnica permite agregar el rendimiento de varios volúmenes EBS?",
    opciones: [
      "Combinar varios volúmenes EBS en RAID 0 (striping) a nivel de SO",
      "Combinar varios volúmenes EBS en RAID 1 (mirroring) a nivel de SO",
      "Adjuntar un único volumen sc1 de mayor tamaño a la instancia",
      "Usar Instance Store sin agrupar y dejar que el SO balancee la carga"
    ],
    correctas: [0],
    explicacion: "RAID 0 distribuye (striping) las E/S entre varios volúmenes EBS, sumando IOPS y throughput en un único volumen lógico, adecuado cuando la durabilidad la gestiona la aplicación. RAID 1 duplica datos para redundancia y no aumenta el rendimiento de escritura. Un sc1 grande es HDD de bajo rendimiento. Instance Store sin agrupar no crea un volumen lógico único de mayor rendimiento."
  },
  {
    id: "saa-717",
    dominio: 3,
    tema: "MSK",
    tipo: "single",
    enunciado: "Una organización tiene aplicaciones existentes que usan APIs de Apache Kafka y quiere un servicio gestionado que evite operar brokers, ZooKeeper y parches, manteniendo alto throughput y compatibilidad total con Kafka sin reescribir los productores/consumidores. ¿Qué servicio es el MÁS adecuado?",
    opciones: [
      "Amazon MSK (Managed Streaming for Apache Kafka)",
      "Amazon Kinesis Data Streams con la SDK de Kinesis",
      "Amazon SQS con colas FIFO de alto throughput",
      "Amazon SNS con suscripciones por fan-out"
    ],
    correctas: [0],
    explicacion: "Amazon MSK ejecuta Apache Kafka gestionado (brokers, control plane, parches) manteniendo compatibilidad total con la API de Kafka, por lo que las aplicaciones existentes funcionan sin reescritura. Kinesis Data Streams no es compatible con la API de Kafka. SQS y SNS son servicios de mensajería distintos, sin la semántica de log particionado de Kafka."
  },
  {
    id: "saa-718",
    dominio: 3,
    tema: "Aurora Serverless",
    tipo: "single",
    enunciado: "Una aplicación interna tiene una carga de base de datos muy variable e intermitente, con largos periodos de inactividad y picos repentinos. El equipo quiere que la capacidad escale automáticamente y de forma fina según la demanda sin gestionar instancias, manteniendo buen rendimiento durante los picos. ¿Qué opción es la MÁS adecuada?",
    opciones: [
      "Amazon Aurora Serverless v2 con escalado automático de capacidad (ACU)",
      "Amazon RDS con una instancia de tamaño fijo dimensionada al pico",
      "Amazon Aurora aprovisionado con una réplica de lectura siempre activa",
      "Amazon DynamoDB en modo aprovisionado con autoscaling de RCU/WCU"
    ],
    correctas: [0],
    explicacion: "Aurora Serverless v2 escala la capacidad de cómputo de forma fina y casi instantánea (en incrementos de ACU) según la carga, ideal para cargas variables e intermitentes sin gestionar instancias. Una instancia RDS fija al pico desperdicia recursos en inactividad. Aurora aprovisionado con réplica siempre activa no escala a cero ni de forma tan fina. DynamoDB es NoSQL, distinto modelo de datos."
  },
  {
    id: "saa-719",
    dominio: 3,
    tema: "Global Accelerator vs CloudFront",
    tipo: "single",
    enunciado: "Una empresa expone una API HTTP no cacheable (todas las respuestas son dinámicas y personalizadas) a usuarios globales y busca reducir la latencia de Internet hacia su backend en una sola región. El contenido no se puede cachear. ¿Qué servicio acelera MEJOR este tráfico dinámico?",
    opciones: [
      "AWS Global Accelerator para enrutar por la red troncal de AWS hacia el backend",
      "Amazon CloudFront con TTL cero para todo el contenido dinámico",
      "Route 53 con enrutamiento simple hacia la única región",
      "Una VPN site-to-site entre los usuarios y la VPC del backend"
    ],
    correctas: [0],
    explicacion: "Global Accelerator mejora el rendimiento del tráfico dinámico no cacheable enrutándolo desde el edge por la red troncal privada de AWS hasta el backend, reduciendo la latencia y el jitter de Internet. CloudFront con TTL cero no cachea y aporta menos para tráfico totalmente dinámico orientado a un único origen. Route 53 simple no acelera. Una VPN no aplica a usuarios globales en Internet."
  },
  {
    id: "saa-720",
    dominio: 3,
    tema: "Read Replicas Cross-Region",
    tipo: "single",
    enunciado: "Una aplicación de informes en Europa consulta una base de datos RDS for PostgreSQL cuya instancia primaria está en Estados Unidos, sufriendo latencia de lectura alta. Las escrituras siguen ocurriendo en EE. UU. y los informes toleran un pequeño retardo de replicación. ¿Qué solución reduce MEJOR la latencia de lectura en Europa?",
    opciones: [
      "Crear una réplica de lectura cross-region de RDS en una región europea",
      "Habilitar Multi-AZ para colocar la réplica en espera en Europa",
      "Aumentar la clase de instancia de la primaria en EE. UU.",
      "Activar Performance Insights para diagnosticar las consultas lentas"
    ],
    correctas: [0],
    explicacion: "Una réplica de lectura cross-region en Europa coloca una copia local de los datos cerca de los usuarios de informes, reduciendo la latencia de lectura y tolerando el pequeño retardo de replicación, mientras las escrituras permanecen en la primaria de EE. UU. Multi-AZ ubica la espera en la misma región y no sirve lecturas en RDS. Agrandar la primaria no reduce la latencia transatlántica. Performance Insights solo diagnostica."
  }
]);
