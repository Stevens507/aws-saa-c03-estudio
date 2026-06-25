window.BANCO = (window.BANCO || []).concat([
  {
    id: "saa-361",
    dominio: 3,
    tema: "CloudFront",
    tipo: "single",
    enunciado: "Una empresa sirve una API dinámica detrás de CloudFront. Las respuestas varían según un encabezado 'Authorization' y un parámetro de query 'region', pero hoy la tasa de aciertos de caché es muy baja porque la configuración legacy reenvía todos los encabezados y cookies al origen. El equipo quiere maximizar el cache hit ratio sin perder la diferenciación necesaria. ¿Qué acción es la MÁS performante?",
    opciones: [
      "Crear una cache policy que incluya en la clave de caché solo el encabezado 'Authorization' y el parámetro 'region', y excluir el resto de encabezados, cookies y query strings.",
      "Reenviar todos los encabezados al origen mediante una origin request policy para asegurar coherencia.",
      "Desactivar la caché por completo y usar solo Lambda@Edge para generar respuestas.",
      "Configurar un TTL mínimo de 0 segundos para todos los objetos."
    ],
    correctas: [0],
    explicacion: "Una cache policy con clave mínima (solo 'Authorization' y 'region') reduce la cardinalidad de la clave de caché y eleva el hit ratio. Reenviar todo al origen mantiene la baja tasa de aciertos. Desactivar la caché o TTL 0 elimina el beneficio del CDN."
  },
  {
    id: "saa-362",
    dominio: 3,
    tema: "Lambda@Edge",
    tipo: "single",
    enunciado: "Un sitio necesita reescribir URLs sencillas (por ejemplo, agregar un sufijo 'index.html' a rutas tipo carpeta) en cada solicitud del viewer, con la menor latencia y el menor costo posible, sin acceso a la red ni a bibliotecas externas. ¿Qué solución elige?",
    opciones: [
      "CloudFront Functions en el evento viewer request.",
      "Lambda@Edge en el evento origin response.",
      "Una función Lambda regional invocada por API Gateway.",
      "Un balanceador ALB con reglas de redirección."
    ],
    correctas: [0],
    explicacion: "CloudFront Functions es ideal para manipulaciones ligeras de encabezados/URL en viewer request: corre en cientos de POPs con latencia submilisegundo y costo muy bajo. Lambda@Edge es más pesado y caro para esta tarea simple; ALB y Lambda regional no operan en el edge."
  },
  {
    id: "saa-363",
    dominio: 3,
    tema: "Origin Shield",
    tipo: "single",
    enunciado: "Un origen de S3 recibe ráfagas de solicitudes desde múltiples regiones edge de CloudFront, generando muchos fetches redundantes al origen durante eventos virales. Se desea reducir la carga sobre el origen y mejorar el hit ratio agregando una capa de caché centralizada. ¿Qué función habilita?",
    opciones: [
      "Origin Shield en la región más cercana al origen.",
      "S3 Transfer Acceleration en el bucket.",
      "Una segunda distribución de CloudFront en cascada.",
      "Aumentar el TTL máximo a 1 año."
    ],
    correctas: [0],
    explicacion: "Origin Shield añade una capa de caché regional centralizada entre los POPs y el origen, consolidando solicitudes y reduciendo fetches redundantes. Transfer Acceleration acelera subidas a S3, no reduce carga de lectura del origen. Una segunda distribución no consolida; subir el TTL no resuelve la concurrencia de misses."
  },
  {
    id: "saa-364",
    dominio: 3,
    tema: "Global Accelerator",
    tipo: "single",
    enunciado: "Una aplicación de juego en tiempo real usa tráfico TCP/UDP de baja latencia hacia endpoints en tres regiones. Los usuarios globales sufren latencia variable por el ruteo por Internet público. Se necesita IP estática anycast y conmutación rápida entre regiones. ¿Qué servicio es el MÁS adecuado?",
    opciones: [
      "AWS Global Accelerator.",
      "Amazon CloudFront con orígenes en cada región.",
      "Route 53 con política de geolocalización.",
      "S3 Transfer Acceleration."
    ],
    correctas: [0],
    explicacion: "Global Accelerator provee IPs anycast estáticas, usa la red troncal de AWS para tráfico TCP/UDP no HTTP y conmuta rápidamente por health checks. CloudFront es para HTTP/contenido cacheable. Route 53 depende de TTL de DNS para failover. Transfer Acceleration es solo para S3."
  },
  {
    id: "saa-365",
    dominio: 3,
    tema: "ElastiCache Redis",
    tipo: "single",
    enunciado: "Un dataset de sesiones supera la memoria de un solo nodo y debe distribuirse horizontalmente con sharding, manteniendo alta disponibilidad por shard. La aplicación usa un cliente compatible. ¿Qué configuración de ElastiCache for Redis elige?",
    opciones: [
      "Redis en modo cluster (cluster mode enabled) con varios shards y réplicas por shard.",
      "Redis cluster mode disabled con un único nodo primario grande.",
      "Memcached con auto discovery.",
      "Redis con una sola réplica de lectura y sin sharding."
    ],
    correctas: [0],
    explicacion: "Cluster mode enabled particiona el keyspace en múltiples shards (hasta 500), permitiendo escalar más allá de un nodo y mantener réplicas por shard para HA. Cluster mode disabled no shardea escrituras. Memcached no ofrece réplicas/persistencia. Una sola réplica no resuelve el límite de memoria."
  },
  {
    id: "saa-366",
    dominio: 3,
    tema: "ElastiCache Patrones",
    tipo: "single",
    enunciado: "Un servicio lee con frecuencia datos que cambian poco y tolera servir datos ligeramente desactualizados tras una escritura. El equipo quiere minimizar el llenado de la caché con datos que quizá nunca se lean y reducir el costo de memoria. ¿Qué estrategia de caché aplica?",
    opciones: [
      "Lazy loading (cache-aside): cargar en caché solo cuando hay un miss de lectura.",
      "Write-through: escribir en la caché en cada escritura a la base.",
      "Deshabilitar TTL para mantener todo en caché permanentemente.",
      "Precargar toda la base de datos en la caché al inicio."
    ],
    correctas: [0],
    explicacion: "Lazy loading solo carga los datos efectivamente solicitados, minimizando memoria desperdiciada y costo. Write-through llena la caché con datos que pueden no leerse nunca. Sin TTL crece la memoria sin control; precargar toda la base es ineficiente y caro."
  },
  {
    id: "saa-367",
    dominio: 3,
    tema: "DynamoDB DAX",
    tipo: "single",
    enunciado: "Una tabla DynamoDB sirve un patrón de lectura intensivo de elementos calientes con requisitos de latencia de microsegundos. La aplicación usa el SDK de DynamoDB y la consistencia eventual es aceptable para las lecturas. ¿Qué agrega para acelerar las lecturas con cambios mínimos de código?",
    opciones: [
      "Amazon DynamoDB Accelerator (DAX) como caché en memoria gestionada.",
      "ElastiCache for Redis con invalidación manual.",
      "Un índice secundario global adicional.",
      "Aumentar la capacidad de lectura provisionada a un valor muy alto."
    ],
    correctas: [0],
    explicacion: "DAX es una caché en memoria específica de DynamoDB que entrega lecturas en microsegundos con un cliente casi drop-in. Redis requiere lógica de invalidación propia. Un GSI no acelera lecturas de elementos calientes existentes; subir RCU no baja la latencia a microsegundos."
  },
  {
    id: "saa-368",
    dominio: 3,
    tema: "DynamoDB Hot Partition",
    tipo: "single",
    enunciado: "Una tabla DynamoDB usa como clave de partición un valor 'status' con pocos valores posibles (por ejemplo 'ACTIVE'), causando throttling por partición caliente pese a tener capacidad total suficiente. ¿Cuál es la solución MÁS efectiva?",
    opciones: [
      "Rediseñar la clave de partición con un valor de alta cardinalidad o aplicar write sharding agregando un sufijo aleatorio.",
      "Convertir la tabla a modo on-demand y no cambiar el esquema de claves.",
      "Crear un LSI sobre 'status'.",
      "Aumentar el límite de WCU a nivel cuenta."
    ],
    correctas: [0],
    explicacion: "El throttling por hot partition se resuelve aumentando la cardinalidad de la clave o aplicando write sharding (sufijos) para distribuir la carga entre particiones. On-demand no arregla un esquema de claves desbalanceado. Un LSI comparte la misma clave de partición. Subir cuotas de cuenta no redistribuye la partición caliente."
  },
  {
    id: "saa-369",
    dominio: 3,
    tema: "DynamoDB Índices",
    tipo: "single",
    enunciado: "Una aplicación necesita consultar una tabla DynamoDB por un atributo alternativo que no es la clave de partición, con un patrón de acceso global a toda la tabla y su propia capacidad de lectura. La consistencia eventual es aceptable. ¿Qué índice utiliza?",
    opciones: [
      "Un índice secundario global (GSI) con su propia clave y capacidad.",
      "Un índice secundario local (LSI) creado después de la tabla.",
      "Una scan con filtro en cada consulta.",
      "DAX con un TTL corto."
    ],
    correctas: [0],
    explicacion: "Un GSI permite una clave de partición distinta, abarca toda la tabla y tiene capacidad propia con lecturas eventualmente consistentes. Un LSI comparte la clave de partición y solo puede crearse al crear la tabla. Scan con filtro es costoso y lento. DAX cachea, no provee un nuevo patrón de consulta por otro atributo."
  },
  {
    id: "saa-370",
    dominio: 3,
    tema: "DynamoDB Capacidad",
    tipo: "single",
    enunciado: "Una tabla nueva tendrá un tráfico impredecible, con picos repentinos imposibles de pronosticar y períodos de baja actividad. El equipo no quiere gestionar escalado ni arriesgar throttling por mala estimación. ¿Qué modo de capacidad elige?",
    opciones: [
      "On-demand (pago por solicitud).",
      "Provisioned con auto scaling y objetivo del 70 por ciento.",
      "Provisioned con capacidad fija alta.",
      "Provisioned con reserved capacity a un año."
    ],
    correctas: [0],
    explicacion: "On-demand absorbe picos impredecibles sin planificación de capacidad y sin riesgo de throttling por subestimación, pagando por solicitud. Auto scaling reacciona con retardo ante picos súbitos. Capacidad fija alta desperdicia dinero en baja actividad. Reserved capacity requiere previsión de uso."
  },
  {
    id: "saa-371",
    dominio: 3,
    tema: "Aurora vs RDS",
    tipo: "single",
    enunciado: "Una aplicación con muchas lecturas necesita escalar el throughput de lectura con réplicas de muy baja latencia de replicación y conmutación automática de un endpoint de lectura. Ya usa un motor compatible con MySQL. ¿Qué opción ofrece el MEJOR rendimiento de lectura?",
    opciones: [
      "Migrar a Amazon Aurora MySQL y usar el reader endpoint con réplicas Aurora.",
      "RDS MySQL con réplicas de lectura asíncronas tradicionales.",
      "Un solo RDS MySQL Multi-AZ más grande.",
      "Replicar manualmente con binlog a instancias EC2."
    ],
    correctas: [0],
    explicacion: "Aurora usa un volumen de almacenamiento compartido con replicación de baja latencia (típicamente milisegundos) y un reader endpoint que balancea y conmuta entre réplicas. Las réplicas de RDS MySQL tienen mayor lag. Un Multi-AZ más grande escala verticalmente, no el throughput de lectura. La replicación manual es operativamente costosa."
  },
  {
    id: "saa-372",
    dominio: 3,
    tema: "Aurora Auto Scaling",
    tipo: "single",
    enunciado: "Una aplicación con Aurora experimenta picos de tráfico de lectura predecibles por la mañana. Se quiere agregar y quitar réplicas de lectura automáticamente según la utilización para mantener el rendimiento y controlar el costo. ¿Qué configura?",
    opciones: [
      "Aurora Replica Auto Scaling basado en una métrica como CPU o conexiones promedio de réplicas.",
      "Escalado vertical automático de la instancia writer.",
      "Un cron job que ejecuta failover cada mañana.",
      "Aumentar manualmente las IOPS del volumen Aurora."
    ],
    correctas: [0],
    explicacion: "Aurora Replica Auto Scaling agrega y elimina réplicas de lectura según una métrica objetivo (CPU promedio o conexiones), adaptándose a la demanda de lectura. El escalado vertical no multiplica el throughput de lectura. Un failover no agrega capacidad. Aurora gestiona el almacenamiento automáticamente; no se ajustan IOPS manualmente."
  },
  {
    id: "saa-373",
    dominio: 3,
    tema: "EBS Tipos",
    tipo: "single",
    enunciado: "Una base de datos transaccional requiere 16.000 IOPS sostenidas y 600 MB/s de throughput sobre un único volumen, con el menor costo posible para ese nivel. ¿Qué tipo de volumen EBS elige?",
    opciones: [
      "gp3 con IOPS y throughput aprovisionados por encima de la línea base.",
      "gp2 dimensionado en tamaño para alcanzar las IOPS.",
      "io2 Block Express al máximo de IOPS.",
      "st1 (throughput optimized HDD)."
    ],
    correctas: [0],
    explicacion: "gp3 permite aprovisionar IOPS (hasta 16.000) y throughput (hasta 1.000 MB/s) de forma independiente del tamaño, con mejor costo que gp2 e io2 para este nivel. gp2 ata el rendimiento al tamaño y resulta más caro. io2 Block Express es para IOPS/throughput muy superiores y mayor costo. st1 es HDD, no apto para alta IOPS."
  },
  {
    id: "saa-374",
    dominio: 3,
    tema: "EBS io2 Block Express",
    tipo: "single",
    enunciado: "Una base de datos crítica necesita más de 100.000 IOPS y latencia submilisegundo consistente sobre un único volumen, junto con durabilidad de 99,999 por ciento. ¿Qué tipo de volumen EBS satisface estos requisitos?",
    opciones: [
      "io2 Block Express.",
      "gp3 al máximo de IOPS.",
      "sc1 (cold HDD).",
      "Instance Store NVMe."
    ],
    correctas: [0],
    explicacion: "io2 Block Express soporta hasta 256.000 IOPS por volumen con latencia submilisegundo y durabilidad de 99,999 por ciento. gp3 llega solo a 16.000 IOPS. sc1 es HDD de bajo costo y bajo rendimiento. Instance Store es efímero y no provee durabilidad de EBS."
  },
  {
    id: "saa-375",
    dominio: 3,
    tema: "EBS RAID 0",
    tipo: "single",
    enunciado: "Una carga necesita más IOPS y throughput de los que entrega un único volumen EBS y puede tolerar reconstrucción desde snapshots si falla un disco. ¿Qué técnica aumenta el rendimiento agregado de E/S?",
    opciones: [
      "Configurar RAID 0 (striping) sobre varios volúmenes EBS.",
      "Configurar RAID 1 (mirroring) sobre dos volúmenes EBS.",
      "Usar un único volumen st1 más grande.",
      "Habilitar EBS Multi-Attach en un solo volumen."
    ],
    correctas: [0],
    explicacion: "RAID 0 distribuye la E/S entre varios volúmenes, sumando IOPS y throughput. RAID 1 duplica datos pero no incrementa el rendimiento de escritura agregado. Un st1 más grande no alcanza IOPS altas. Multi-Attach comparte un volumen entre instancias, no agrega rendimiento por striping."
  },
  {
    id: "saa-376",
    dominio: 3,
    tema: "EFS Modos",
    tipo: "multiple",
    enunciado: "Una aplicación de análisis ejecuta miles de operaciones de metadatos por segundo desde cientos de instancias EC2 sobre EFS y el rendimiento se ve limitado. La carga es altamente paralela y con throughput exigente. ¿Qué DOS ajustes de EFS mejoran el rendimiento? (Elija dos).",
    opciones: [
      "Crear el sistema de archivos con performance mode 'Max I/O' para mayor IOPS agregadas.",
      "Usar throughput mode 'Provisioned' (o Elastic) para garantizar el throughput requerido.",
      "Usar performance mode 'General Purpose' para esta carga masivamente paralela.",
      "Mantener throughput mode 'Bursting' en un sistema de archivos pequeño.",
      "Reducir el número de instancias cliente para bajar la concurrencia."
    ],
    correctas: [0, 1],
    explicacion: "Max I/O escala a IOPS agregadas más altas para cargas masivamente paralelas, y Provisioned/Elastic throughput garantiza el ancho de banda sin depender de créditos de burst. General Purpose tiene un techo de IOPS más bajo. Bursting limita el throughput. Reducir clientes baja la concurrencia pero no mejora el rendimiento del sistema de archivos."
  },
  {
    id: "saa-377",
    dominio: 3,
    tema: "FSx for Lustre",
    tipo: "single",
    enunciado: "Un clúster de HPC procesa terabytes de datos almacenados en S3 y necesita un sistema de archivos POSIX de alto throughput con latencia submilisegundo que se integre directamente con el bucket. ¿Qué servicio elige?",
    opciones: [
      "Amazon FSx for Lustre enlazado al bucket de S3.",
      "Amazon EFS con throughput provisionado.",
      "Amazon FSx for Windows File Server.",
      "Montar S3 directamente como sistema de archivos con un gateway."
    ],
    correctas: [0],
    explicacion: "FSx for Lustre está diseñado para HPC y machine learning, ofrece throughput de cientos de GB/s y latencia submilisegundo, y se integra nativamente con S3 (lazy load y export). EFS no alcanza el rendimiento de Lustre. FSx for Windows usa SMB para Windows. Un gateway no entrega el rendimiento de un sistema de archivos paralelo."
  },
  {
    id: "saa-378",
    dominio: 3,
    tema: "Instance Store",
    tipo: "single",
    enunciado: "Una capa de caché distribuida necesita el almacenamiento de bloque de menor latencia y mayor IOPS posible y puede reconstruir sus datos si una instancia falla, ya que la persistencia no es requerida. ¿Qué opción ofrece el MEJOR rendimiento?",
    opciones: [
      "Instance Store NVMe local de la instancia EC2.",
      "EBS gp3 con throughput máximo.",
      "EBS io2 Block Express con Multi-Attach.",
      "EFS en modo Max I/O."
    ],
    correctas: [0],
    explicacion: "El Instance Store NVMe local entrega la menor latencia y mayor IOPS al estar físicamente adjunto al host, ideal para cachés efímeras. EBS, aun el más rápido, tiene latencia de red de bloque mayor. EFS es almacenamiento de archivos compartido con latencia superior a un NVMe local."
  },
  {
    id: "saa-379",
    dominio: 3,
    tema: "Placement Groups",
    tipo: "single",
    enunciado: "Una aplicación de HPC con MPI necesita la menor latencia de red y el mayor throughput entre nodos dentro de una sola zona de disponibilidad. ¿Qué estrategia de placement group usa?",
    opciones: [
      "Cluster placement group.",
      "Spread placement group.",
      "Partition placement group.",
      "Distribuir las instancias en múltiples AZ."
    ],
    correctas: [0],
    explicacion: "Un cluster placement group agrupa instancias físicamente cercanas en una AZ, logrando la menor latencia y mayor throughput de red, ideal para HPC/MPI. Spread maximiza aislamiento de hardware. Partition se usa para sistemas distribuidos grandes tipo Hadoop. Distribuir en múltiples AZ aumenta la latencia entre nodos."
  },
  {
    id: "saa-380",
    dominio: 3,
    tema: "Placement Groups",
    tipo: "single",
    enunciado: "Un clúster de Cassandra de gran escala debe distribuir sus nodos en grupos de hardware aislados de modo que la falla de un rack afecte solo a una porción del clúster, manteniendo conocimiento de la topología. ¿Qué placement group elige?",
    opciones: [
      "Partition placement group.",
      "Cluster placement group.",
      "Spread placement group con 7 instancias por AZ.",
      "Sin placement group, confiando en el azar del scheduler."
    ],
    correctas: [0],
    explicacion: "Partition placement group divide las instancias en particiones lógicas sobre racks de hardware separados, ideal para sistemas distribuidos grandes como Cassandra/Hadoop donde una falla de partición afecta solo a un subconjunto. Cluster prioriza latencia, no aislamiento. Spread está limitado a 7 instancias por AZ. Sin grupo no hay control de topología."
  },
  {
    id: "saa-381",
    dominio: 3,
    tema: "EFA",
    tipo: "single",
    enunciado: "Una carga de HPC fuertemente acoplada requiere comunicación entre nodos con bypass del sistema operativo para latencia ultrabaja a gran escala usando una biblioteca MPI. ¿Qué interfaz de red habilita?",
    opciones: [
      "Elastic Fabric Adapter (EFA).",
      "Una ENI estándar adicional.",
      "Elastic Network Adapter (ENA) sin EFA.",
      "Un NAT Gateway de alto rendimiento."
    ],
    correctas: [0],
    explicacion: "EFA expone una interfaz OS-bypass que acelera la comunicación entre nodos para HPC y ML a escala, integrándose con MPI/NCCL. Una ENI o ENA estándar usa la pila TCP/IP normal sin bypass. Un NAT Gateway es para salida a Internet, no para comunicación inter-nodo de baja latencia."
  },
  {
    id: "saa-382",
    dominio: 3,
    tema: "Graviton",
    tipo: "single",
    enunciado: "Un equipo busca mejorar la relación precio-rendimiento de un servicio web stateless basado en contenedores Linux que puede recompilarse fácilmente para otra arquitectura de CPU. ¿Qué cambio ofrece el MEJOR precio-rendimiento?",
    opciones: [
      "Migrar a instancias basadas en AWS Graviton (ARM).",
      "Pasar a instancias más grandes de la misma familia x86.",
      "Usar instancias con GPU para el servidor web.",
      "Migrar todo a Lambda con memoria máxima."
    ],
    correctas: [0],
    explicacion: "Las instancias Graviton (ARM) suelen ofrecer mejor relación precio-rendimiento para cargas que recompilan a ARM, como servicios web stateless en contenedores. Escalar verticalmente x86 no mejora la eficiencia de costo. GPU no aporta a un servidor web. Migrar a Lambda cambia el modelo y no es necesariamente más barato a alta utilización."
  },
  {
    id: "saa-383",
    dominio: 3,
    tema: "Lambda Provisioned Concurrency",
    tipo: "single",
    enunciado: "Una función Lambda crítica con un runtime de arranque lento sufre cold starts que añaden latencia inaceptable en horas pico predecibles. Se requiere latencia consistente y baja desde la primera invocación. ¿Qué configura?",
    opciones: [
      "Provisioned Concurrency dimensionada para el pico esperado.",
      "Aumentar el timeout de la función.",
      "Reducir la memoria asignada para que arranque más rápido.",
      "Migrar la función a ejecución asíncrona con SQS."
    ],
    correctas: [0],
    explicacion: "Provisioned Concurrency mantiene entornos de ejecución inicializados y listos, eliminando los cold starts y entregando latencia consistente. Subir el timeout no afecta el arranque. Reducir memoria suele empeorar el rendimiento. SQS desacopla pero no resuelve la latencia interactiva del cold start."
  },
  {
    id: "saa-384",
    dominio: 3,
    tema: "Kinesis Data Streams",
    tipo: "single",
    enunciado: "Un stream de Kinesis Data Streams recibe errores 'ProvisionedThroughputExceeded' porque una clave de partición concentra los registros en un único shard. El volumen total está por debajo de la capacidad agregada. ¿Cuál es la MEJOR solución?",
    opciones: [
      "Rediseñar la partition key para distribuir registros uniformemente entre los shards.",
      "Reducir el número de shards para concentrar la carga.",
      "Aumentar el período de retención del stream.",
      "Habilitar el cifrado en reposo del stream."
    ],
    correctas: [0],
    explicacion: "El throttling por shard caliente se resuelve eligiendo una partition key de alta cardinalidad que reparta los registros uniformemente entre los shards. Reducir shards empeora la concentración. La retención y el cifrado no afectan la distribución de throughput por shard."
  },
  {
    id: "saa-385",
    dominio: 3,
    tema: "Kinesis Firehose",
    tipo: "single",
    enunciado: "Una empresa quiere ingerir streaming y entregarlo a S3 en formato Parquet, sin administrar shards ni consumidores, con buffering y transformación opcional, y la menor sobrecarga operativa. ¿Qué servicio elige?",
    opciones: [
      "Amazon Kinesis Data Firehose con conversión de formato a Parquet.",
      "Amazon Kinesis Data Streams con una app de consumidor propia.",
      "Amazon MSK con conectores autogestionados.",
      "Amazon SQS con un worker que escribe a S3."
    ],
    correctas: [0],
    explicacion: "Firehose es totalmente gestionado, hace buffering, transforma y convierte a Parquet/ORC, y entrega directamente a S3 sin gestionar shards ni consumidores. Data Streams requiere gestionar shards y consumidores. MSK exige operar Kafka/conectores. SQS no ofrece entrega/transformación nativa a S3 en Parquet."
  },
  {
    id: "saa-386",
    dominio: 3,
    tema: "Athena Particiones",
    tipo: "single",
    enunciado: "Consultas de Athena sobre un dataset enorme en S3 son lentas y caras porque escanean todos los datos. La mayoría de las consultas filtran por fecha. ¿Qué optimización reduce más el costo y mejora el rendimiento?",
    opciones: [
      "Particionar los datos por fecha y almacenarlos en un formato columnar comprimido como Parquet.",
      "Aumentar el límite de concurrencia de consultas de Athena.",
      "Copiar todo el dataset a una sola carpeta sin particiones.",
      "Convertir los datos a JSON para facilitar el parsing."
    ],
    correctas: [0],
    explicacion: "Particionar por fecha permite partition pruning (escanear solo las particiones relevantes) y Parquet columnar comprimido reduce drásticamente los datos leídos, bajando costo y latencia. Subir concurrencia no reduce datos escaneados. Sin particiones se escanea todo. JSON aumenta el volumen escaneado frente a Parquet."
  },
  {
    id: "saa-387",
    dominio: 3,
    tema: "Redshift",
    tipo: "single",
    enunciado: "Un equipo de BI ejecuta consultas analíticas complejas con joins y agregaciones sobre miles de millones de filas y necesita rendimiento consistente de data warehouse con almacenamiento columnar. ¿Qué servicio elige?",
    opciones: [
      "Amazon Redshift.",
      "Amazon RDS PostgreSQL Multi-AZ.",
      "Amazon DynamoDB con GSIs.",
      "Amazon ElastiCache for Redis."
    ],
    correctas: [0],
    explicacion: "Redshift es un data warehouse columnar masivamente paralelo (MPP) optimizado para consultas analíticas complejas sobre grandes volúmenes. RDS PostgreSQL es OLTP por filas y no escala igual para analítica masiva. DynamoDB es NoSQL clave-valor. ElastiCache es caché en memoria, no un warehouse analítico."
  },
  {
    id: "saa-388",
    dominio: 3,
    tema: "API Gateway Caching",
    tipo: "single",
    enunciado: "Una API REST en API Gateway sirve respuestas que cambian poco y recibe muchas solicitudes idénticas que golpean al backend, aumentando latencia y costo. ¿Qué habilita para reducir las llamadas al backend?",
    opciones: [
      "El caché de etapa (stage cache) de API Gateway con un TTL adecuado.",
      "Throttling más agresivo a nivel de método.",
      "Un autorizador Lambda para cada solicitud.",
      "Convertir la API a tipo WebSocket."
    ],
    correctas: [0],
    explicacion: "El caché de etapa de API Gateway almacena respuestas por una clave y las sirve durante el TTL, reduciendo llamadas al backend y mejorando latencia. El throttling limita la tasa pero no reutiliza respuestas. Un autorizador agrega procesamiento. WebSocket cambia el modelo sin resolver el caching."
  },
  {
    id: "saa-389",
    dominio: 3,
    tema: "SQS + Auto Scaling",
    tipo: "single",
    enunciado: "Una flota de workers en un Auto Scaling Group consume mensajes de una cola SQS. Durante picos, los mensajes se acumulan y se procesan tarde. Se quiere escalar la flota proporcionalmente al backlog. ¿En qué métrica basa el escalado?",
    opciones: [
      "Una métrica objetivo derivada de 'ApproximateNumberOfMessagesVisible' (backlog por instancia).",
      "El uso de CPU promedio de los workers únicamente.",
      "El número de conexiones del ALB.",
      "La latencia de red del NAT Gateway."
    ],
    correctas: [0],
    explicacion: "Escalar según ApproximateNumberOfMessagesVisible (idealmente como backlog por instancia) alinea la capacidad con la profundidad real de la cola y absorbe los picos. La CPU puede no reflejar el backlog si el cuello de botella es de E/S. Las conexiones del ALB y la latencia del NAT no representan la carga de la cola."
  },
  {
    id: "saa-390",
    dominio: 3,
    tema: "OpenSearch",
    tipo: "single",
    enunciado: "Una aplicación necesita búsqueda de texto completo de baja latencia con relevancia, agregaciones y análisis de logs casi en tiempo real sobre grandes volúmenes. ¿Qué servicio gestionado elige?",
    opciones: [
      "Amazon OpenSearch Service.",
      "Amazon Athena sobre S3.",
      "Amazon DynamoDB con scan.",
      "Amazon RDS con LIKE en columnas de texto."
    ],
    correctas: [0],
    explicacion: "OpenSearch Service está optimizado para búsqueda de texto completo, scoring de relevancia, agregaciones y análisis de logs en casi tiempo real. Athena es para consultas SQL ad hoc, no búsqueda de texto de baja latencia. DynamoDB scan es ineficiente para texto. RDS con LIKE no escala para full-text a gran volumen."
  },
  {
    id: "saa-391",
    dominio: 3,
    tema: "EBS Optimizado",
    tipo: "single",
    enunciado: "Una instancia EC2 con un volumen io2 de alto rendimiento no alcanza las IOPS provisionadas y se sospecha contención entre el tráfico de red y el de almacenamiento. ¿Qué garantiza ancho de banda dedicado al tráfico de EBS?",
    opciones: [
      "Usar una instancia EBS-optimized (o habilitar la optimización de EBS).",
      "Agregar una segunda ENI a la instancia.",
      "Mover el volumen a otra AZ.",
      "Cambiar el volumen a gp2."
    ],
    correctas: [0],
    explicacion: "Una instancia EBS-optimized provee ancho de banda dedicado entre la instancia y EBS, evitando contención con el tráfico de red general y permitiendo alcanzar las IOPS provisionadas. Una ENI extra no separa el tráfico de almacenamiento. Cambiar de AZ o degradar a gp2 no resuelve la contención de E/S."
  },
  {
    id: "saa-392",
    dominio: 3,
    tema: "S3 Performance",
    tipo: "multiple",
    enunciado: "Una aplicación sube archivos grandes (decenas de GB) a S3 desde clientes distribuidos por el mundo y necesita maximizar la velocidad y la resiliencia de las subidas. ¿Qué DOS técnicas mejoran el rendimiento de carga? (Elija dos).",
    opciones: [
      "Usar multipart upload con las partes subidas en paralelo.",
      "Habilitar S3 Transfer Acceleration para clientes geográficamente lejanos.",
      "Realizar una única operación PutObject por archivo completo.",
      "Subir primero a EFS y luego copiar secuencialmente a S3.",
      "Comprimir cada archivo en un solo objeto y subirlo en una sola petición sin paralelizar."
    ],
    correctas: [0, 1],
    explicacion: "Multipart upload paraleliza las partes y permite reintentar solo las fallidas, maximizando throughput; Transfer Acceleration usa los POPs de CloudFront para acelerar subidas de clientes lejanos. Un PutObject único no paraleliza. Copiar vía EFS añade pasos. Subir sin paralelizar desaprovecha el ancho de banda."
  },
  {
    id: "saa-393",
    dominio: 3,
    tema: "Fargate",
    tipo: "single",
    enunciado: "Un equipo quiere ejecutar contenedores con escalado rápido y sin administrar ni parchear instancias EC2 subyacentes, pagando por los recursos de cada tarea. ¿Qué opción de cómputo elige?",
    opciones: [
      "AWS Fargate como tipo de lanzamiento de ECS/EKS.",
      "Un Auto Scaling Group de instancias EC2 con el agente de ECS.",
      "Lambda con imágenes de contenedor para todas las cargas.",
      "Instancias dedicadas con Docker instalado manualmente."
    ],
    correctas: [0],
    explicacion: "Fargate es cómputo serverless para contenedores: ejecuta tareas sin gestionar ni parchear EC2 y se cobra por los recursos de cada tarea, con escalado simple. Un ASG con el agente de ECS requiere administrar instancias. Lambda tiene límites de duración/recursos distintos. Docker manual implica gestión completa del host."
  },
  {
    id: "saa-394",
    dominio: 3,
    tema: "Compute vs Memory Optimized",
    tipo: "single",
    enunciado: "Una base de datos en memoria y una aplicación de caché requieren una gran cantidad de RAM por vCPU para mantener grandes conjuntos de datos en memoria. ¿Qué familia de instancias elige?",
    opciones: [
      "Instancias memory optimized (familia R o X).",
      "Instancias compute optimized (familia C).",
      "Instancias de propósito general (familia T en modo burst).",
      "Instancias con GPU (familia P)."
    ],
    correctas: [0],
    explicacion: "Las familias memory optimized (R, X) ofrecen alta relación de RAM por vCPU, ideales para bases de datos en memoria y cachés grandes. Las compute optimized (C) priorizan CPU. Las T burst son para cargas variables ligeras. Las P con GPU son para ML/HPC gráfico, no para memoria."
  },
  {
    id: "saa-395",
    dominio: 3,
    tema: "EMR",
    tipo: "single",
    enunciado: "Un equipo de datos necesita ejecutar trabajos Spark y Hive a gran escala sobre petabytes en S3, con clústeres efímeros que se levantan para el job y se terminan al finalizar para optimizar costo y rendimiento. ¿Qué servicio elige?",
    opciones: [
      "Amazon EMR con clústeres transitorios leyendo desde S3.",
      "Amazon Athena para todos los trabajos de transformación pesada.",
      "Amazon Redshift Spectrum como motor de ETL principal.",
      "Instancias EC2 con Spark instalado y gestionado manualmente."
    ],
    correctas: [0],
    explicacion: "EMR ejecuta frameworks como Spark y Hive de forma gestionada, permitiendo clústeres transitorios que procesan datos en S3 y se terminan al acabar, optimizando costo y rendimiento. Athena es para SQL ad hoc, no ETL Spark masivo. Spectrum consulta S3 desde Redshift, no es un motor Spark. EC2 manual implica gestionar todo el stack."
  },
  {
    id: "saa-396",
    dominio: 3,
    tema: "Route 53 Latencia",
    tipo: "single",
    enunciado: "Una aplicación desplegada en cuatro regiones debe dirigir a cada usuario al endpoint regional que le da la menor latencia de red. ¿Qué política de enrutamiento de Route 53 usa?",
    opciones: [
      "Latency-based routing.",
      "Weighted routing con pesos iguales.",
      "Failover routing.",
      "Multivalue answer routing."
    ],
    correctas: [0],
    explicacion: "Latency-based routing dirige a cada usuario a la región con menor latencia medida, optimizando el rendimiento. Weighted reparte por proporción fija. Failover es para activo-pasivo. Multivalue devuelve varias respuestas saludables pero no optimiza por latencia."
  },
  {
    id: "saa-397",
    dominio: 3,
    tema: "DynamoDB Adaptive Capacity",
    tipo: "single",
    enunciado: "Un arquitecto observa que ciertas particiones de una tabla DynamoDB reciben temporalmente más tráfico que otras, pero DynamoDB redistribuye la capacidad automáticamente para absorber esos desbalances sin intervención. ¿Qué característica describe este comportamiento y qué se debe seguir evitando?",
    opciones: [
      "Adaptive capacity; aun así se deben evitar claves de partición de baja cardinalidad para no crear particiones sostenidamente calientes.",
      "Global Tables; se debe evitar el cifrado en reposo.",
      "DAX; se deben evitar las lecturas fuertemente consistentes.",
      "On-demand backup; se debe evitar el versionado."
    ],
    correctas: [0],
    explicacion: "Adaptive capacity reasigna automáticamente capacidad a particiones con más tráfico, mitigando desbalances temporales; sin embargo, un diseño con clave de baja cardinalidad puede mantener una partición caliente de forma sostenida y debe evitarse. Global Tables, DAX y backups no describen este comportamiento."
  },
  {
    id: "saa-398",
    dominio: 3,
    tema: "Caching y Edge",
    tipo: "multiple",
    enunciado: "Un sitio global con contenido estático e imágenes sufre baja tasa de aciertos de caché y alta latencia para usuarios lejanos. ¿Qué DOS medidas mejoran el rendimiento de entrega de contenido? (Elija dos).",
    opciones: [
      "Distribuir el contenido estático mediante CloudFront con TTLs adecuados.",
      "Usar una cache policy que normalice la clave de caché (por ejemplo, sin cookies innecesarias) para aumentar el hit ratio.",
      "Servir todo el contenido directamente desde un único bucket de S3 sin CDN.",
      "Forzar TTL de 0 segundos en todos los objetos estáticos.",
      "Deshabilitar la compresión para evitar uso de CPU en el edge."
    ],
    correctas: [0, 1],
    explicacion: "CloudFront acerca el contenido a los usuarios con caché en POPs, y una cache policy que normalice la clave (excluyendo cookies/headers innecesarios) eleva el hit ratio. Servir sin CDN mantiene la latencia alta. TTL 0 anula la caché. Deshabilitar compresión aumenta los bytes transferidos y la latencia."
  },
  {
    id: "saa-399",
    dominio: 3,
    tema: "Bases de Datos de Lectura",
    tipo: "multiple",
    enunciado: "Una aplicación con un crecimiento fuerte de lecturas analíticas y de reportes está saturando la instancia primaria de la base de datos relacional. ¿Qué DOS estrategias escalan el rendimiento de lectura sin afectar las escrituras? (Elija dos).",
    opciones: [
      "Agregar réplicas de lectura y dirigir las consultas de solo lectura al endpoint de lectura.",
      "Introducir una capa de caché en memoria (ElastiCache) para resultados de lectura frecuentes.",
      "Aumentar indefinidamente solo el tamaño de la instancia primaria (escalado vertical).",
      "Convertir todas las lecturas en escrituras para forzar consistencia.",
      "Eliminar todos los índices para acelerar las escrituras."
    ],
    correctas: [0, 1],
    explicacion: "Las réplicas de lectura descargan las consultas de solo lectura del primario, y una caché en memoria reduce los golpes repetidos a la base. El escalado vertical tiene un techo y no separa lecturas de escrituras. Convertir lecturas en escrituras agrava la carga. Eliminar índices degrada las consultas de lectura."
  },
  {
    id: "saa-400",
    dominio: 3,
    tema: "Streaming y Throughput",
    tipo: "multiple",
    enunciado: "Una plataforma de ingestión en tiempo real con Kinesis Data Streams presenta throttling y consumidores que compiten por el mismo throughput de lectura del shard. ¿Qué DOS acciones mejoran el rendimiento de ingestión y consumo? (Elija dos).",
    opciones: [
      "Aumentar el número de shards (o usar on-demand) para elevar el throughput agregado.",
      "Habilitar enhanced fan-out para dar a cada consumidor su propio throughput de lectura dedicado.",
      "Reducir los shards a uno para simplificar el ordenamiento.",
      "Usar una única partition key constante para todos los registros.",
      "Aumentar el período de retención para acelerar las lecturas."
    ],
    correctas: [0, 1],
    explicacion: "Más shards (o on-demand) elevan el throughput agregado de ingestión, y enhanced fan-out otorga a cada consumidor un canal de lectura dedicado de 2 MB/s por shard, evitando la competencia. Reducir a un shard limita el throughput. Una partition key constante crea un shard caliente. La retención no afecta la velocidad de lectura."
  }
]);
