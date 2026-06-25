window.BANCO = (window.BANCO || []).concat([
  {
    id: "saa-641",
    dominio: 2,
    tema: "Estrategias de DR",
    tipo: "single",
    enunciado: "Una empresa necesita una estrategia de DR para su aplicación crítica con un RTO de 5 minutos y un RPO de 1 segundo. El presupuesto permite mantener una copia completa de producción ejecutándose en una segunda Región AWS recibiendo tráfico real. ¿Qué estrategia de DR cumple estos requisitos?",
    opciones: [
      "Backup and Restore",
      "Pilot Light",
      "Warm Standby",
      "Multi-Site Active/Active"
    ],
    correctas: [3],
    explicacion: "Multi-Site Active/Active mantiene ambas Regiones sirviendo tráfico productivo, logrando RTO/RPO cercanos a cero. Backup and Restore tiene RTO de horas. Pilot Light mantiene solo el núcleo de datos encendido, con RTO en decenas de minutos. Warm Standby corre una versión reducida sin recibir tráfico real, con RTO de minutos pero no de segundos para RPO."
  },
  {
    id: "saa-642",
    dominio: 2,
    tema: "Estrategias de DR",
    tipo: "single",
    enunciado: "Un equipo evalúa estrategias de DR. Buscan el menor costo posible aceptando un RTO de varias horas y un RPO de 24 horas para una aplicación interna de baja prioridad. ¿Qué estrategia es la más adecuada?",
    opciones: [
      "Multi-Site Active/Active en dos Regiones",
      "Warm Standby con capacidad reducida encendida",
      "Backup and Restore con copias en otra Región",
      "Pilot Light con base de datos replicada"
    ],
    correctas: [2],
    explicacion: "Backup and Restore es la estrategia más económica: solo se pagan los backups almacenados y se restaura la infraestructura cuando ocurre el desastre, aceptando RTO/RPO altos. Las demás opciones mantienen recursos encendidos o replicación continua, aumentando el costo de forma innecesaria para una carga de baja prioridad."
  },
  {
    id: "saa-643",
    dominio: 2,
    tema: "Aurora Global Database",
    tipo: "single",
    enunciado: "Una aplicación financiera usa Amazon Aurora MySQL y requiere recuperación ante un fallo regional completo con un RPO típico inferior a 1 segundo y un RTO inferior a 1 minuto, además de lecturas de baja latencia para usuarios en otra Región. ¿Qué solución cumple los requisitos?",
    opciones: [
      "Aurora Global Database con una Región secundaria",
      "Réplicas de lectura entre Regiones de RDS for MySQL",
      "Multi-AZ en una sola Región con dos réplicas Aurora",
      "Snapshots de Aurora copiados cada hora a otra Región"
    ],
    correctas: [0],
    explicacion: "Aurora Global Database replica con baja latencia (RPO típico < 1 s) usando la capa de almacenamiento y permite promover la Región secundaria con RTO < 1 min, además de servir lecturas locales. Multi-AZ no protege contra un fallo regional. Las réplicas de RDS y los snapshots horarios dan RPO mucho mayores y RTO de varios minutos u horas."
  },
  {
    id: "saa-644",
    dominio: 2,
    tema: "Aurora Backtrack",
    tipo: "single",
    enunciado: "Un desarrollador ejecutó por error una sentencia DELETE masiva en una base de datos Aurora MySQL. Necesita revertir el clúster a un punto unos minutos antes del error de la forma más rápida, sin restaurar un snapshot a un clúster nuevo. ¿Qué característica de Aurora debe usar?",
    opciones: [
      "Restaurar el último snapshot manual a un clúster nuevo",
      "Aurora Backtrack para retroceder el clúster en el tiempo",
      "Point-in-Time Recovery creando un clúster nuevo",
      "Promover una réplica de lectura existente"
    ],
    correctas: [1],
    explicacion: "Aurora Backtrack (para Aurora MySQL) permite retroceder el clúster existente a un instante anterior en segundos o minutos sin crear un clúster nuevo, ideal para deshacer cambios accidentales. Restaurar un snapshot o usar PITR crea un clúster nuevo y tarda más. Promover una réplica no deshace el DELETE, ya que también se replicó."
  },
  {
    id: "saa-645",
    dominio: 2,
    tema: "RDS Multi-AZ",
    tipo: "single",
    enunciado: "Una base de datos Amazon RDS for PostgreSQL está configurada en Multi-AZ. La instancia primaria sufre un fallo de hardware. ¿Qué ocurre y cómo deben conectarse las aplicaciones para mantener la disponibilidad?",
    opciones: [
      "RDS promueve la réplica en espera automáticamente y las apps siguen usando el mismo endpoint DNS del clúster",
      "El administrador debe promover manualmente la réplica de lectura y cambiar la cadena de conexión",
      "RDS crea una instancia nueva desde el último snapshot y las apps deben esperar el restore",
      "Las aplicaciones deben conectarse al endpoint de la réplica de lectura durante el fallo"
    ],
    correctas: [0],
    explicacion: "En RDS Multi-AZ, AWS realiza un failover automático a la instancia en espera síncrona y actualiza el registro DNS del endpoint, por lo que las aplicaciones reconectan al mismo endpoint sin cambios de configuración. No requiere intervención manual ni restaurar snapshots. La instancia en espera de Multi-AZ no atiende lecturas como una réplica."
  },
  {
    id: "saa-646",
    dominio: 2,
    tema: "RDS Read Replica",
    tipo: "single",
    enunciado: "Una empresa tiene RDS for MySQL en us-east-1 con una réplica de lectura en eu-west-1 usada para reportes regionales. Quieren poder usar esa réplica como sitio de recuperación si us-east-1 queda inutilizable. ¿Qué acción permite que la réplica de eu-west-1 atienda escrituras tras un desastre?",
    opciones: [
      "Habilitar Multi-AZ en la réplica de lectura de eu-west-1",
      "Promover la réplica de lectura a instancia independiente de escritura",
      "Crear un endpoint de Route 53 con failover apuntando a la réplica",
      "Activar Aurora Global Database sobre la réplica existente"
    ],
    correctas: [1],
    explicacion: "Promover una réplica de lectura de RDS la convierte en una instancia primaria independiente capaz de aceptar escrituras, sirviendo como destino de DR ante un fallo regional. Multi-AZ y Route 53 no convierten una réplica en escribible. Aurora Global Database aplica a Aurora, no a RDS for MySQL estándar, y no se activa sobre una réplica existente."
  },
  {
    id: "saa-647",
    dominio: 2,
    tema: "DynamoDB Global Tables",
    tipo: "single",
    enunciado: "Una aplicación móvil global necesita lecturas y escrituras de baja latencia desde usuarios en varios continentes y debe seguir operando si una Región completa falla. La base de datos es Amazon DynamoDB. ¿Qué configuración cumple estos requisitos?",
    opciones: [
      "DynamoDB Global Tables con réplicas en varias Regiones (multi-master)",
      "DynamoDB con DAX en una sola Región",
      "DynamoDB Streams replicando a un bucket S3 en otra Región",
      "DynamoDB con backups On-Demand copiados entre Regiones"
    ],
    correctas: [0],
    explicacion: "DynamoDB Global Tables provee replicación activo/activo multi-Región (multi-master), permitiendo lecturas y escrituras locales de baja latencia y resiliencia ante el fallo de una Región. DAX solo acelera lecturas en una Región. Streams a S3 o backups copiados no ofrecen escrituras activas en múltiples Regiones simultáneamente."
  },
  {
    id: "saa-648",
    dominio: 2,
    tema: "DynamoDB PITR",
    tipo: "single",
    enunciado: "Un equipo quiere protegerse contra escrituras corruptas en una tabla DynamoDB pudiendo restaurar el estado de la tabla a cualquier segundo dentro de los últimos 35 días, sin gestionar snapshots manualmente. ¿Qué debe habilitar?",
    opciones: [
      "Backups On-Demand programados cada hora con AWS Backup",
      "Point-in-Time Recovery (PITR) en la tabla",
      "DynamoDB Streams con una función Lambda de auditoría",
      "Global Tables con una réplica adicional"
    ],
    correctas: [1],
    explicacion: "Point-in-Time Recovery (PITR) de DynamoDB permite restaurar continuamente a cualquier momento dentro de los últimos 35 días sin gestionar snapshots. Los backups On-Demand son puntos discretos, no continuos. Streams permite auditar pero no restaurar. Global Tables aporta resiliencia regional, pero replica también los datos corruptos."
  },
  {
    id: "saa-649",
    dominio: 2,
    tema: "S3 Replication RTC",
    tipo: "single",
    enunciado: "Una empresa de medios debe replicar objetos nuevos de un bucket S3 a otra Región con un acuerdo de nivel de servicio que garantice que el 99,99% de los objetos se repliquen en 15 minutos, con métricas y alarmas de cumplimiento. ¿Qué característica de S3 cumple este requisito?",
    opciones: [
      "S3 Cross-Region Replication estándar sin opciones adicionales",
      "S3 Replication Time Control (RTC)",
      "S3 Transfer Acceleration hacia el bucket destino",
      "S3 Batch Replication ejecutado cada 15 minutos"
    ],
    correctas: [1],
    explicacion: "S3 Replication Time Control (RTC) ofrece un SLA que replica el 99,99% de los objetos en 15 minutos y emite métricas de CloudWatch para monitorear el tiempo de replicación. La replicación estándar no tiene SLA de tiempo. Transfer Acceleration acelera cargas de clientes, no la replicación entre buckets. Batch Replication es para objetos existentes, no continuo."
  },
  {
    id: "saa-650",
    dominio: 2,
    tema: "S3 Batch Replication",
    tipo: "single",
    enunciado: "Una empresa configuró replicación entre Regiones en un bucket S3 que ya contenía 10 millones de objetos previos. Nota que solo los objetos nuevos se replican. Necesita replicar también los objetos existentes a la Región destino. ¿Qué solución debe usar?",
    opciones: [
      "Habilitar S3 Versioning para forzar la replicación retroactiva",
      "Usar S3 Batch Replication para replicar los objetos existentes",
      "Recrear la regla de replicación con prioridad más alta",
      "Activar S3 Replication Time Control para objetos antiguos"
    ],
    correctas: [1],
    explicacion: "La replicación de S3 solo aplica a objetos creados después de configurar la regla. S3 Batch Replication procesa los objetos existentes que ya estaban en el bucket antes de habilitar la replicación. Versioning es un requisito previo pero no replica lo antiguo. Cambiar prioridad o activar RTC no afecta a los objetos preexistentes."
  },
  {
    id: "saa-651",
    dominio: 2,
    tema: "AWS Backup Vault Lock",
    tipo: "multiple",
    enunciado: "Una organización debe garantizar que los backups en AWS Backup no puedan ser eliminados ni acortados en su retención para cumplir requisitos regulatorios de inmutabilidad (WORM), y además aislarlos de la cuenta de producción. ¿Qué medidas contribuyen directamente a estos objetivos? (Elegí dos.)",
    opciones: [
      "Aplicar AWS Backup Vault Lock en modo de cumplimiento (compliance)",
      "Copiar los backups a un vault en una cuenta de respaldo dedicada (cross-account)",
      "Confiar únicamente en políticas de IAM restrictivas para impedir el borrado",
      "Habilitar MFA Delete sobre el backup vault de AWS Backup",
      "Reducir el período de retención para minimizar la superficie de borrado"
    ],
    correctas: [0, 1],
    explicacion: "Vault Lock en modo compliance vuelve inmutables las políticas de retención de modo que nadie, ni root, pueda acortarlas o borrar los backups (WORM), y copiarlos a un vault en una cuenta de respaldo dedicada los aísla de un compromiso de producción. Las políticas de IAM por sí solas no impiden a un administrador borrar, MFA Delete es de S3 (no de Backup) y reducir la retención debilita la protección."
  },
  {
    id: "saa-652",
    dominio: 2,
    tema: "AWS Backup cross-account",
    tipo: "single",
    enunciado: "Una empresa con AWS Organizations quiere centralizar y aislar los backups de todas sus cuentas en una cuenta dedicada de respaldo, de modo que un atacante que comprometa una cuenta de producción no pueda borrar las copias. ¿Qué enfoque cumple este objetivo?",
    opciones: [
      "Cross-account backup copy de AWS Backup hacia un vault en la cuenta de respaldo",
      "Replicar los snapshots con un rol de IAM compartido entre todas las cuentas",
      "Habilitar Multi-AZ en cada recurso para tolerar la pérdida de datos",
      "Programar copias EBS manuales en cada cuenta de producción"
    ],
    correctas: [0],
    explicacion: "AWS Backup permite copiar backups entre cuentas (cross-account) hacia un vault en una cuenta de respaldo aislada, idealmente con Vault Lock, de modo que un compromiso de la cuenta de producción no permita borrar las copias centralizadas. Compartir un rol amplio o dejar las copias en la misma cuenta no aísla el riesgo, y Multi-AZ no protege contra borrado malicioso."
  },
  {
    id: "saa-653",
    dominio: 2,
    tema: "Route 53 failover",
    tipo: "single",
    enunciado: "Una aplicación web tiene un sitio primario en us-east-1 y un sitio de respaldo estático en S3. Se requiere que el tráfico se desvíe automáticamente al respaldo si el primario deja de responder. ¿Qué configuración de Route 53 logra esto?",
    opciones: [
      "Política de enrutamiento por latencia entre ambos sitios",
      "Política de enrutamiento ponderada 90/10 entre primario y respaldo",
      "Política de enrutamiento de failover con health check en el primario",
      "Política de enrutamiento por geolocalización hacia el sitio más cercano"
    ],
    correctas: [2],
    explicacion: "El enrutamiento de failover de Route 53 usa un health check sobre el registro primario y, cuando este se vuelve no saludable, dirige el tráfico al registro secundario de respaldo. El enrutamiento por latencia, ponderado o geográfico distribuye tráfico pero no implementa un patrón activo/pasivo automático basado en salud."
  },
  {
    id: "saa-654",
    dominio: 2,
    tema: "Route 53 ARC",
    tipo: "single",
    enunciado: "Un equipo necesita ejecutar de forma confiable un failover regional bajo presión, con la garantía de que la decisión de conmutación no dependa de planos de control que podrían estar degradados durante una falla, y con verificaciones de preparación (readiness) de la Región de recuperación. ¿Qué servicio deben usar?",
    opciones: [
      "Route 53 Application Recovery Controller (ARC)",
      "Route 53 health checks con CloudWatch alarms",
      "AWS Global Accelerator con endpoints en dos Regiones",
      "AWS Fault Injection Simulator para ensayar el failover"
    ],
    correctas: [0],
    explicacion: "Route 53 Application Recovery Controller (ARC) ofrece routing controls altamente disponibles para ejecutar failover regional mediante un plano de datos resiliente, y readiness checks que verifican que la Región de recuperación esté correctamente aprovisionada. Los health checks simples o Global Accelerator no aportan controles de enrutamiento ni readiness. FIS solo inyecta fallos para pruebas."
  },
  {
    id: "saa-655",
    dominio: 2,
    tema: "Auto Scaling warm pools",
    tipo: "single",
    enunciado: "Una aplicación tiene instancias EC2 cuyo arranque tarda 10 minutos por la inicialización de la aplicación, lo que provoca demoras al escalar ante picos súbitos de tráfico. Se quiere reducir el tiempo de puesta en servicio sin pagar por instancias completamente activas en reposo. ¿Qué característica de Auto Scaling ayuda?",
    opciones: [
      "Predictive Scaling basado en machine learning",
      "Warm pools con instancias pre-inicializadas y detenidas",
      "Lifecycle hooks que retrasan la terminación de instancias",
      "Instance Refresh para reemplazar instancias gradualmente"
    ],
    correctas: [1],
    explicacion: "Los warm pools mantienen un grupo de instancias ya inicializadas en estado Stopped (o Hibernated), reduciendo drásticamente el tiempo para ponerlas en servicio durante un pico, sin el costo de instancias Running ociosas. Predictive Scaling anticipa demanda pero no reduce el tiempo de arranque. Lifecycle hooks e Instance Refresh resuelven otros problemas."
  },
  {
    id: "saa-656",
    dominio: 2,
    tema: "Auto Scaling instance refresh",
    tipo: "single",
    enunciado: "Un equipo publicó una nueva AMI con parches de seguridad y quiere reemplazar todas las instancias de un Auto Scaling group de forma gradual, manteniendo al menos el 90% de capacidad disponible durante el proceso. ¿Qué mecanismo nativo deben usar?",
    opciones: [
      "Instance Refresh con un valor de minimum healthy percentage de 90%",
      "Terminar manualmente las instancias y dejar que el ASG las reemplace",
      "Un blue/green deployment completo con un ASG nuevo",
      "Lifecycle hooks que reinstalan la AMI en caliente"
    ],
    correctas: [0],
    explicacion: "Instance Refresh reemplaza las instancias de un ASG de forma controlada según una nueva launch template/AMI, respetando un minimum healthy percentage (90% en este caso) para mantener capacidad durante el rollout. Terminar manualmente no garantiza capacidad mínima ni orden. Un blue/green completo es más complejo, y los lifecycle hooks no reinstalan AMIs."
  },
  {
    id: "saa-657",
    dominio: 2,
    tema: "Auto Scaling Spot",
    tipo: "multiple",
    enunciado: "Una arquitectura usa un Auto Scaling group con instancias Spot para reducir costos en una carga tolerante a interrupciones. El equipo quiere maximizar la resiliencia frente a interrupciones de Spot. ¿Qué prácticas son recomendables? (Elegí dos.)",
    opciones: [
      "Usar una política de mixed instances con varios tipos de instancia y AZs",
      "Habilitar Capacity Rebalancing para reemplazar instancias antes de la interrupción",
      "Configurar una sola familia de instancia para simplificar la capacidad",
      "Deshabilitar el balanceo entre múltiples AZs para evitar latencia",
      "Forzar el 100% de la capacidad en Spot sin instancias On-Demand de base"
    ],
    correctas: [0, 1],
    explicacion: "Una política de mixed instances con diversos tipos y AZs amplía el conjunto de capacidad Spot disponible, y Capacity Rebalancing reemplaza proactivamente instancias que recibieron aviso de interrupción. Limitarse a una familia o una sola AZ reduce la resiliencia, y depender al 100% de Spot sin base On-Demand puede dejar la app sin capacidad ante escasez."
  },
  {
    id: "saa-658",
    dominio: 2,
    tema: "Auto Scaling predictivo",
    tipo: "single",
    enunciado: "Una aplicación de comercio tiene patrones de tráfico cíclicos y predecibles cada día, con picos a la misma hora. El equipo quiere que la capacidad esté lista antes del pico en lugar de reaccionar después. ¿Qué tipo de escalado de EC2 Auto Scaling es el más adecuado?",
    opciones: [
      "Escalado dinámico con seguimiento de objetivo (target tracking)",
      "Escalado predictivo (Predictive Scaling)",
      "Escalado por pasos (step scaling) sobre CPU",
      "Escalado manual ajustando la capacidad deseada"
    ],
    correctas: [1],
    explicacion: "El escalado predictivo usa machine learning para analizar patrones históricos y aprovisionar capacidad anticipadamente antes de picos recurrentes, evitando la latencia de reaccionar después. El target tracking y el step scaling son reactivos. El escalado manual no se adapta automáticamente a los ciclos diarios."
  },
  {
    id: "saa-659",
    dominio: 2,
    tema: "SQS DLQ",
    tipo: "single",
    enunciado: "Un sistema de procesamiento de pedidos usa una cola SQS y consumidores que a veces fallan al procesar ciertos mensajes corruptos, generando reintentos infinitos que bloquean el flujo. ¿Qué configuración aísla esos mensajes problemáticos sin perderlos?",
    opciones: [
      "Aumentar el visibility timeout de la cola principal",
      "Configurar una Dead-Letter Queue con un maxReceiveCount",
      "Cambiar la cola a tipo FIFO para ordenar los mensajes",
      "Reducir el message retention period a unos minutos"
    ],
    correctas: [1],
    explicacion: "Una Dead-Letter Queue (DLQ) con un maxReceiveCount mueve los mensajes que fallan repetidamente a una cola separada tras N intentos, evitando reintentos infinitos y permitiendo analizarlos después sin perderlos. Aumentar el visibility timeout o reducir la retención no aísla los mensajes problemáticos, y FIFO no resuelve el procesamiento fallido."
  },
  {
    id: "saa-660",
    dominio: 2,
    tema: "SQS redrive",
    tipo: "single",
    enunciado: "Después de corregir un bug en el consumidor, un equipo necesita reprocesar los mensajes que quedaron acumulados en una Dead-Letter Queue, devolviéndolos a la cola original sin escribir código personalizado. ¿Qué característica usan?",
    opciones: [
      "SQS dead-letter queue redrive para mover mensajes de vuelta a la cola fuente",
      "Una función Lambda que lea la DLQ y reenvíe cada mensaje",
      "Eliminar la DLQ para que los mensajes vuelvan automáticamente",
      "Habilitar long polling en la cola principal"
    ],
    correctas: [0],
    explicacion: "La funcionalidad de DLQ redrive de SQS permite mover mensajes desde la dead-letter queue de vuelta a la cola fuente (o a otra) desde la consola o API, sin código personalizado, para reprocesarlos tras corregir el problema. Escribir una Lambda es válido pero innecesario. Eliminar la DLQ pierde los mensajes; el long polling no reprocesa nada."
  },
  {
    id: "saa-661",
    dominio: 2,
    tema: "SQS FIFO idempotencia",
    tipo: "single",
    enunciado: "Un sistema de pagos requiere que cada transacción se procese exactamente una vez y en orden estricto por cuenta. Las transacciones de distintas cuentas pueden procesarse en paralelo. ¿Qué configuración de SQS satisface estos requisitos?",
    opciones: [
      "Cola estándar con deduplicación basada en una tabla DynamoDB",
      "Cola FIFO usando MessageGroupId por cuenta y deduplicación de contenido",
      "Cola estándar con visibility timeout muy alto",
      "Cola FIFO con un único MessageGroupId global para todas las cuentas"
    ],
    correctas: [1],
    explicacion: "Una cola FIFO garantiza orden y entrega exactly-once dentro de un MessageGroupId; usar el identificador de cuenta como MessageGroupId preserva el orden por cuenta y permite paralelismo entre grupos, mientras la deduplicación evita duplicados. Una cola estándar no garantiza orden. Un único MessageGroupId global serializaría todas las cuentas, eliminando el paralelismo."
  },
  {
    id: "saa-662",
    dominio: 2,
    tema: "EventBridge desacople",
    tipo: "single",
    enunciado: "Una empresa quiere desacoplar microservicios de modo que múltiples consumidores reaccionen a eventos de negocio (por ejemplo 'pedido creado') con enrutamiento basado en el contenido del evento y reintentos con DLQ, sin que el productor conozca a los consumidores. ¿Qué servicio es el más adecuado?",
    opciones: [
      "Amazon SQS con una cola por consumidor",
      "Amazon EventBridge con reglas y patrones de evento",
      "AWS Step Functions con una máquina de estados",
      "Amazon Kinesis Data Streams con varios consumidores"
    ],
    correctas: [1],
    explicacion: "Amazon EventBridge enruta eventos a múltiples targets según patrones que filtran el contenido del evento, soporta reintentos y DLQ, y desacopla productores de consumidores sin que el productor los conozca. SQS por sí solo no filtra por contenido ni hace fan-out nativo con enrutamiento. Step Functions orquesta flujos, no es un bus de eventos. Kinesis es para streaming de alto volumen."
  },
  {
    id: "saa-663",
    dominio: 2,
    tema: "Step Functions reintentos",
    tipo: "multiple",
    enunciado: "Un flujo orquestado en AWS Step Functions invoca un servicio externo que a veces falla con errores transitorios. Se requiere reintentar con retroceso exponencial y, si todos los reintentos fallan, ejecutar una ruta de compensación de forma nativa. ¿Qué elementos del lenguaje de estados se deben usar? (Elegí dos.)",
    opciones: [
      "El campo Retry con IntervalSeconds y BackoffRate para el retroceso exponencial",
      "El campo Catch para capturar el fallo y derivar a un estado de compensación",
      "Envolver toda la máquina de estados en un bloque try/catch dentro de una Lambda",
      "Aumentar el timeout global de la máquina de estados para tolerar los fallos",
      "Insertar una cola SQS intermedia para reintentar los pasos manualmente"
    ],
    correctas: [0, 1],
    explicacion: "Step Functions soporta de forma declarativa el campo Retry con IntervalSeconds y BackoffRate para reintentos con retroceso exponencial, y el campo Catch para capturar fallos y derivar a un estado de compensación. No hace falta lógica externa en Lambda ni colas SQS; aumentar el timeout global no implementa reintentos ni compensación."
  },
  {
    id: "saa-664",
    dominio: 2,
    tema: "Sesión externa",
    tipo: "single",
    enunciado: "Una aplicación web detrás de un Application Load Balancer almacena la sesión de usuario en memoria de cada instancia EC2. Cuando una instancia se reemplaza durante el escalado, los usuarios pierden la sesión. Se busca una solución de baja latencia con sesiones compartidas. ¿Qué arquitectura resuelve esto?",
    opciones: [
      "Habilitar sticky sessions en el ALB de forma permanente",
      "Externalizar el estado de sesión en Amazon ElastiCache for Redis",
      "Guardar la sesión en el disco EBS de cada instancia",
      "Aumentar el cooldown del Auto Scaling group"
    ],
    correctas: [1],
    explicacion: "Externalizar la sesión a un almacén compartido de baja latencia como Amazon ElastiCache for Redis hace que las instancias sean stateless, de modo que el reemplazo o escalado no pierda sesiones. Las sticky sessions atan al usuario a una instancia que igual puede terminarse. El EBS es local a cada instancia y el cooldown no resuelve el estado de sesión."
  },
  {
    id: "saa-665",
    dominio: 2,
    tema: "Sesión en DynamoDB",
    tipo: "single",
    enunciado: "Un equipo quiere almacenar sesiones de usuario de una aplicación serverless con expiración automática de los registros antiguos y alta durabilidad multi-AZ, minimizando la operación de infraestructura. ¿Qué servicio es el más adecuado para el almacén de sesiones?",
    opciones: [
      "Amazon DynamoDB con TTL habilitado en los ítems de sesión",
      "Amazon ElastiCache for Memcached en una sola AZ",
      "Una instancia EC2 con Redis autogestionado",
      "Amazon RDS for MySQL con una tabla de sesiones"
    ],
    correctas: [0],
    explicacion: "DynamoDB es totalmente gestionado, durable de forma multi-AZ y su característica TTL elimina automáticamente los ítems de sesión expirados, encajando con cargas serverless de baja operación. Memcached en una sola AZ no es durable. Redis en EC2 implica operación manual. RDS añade gestión de servidores y es menos elástico para este patrón."
  },
  {
    id: "saa-666",
    dominio: 2,
    tema: "EFS resiliencia",
    tipo: "single",
    enunciado: "Varias instancias EC2 en distintas AZs necesitan compartir un sistema de archivos POSIX que siga disponible aunque una AZ completa falle, sin que el equipo gestione servidores de archivos. ¿Qué servicio cumple este requisito?",
    opciones: [
      "Amazon EFS con mount targets en varias AZs",
      "Un volumen EBS io2 compartido entre las instancias",
      "Amazon FSx for Windows File Server en una sola AZ",
      "Almacenamiento de instancia (instance store) replicado por la aplicación"
    ],
    correctas: [0],
    explicacion: "Amazon EFS (en modo Regional/Standard) almacena los datos de forma redundante en varias AZs y se monta mediante mount targets por AZ, permitiendo acceso POSIX compartido que sobrevive al fallo de una AZ, sin servidores que administrar. EBS está atado a una AZ, FSx single-AZ no tolera la pérdida de su AZ y el instance store es efímero."
  },
  {
    id: "saa-667",
    dominio: 2,
    tema: "EFS replication",
    tipo: "single",
    enunciado: "Una empresa usa Amazon EFS para datos críticos y necesita una copia replicada en otra Región AWS para recuperación ante desastres, con un objetivo de RPO de minutos y gestión mínima. ¿Qué característica deben usar?",
    opciones: [
      "EFS Replication hacia un sistema de archivos en la Región de DR",
      "Copiar manualmente los datos con DataSync una vez al día",
      "Snapshots de EFS almacenados en S3 Glacier",
      "Montar el mismo sistema de archivos EFS desde la otra Región"
    ],
    correctas: [0],
    explicacion: "EFS Replication mantiene de forma automática y gestionada una réplica del sistema de archivos en otra Región con un RPO típico de minutos, ideal para DR. DataSync diario da un RPO de 24 horas. EFS no expone snapshots a Glacier de forma nativa, y un sistema de archivos EFS no se puede montar entre Regiones de forma directa."
  },
  {
    id: "saa-668",
    dominio: 2,
    tema: "EC2 Auto Recovery",
    tipo: "single",
    enunciado: "Una instancia EC2 ejecuta una aplicación legada de un solo nodo que no puede agruparse en un Auto Scaling group. El equipo quiere que, si la instancia falla por un problema de hardware subyacente, se recupere automáticamente conservando su mismo ID, IP privada y volúmenes EBS. ¿Qué solución aplica?",
    opciones: [
      "Configurar EC2 Auto Recovery (simple automatic recovery)",
      "Colocar la instancia en un Auto Scaling group de tamaño fijo 1",
      "Crear una AMI y restaurarla manualmente cuando falle",
      "Habilitar Multi-AZ en la instancia EC2"
    ],
    correctas: [0],
    explicacion: "EC2 Auto Recovery recupera una instancia afectada por un fallo de hardware subyacente en hardware nuevo conservando su instance ID, IP privada, IP elástica y volúmenes EBS, ideal para nodos únicos no agrupables. Un ASG de 1 lanzaría una instancia nueva sin conservar el ID ni la IP. Las AMIs manuales no son automáticas y EC2 no tiene 'Multi-AZ'."
  },
  {
    id: "saa-669",
    dominio: 2,
    tema: "Conectividad híbrida",
    tipo: "single",
    enunciado: "Una empresa depende de una única conexión AWS Direct Connect para su tráfico crítico hacia AWS y quiere eliminar ese punto único de fallo con la mejor resiliencia y un respaldo de menor costo si el enlace dedicado cae. ¿Qué arquitectura es la recomendada?",
    opciones: [
      "Una segunda conexión Direct Connect en el mismo dispositivo del proveedor",
      "Direct Connect con una VPN Site-to-Site como respaldo (backup)",
      "Reemplazar Direct Connect por una sola VPN Site-to-Site",
      "Aumentar el ancho de banda de la conexión Direct Connect existente"
    ],
    correctas: [1],
    explicacion: "Combinar Direct Connect con una VPN Site-to-Site de respaldo elimina el punto único de fallo: si el enlace dedicado falla, el tráfico conmuta a la VPN sobre Internet a un costo menor que una segunda DX. Una segunda DX en el mismo dispositivo no elimina el fallo de ese dispositivo, una sola VPN no iguala el rendimiento de DX y aumentar el ancho de banda no aporta redundancia."
  },
  {
    id: "saa-670",
    dominio: 2,
    tema: "Conectividad híbrida",
    tipo: "single",
    enunciado: "Una entidad financiera requiere conectividad híbrida con la máxima resiliencia, sin depender de Internet ni siquiera para un respaldo, tolerando el fallo de un dispositivo o de una ubicación física completa del proveedor. ¿Qué diseño de Direct Connect cumple este nivel?",
    opciones: [
      "Dos conexiones Direct Connect terminando en dos ubicaciones de DX distintas",
      "Una Direct Connect con una VPN de respaldo cifrada",
      "Una sola Direct Connect con dos Virtual Interfaces (VIFs)",
      "Dos VPN Site-to-Site sobre dos proveedores de Internet"
    ],
    correctas: [0],
    explicacion: "El máximo nivel de resiliencia de Direct Connect usa conexiones redundantes que terminan en ubicaciones de DX separadas (y dispositivos distintos), tolerando el fallo de una ubicación física completa sin depender de Internet. La VPN de respaldo usa Internet. Dos VIFs sobre una sola conexión comparten el mismo enlace físico. Dos VPNs no ofrecen el rendimiento ni el aislamiento requeridos."
  },
  {
    id: "saa-671",
    dominio: 2,
    tema: "Elastic Disaster Recovery",
    tipo: "single",
    enunciado: "Una empresa quiere implementar DR para servidores físicos on-premises y VMs hacia AWS con replicación continua a nivel de bloque, RPO de segundos y RTO de minutos, lanzando instancias EC2 solo cuando ocurra un desastre para minimizar costos. ¿Qué servicio es el indicado?",
    opciones: [
      "AWS Elastic Disaster Recovery (AWS DRS)",
      "AWS Database Migration Service (DMS)",
      "AWS Backup con copias programadas a EC2",
      "VM Import/Export ejecutado periódicamente"
    ],
    correctas: [0],
    explicacion: "AWS Elastic Disaster Recovery (AWS DRS) realiza replicación continua a nivel de bloque desde servidores físicos o virtuales hacia un área de staging de bajo costo en AWS, con RPO de segundos y RTO de minutos, lanzando instancias EC2 completas solo durante un failover o prueba. DMS es para bases de datos, AWS Backup no replica continuamente y VM Import/Export no es continuo."
  },
  {
    id: "saa-672",
    dominio: 2,
    tema: "Idempotencia",
    tipo: "single",
    enunciado: "Una API recibe ocasionalmente solicitudes duplicadas por reintentos de red, lo que podría crear pedidos duplicados. El equipo quiere que reprocesar la misma solicitud no genere efectos secundarios adicionales. ¿Qué enfoque de diseño aborda este problema?",
    opciones: [
      "Aumentar el timeout de la API para reducir reintentos",
      "Implementar idempotencia con una clave de idempotencia (idempotency key) persistida",
      "Servir la API solo desde una AZ para evitar duplicados",
      "Desactivar los reintentos automáticos en todos los clientes"
    ],
    correctas: [1],
    explicacion: "Diseñar operaciones idempotentes usando una idempotency key que se persiste (por ejemplo en DynamoDB) permite detectar y descartar solicitudes duplicadas, garantizando que reprocesar la misma petición no cree pedidos adicionales. Cambiar timeouts o limitar AZs no previene duplicados, y desactivar reintentos reduce la resiliencia y no garantiza unicidad."
  },
  {
    id: "saa-673",
    dominio: 2,
    tema: "Multi-Region activo/activo",
    tipo: "single",
    enunciado: "Una aplicación global debe servir a usuarios desde la Región más cercana, con conmutación automática si una Región falla, usando direcciones IP estáticas y mejorando el rendimiento mediante la red troncal de AWS. ¿Qué servicio se debe colocar al frente de los endpoints regionales?",
    opciones: [
      "Amazon CloudFront con un origen por Región",
      "AWS Global Accelerator con endpoints en varias Regiones",
      "Route 53 con enrutamiento ponderado",
      "Un Application Load Balancer interregional"
    ],
    correctas: [1],
    explicacion: "AWS Global Accelerator provee dos IPs estáticas anycast, enruta a los endpoints regionales más cercanos por la red troncal de AWS y conmuta automáticamente si una Región/endpoint se degrada, con failover rápido. CloudFront es para contenido cacheable HTTP(S). Route 53 ponderado no ofrece IPs estáticas ni failover instantáneo a nivel de red, y no existe un ALB interregional."
  },
  {
    id: "saa-674",
    dominio: 2,
    tema: "Fallo de AZ",
    tipo: "multiple",
    enunciado: "Un arquitecto debe asegurar que una aplicación web de tres capas sobreviva al fallo completo de una Zona de Disponibilidad sin intervención manual. ¿Qué medidas contribuyen directamente a este objetivo? (Elegí dos.)",
    opciones: [
      "Desplegar las instancias EC2 en un Auto Scaling group abarcando al menos dos AZs",
      "Usar RDS en configuración Multi-AZ",
      "Colocar todas las instancias en una sola AZ para reducir latencia",
      "Usar un único subnet privada para toda la base de datos",
      "Reservar instancias On-Demand en una sola AZ para garantizar capacidad"
    ],
    correctas: [0, 1],
    explicacion: "Un Auto Scaling group repartido en varias AZs y RDS Multi-AZ permiten que la aplicación y la base de datos sigan operando ante el fallo de una AZ, con failover automático. Concentrar instancias o la base de datos en una sola AZ, o reservar capacidad solo allí, crea un punto único de fallo a nivel de zona."
  },
  {
    id: "saa-675",
    dominio: 2,
    tema: "Aurora failover tiers",
    tipo: "single",
    enunciado: "Un clúster Amazon Aurora tiene tres réplicas de lectura. El equipo quiere controlar qué réplica se promueve primero a writer durante un failover, priorizando la de mayor tamaño de instancia. ¿Cómo se configura esto?",
    opciones: [
      "Asignar prioridades de failover (failover tiers) más bajas a las réplicas preferidas",
      "Habilitar Multi-AZ adicional sobre el clúster Aurora",
      "Usar el endpoint de lectura para forzar la promoción",
      "Eliminar las réplicas de menor tamaño antes del failover"
    ],
    correctas: [0],
    explicacion: "Aurora usa failover priority tiers (de 0 a 15); la réplica con el tier numéricamente más bajo se promueve primero, permitiendo priorizar instancias de mayor tamaño. Multi-AZ es inherente al clúster Aurora y no controla la prioridad. El reader endpoint balancea lecturas, no fuerza promoción, y eliminar réplicas reduce la resiliencia."
  },
  {
    id: "saa-676",
    dominio: 2,
    tema: "Aurora Multi-AZ cluster",
    tipo: "single",
    enunciado: "Una aplicación OLTP sobre Aurora necesita el menor tiempo de failover posible (del orden de segundos) y mejor rendimiento de escritura con dos instancias de lectura que también actúan como standby. ¿Qué configuración de Amazon Aurora ofrece esto?",
    opciones: [
      "Aurora Serverless v1 con escalado automático",
      "Aurora Multi-AZ DB cluster con una instancia de escritura y dos de lectura/standby",
      "Aurora con una única instancia y backups frecuentes",
      "Aurora Global Database con dos Regiones"
    ],
    correctas: [1],
    explicacion: "La configuración Aurora Multi-AZ DB cluster (de tres instancias: un writer y dos readers que también funcionan como standby) provee failover en cuestión de segundos y mejor rendimiento de escritura. Aurora Serverless v1 no apunta a este patrón, una sola instancia no es resiliente y Global Database resuelve DR regional, no el failover de baja latencia dentro de una Región."
  },
  {
    id: "saa-677",
    dominio: 2,
    tema: "DR comparada RTO/RPO",
    tipo: "single",
    enunciado: "Una empresa requiere un RTO de aproximadamente 10 minutos y un RPO de pocos minutos, manteniendo una versión reducida (escala mínima) de la aplicación encendida y con la base de datos replicada continuamente en la Región de DR, para luego escalar al recibir tráfico. ¿Qué estrategia de DR describe esto?",
    opciones: [
      "Backup and Restore",
      "Pilot Light",
      "Warm Standby",
      "Multi-Site Active/Active"
    ],
    correctas: [2],
    explicacion: "Warm Standby mantiene una copia funcional pero a escala reducida de la aplicación corriendo en la Región de DR, con datos replicados, lista para escalar y recibir tráfico, alcanzando RTO de minutos y RPO bajo. Pilot Light solo mantiene la base de datos/núcleo sin la capa de aplicación corriendo. Backup and Restore tiene RTO de horas y Active/Active mantiene plena capacidad sirviendo tráfico."
  },
  {
    id: "saa-678",
    dominio: 2,
    tema: "DynamoDB recuperación",
    tipo: "single",
    enunciado: "Una tabla DynamoDB con Global Tables en dos Regiones sufre una corrupción lógica de datos que se replica a ambas Regiones. El equipo necesita restaurar la tabla a un estado consistente anterior al incidente. ¿Qué mecanismo lo permite?",
    opciones: [
      "Promover la réplica de la segunda Región como fuente de verdad",
      "Restaurar la tabla usando Point-in-Time Recovery a un instante previo a la corrupción",
      "Desactivar Global Tables para detener la replicación de los datos buenos",
      "Habilitar DynamoDB Accelerator (DAX) para servir datos antiguos en caché"
    ],
    correctas: [1],
    explicacion: "Como la corrupción lógica se replica a todas las Regiones de Global Tables, la solución es restaurar desde PITR a un instante anterior al incidente para recuperar un estado consistente. Promover otra réplica no ayuda porque también está corrupta. Desactivar Global Tables no revierte los datos y DAX solo cachea lecturas, no restaura el estado correcto."
  },
  {
    id: "saa-679",
    dominio: 2,
    tema: "Migración a multi-Region",
    tipo: "multiple",
    enunciado: "Una empresa migra una aplicación single-Region a una arquitectura multi-Región activo/activo para alta disponibilidad global. ¿Qué componentes y prácticas soportan correctamente este patrón? (Elegí dos.)",
    opciones: [
      "Amazon DynamoDB Global Tables para datos con escritura en ambas Regiones",
      "Route 53 con enrutamiento por latencia y health checks hacia ambas Regiones",
      "Una única base de datos RDS single-AZ compartida entre Regiones por VPN",
      "Mantener todo el estado de sesión en memoria local de cada instancia",
      "Replicar archivos con un cron diario que copia manualmente a S3"
    ],
    correctas: [0, 1],
    explicacion: "Las Global Tables de DynamoDB permiten escrituras activas en ambas Regiones, y Route 53 con enrutamiento por latencia más health checks dirige a cada usuario a la Región más rápida y saludable, conmutando ante fallos. Una RDS single-AZ compartida es un punto único de fallo, el estado en memoria local rompe la resiliencia y una copia diaria manual da un RPO inaceptable para activo/activo."
  },
  {
    id: "saa-680",
    dominio: 2,
    tema: "S3 durabilidad y recuperación",
    tipo: "multiple",
    enunciado: "Un equipo debe proteger un bucket S3 crítico contra borrados accidentales o maliciosos y poder recuperar versiones previas de objetos sobrescritos. ¿Qué combinación de características ayuda a cumplir estos objetivos? (Elegí dos.)",
    opciones: [
      "Habilitar S3 Versioning para conservar versiones previas y marcadores de borrado",
      "Activar MFA Delete para exigir MFA al eliminar versiones permanentemente",
      "Deshabilitar el cifrado para acelerar la recuperación de objetos",
      "Usar una sola clase de almacenamiento S3 One Zone-IA para todos los objetos",
      "Configurar una política de ciclo de vida que elimine todas las versiones tras 1 día"
    ],
    correctas: [0, 1],
    explicacion: "S3 Versioning conserva versiones anteriores y permite recuperar objetos sobrescritos o eliminados, y MFA Delete añade una capa que exige MFA para borrar versiones de forma permanente, protegiendo contra borrados maliciosos. Deshabilitar el cifrado no aporta recuperación, One Zone-IA reduce la durabilidad multi-AZ y un ciclo de vida que borra versiones tras 1 día eliminaría la protección."
  }
]);
