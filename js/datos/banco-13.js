window.BANCO = (window.BANCO || []).concat([
  {
    id: "saa-481",
    dominio: 2,
    tema: "Estrategias DR",
    tipo: "single",
    enunciado: "Una empresa de banca necesita un plan de recuperacion ante desastres con un RTO de pocos minutos y un RPO cercano a cero para su aplicacion critica desplegada en EC2 y RDS. El presupuesto permite mantener infraestructura completamente replicada y activa. ¿Que estrategia de DR cumple mejor estos requisitos?",
    opciones: ["Backup and Restore con copias en S3 cross-Region", "Pilot Light con una base de datos minima en la Region secundaria", "Warm Standby con una version reducida del entorno siempre encendida", "Multi-site active/active con trafico distribuido entre ambas Regiones"],
    correctas: [3],
    explicacion: "Multi-site active/active mantiene los dos entornos plenamente operativos y sirviendo trafico, logrando RTO y RPO casi nulos. Backup and Restore tiene RTO de horas. Pilot Light requiere escalar el entorno secundario, aumentando el RTO. Warm Standby tiene un entorno reducido que debe escalarse, sin alcanzar RPO cercano a cero ni el RTO de minutos del modo activo/activo."
  },
  {
    id: "saa-482",
    dominio: 2,
    tema: "Estrategias DR",
    tipo: "single",
    enunciado: "Una aplicacion interna tolera un RTO de 24 horas y un RPO de 24 horas. El equipo quiere minimizar costos al maximo y no desea pagar por recursos de computo ociosos en la Region secundaria. ¿Que estrategia de DR es la mas adecuada?",
    opciones: ["Backup and Restore con copias periodicas en otra Region", "Pilot Light con replicas de RDS encendidas", "Warm Standby con Auto Scaling al minimo", "Multi-site active/active"],
    correctas: [0],
    explicacion: "Con un RTO y RPO de 24 horas, Backup and Restore es la opcion mas economica porque no mantiene computo encendido en la Region secundaria; se restaura desde backups cuando ocurre el desastre. Pilot Light, Warm Standby y active/active mantienen recursos corriendo y cuestan mas de lo necesario para estos objetivos relajados."
  },
  {
    id: "saa-483",
    dominio: 2,
    tema: "Aurora Global Database",
    tipo: "multiple",
    enunciado: "Una empresa global usa Amazon Aurora y necesita recuperacion ante desastres entre Regiones con un RPO tipico menor a un segundo y un RTO menor a un minuto para promover la Region secundaria. ¿Que dos afirmaciones describen correctamente la solucion adecuada? (Elija dos)",
    opciones: ["Aurora Global Database replica a una Region secundaria con un RPO tipico menor a un segundo", "Aurora Global Database permite promover la Region secundaria (managed failover) en menos de un minuto", "Aurora Multi-AZ dentro de una sola Region protege contra el fallo de una Region completa", "Copiar snapshots manuales cada hora a otra Region logra un RPO cercano a cero", "Una read replica en la misma Region es suficiente para recuperarse de un fallo regional"],
    correctas: [0, 1],
    explicacion: "Aurora Global Database replica con baja latencia a una Region secundaria (RPO tipico menor a un segundo) y permite promocion gestionada (managed failover) en menos de un minuto, cumpliendo el RTO. Multi-AZ y una read replica en la misma Region no protegen contra fallos regionales. Los snapshots cada hora dan un RPO de hasta una hora, no cercano a cero."
  },
  {
    id: "saa-484",
    dominio: 2,
    tema: "Aurora Backtrack",
    tipo: "single",
    enunciado: "Un desarrollador ejecuto por error una sentencia que modifico datos en una base Aurora MySQL. Necesitan revertir el cluster a un estado de hace 10 minutos en segundos, sin restaurar desde un snapshot ni crear un cluster nuevo. ¿Que caracteristica de Aurora deberian usar?",
    opciones: ["Aurora Backtrack", "Restauracion point-in-time a un nuevo cluster", "Aurora Clone rapido", "Promocion de una read replica"],
    correctas: [0],
    explicacion: "Aurora Backtrack (disponible en Aurora MySQL) permite rebobinar el cluster en su sitio a un punto anterior en el tiempo sin crear un cluster nuevo, en segundos. La restauracion point-in-time crea un cluster nuevo y tarda mas. Aurora Clone copia datos pero no revierte. Promover una replica no deshace el cambio erroneo."
  },
  {
    id: "saa-485",
    dominio: 2,
    tema: "Aurora failover",
    tipo: "single",
    enunciado: "En un cluster Aurora con un escritor y tres replicas, el equipo quiere controlar cual replica sera promovida primero cuando falle la instancia escritora. ¿Como se configura este comportamiento?",
    opciones: ["Asignando una prioridad de tier de failover a cada instancia (tier-0 a tier-15)", "Habilitando Multi-AZ en el grupo de subredes", "Configurando un peso en el endpoint del cluster", "Aumentando la clase de instancia de la replica preferida"],
    correctas: [0],
    explicacion: "Aurora usa prioridades de tier de failover (de tier-0, la mas alta, a tier-15). En un failover, Aurora promueve la replica con el tier de prioridad mas alto; ante empate, elige la de mayor tamano. Multi-AZ, pesos en el endpoint o cambiar la clase de instancia no determinan directamente el orden de promocion."
  },
  {
    id: "saa-486",
    dominio: 2,
    tema: "RDS Multi-AZ",
    tipo: "single",
    enunciado: "Una aplicacion usa una base RDS for PostgreSQL Single-AZ. El equipo quiere mayor disponibilidad ante el fallo de una zona de disponibilidad con failover automatico y sin cambios en la cadena de conexion de la aplicacion. ¿Que deben hacer?",
    opciones: ["Crear una read replica en otra AZ y conectarse a ella", "Habilitar el despliegue Multi-AZ de la instancia RDS", "Migrar a Aurora Serverless v1", "Programar snapshots automaticos cada hora"],
    correctas: [1],
    explicacion: "Multi-AZ de RDS crea una replica en espera (standby) sincrona en otra AZ y realiza failover automatico manteniendo el mismo endpoint DNS, sin cambiar la cadena de conexion. Una read replica no hace failover automatico y requiere promocion manual y cambio de endpoint. Los snapshots no aportan failover automatico de alta disponibilidad."
  },
  {
    id: "saa-487",
    dominio: 2,
    tema: "RDS read replica",
    tipo: "single",
    enunciado: "Una empresa quiere reducir la carga de lectura de su base RDS for MySQL y, ademas, poder promover ese recurso a base independiente para recuperarse en otra Region si la principal falla. ¿Que opcion cumple ambos objetivos?",
    opciones: ["Un despliegue Multi-AZ en la Region principal", "Una read replica cross-Region que puede promoverse a base independiente", "Copias de snapshot cross-Region cada 12 horas", "AWS Backup con vault lock en la Region principal"],
    correctas: [1],
    explicacion: "Una read replica cross-Region descarga lecturas y puede promoverse a una base independiente para DR en otra Region. Multi-AZ no descarga lecturas ni protege ante fallo regional. Los snapshots cada 12 horas dan un RPO alto. AWS Backup en la misma Region no protege contra un fallo regional ni descarga lecturas."
  },
  {
    id: "saa-488",
    dominio: 2,
    tema: "DynamoDB Global Tables",
    tipo: "multiple",
    enunciado: "Una aplicacion movil necesita lecturas y escrituras de baja latencia para usuarios en Norteamerica y Europa, con replicacion automatica multi-Region y capacidad de escritura en cualquier Region (multi-activo). El equipo evalua resiliencia y proteccion de datos. ¿Que dos medidas cumplen estos requisitos? (Elija dos)",
    opciones: ["Usar DynamoDB Global Tables para replicacion multi-Region activo/activo", "Habilitar Point-in-Time Recovery (PITR) en las tablas para proteger contra cambios accidentales", "Usar Aurora Global Database, que permite escrituras simultaneas en todas las Regiones", "Usar DynamoDB de una sola Region con DAX para replicar entre continentes", "Confiar en RDS Multi-AZ con read replicas cross-Region como solucion multi-activo"],
    correctas: [0, 1],
    explicacion: "DynamoDB Global Tables ofrece replicacion multi-Region activo/activo con lecturas y escrituras de baja latencia en cada Region, y PITR protege contra escrituras o borrados accidentales. Aurora Global Database acepta escrituras solo en la primaria (write forwarding es limitado). DynamoDB de una sola Region con DAX no replica entre Regiones. RDS Multi-AZ no es multi-activo."
  },
  {
    id: "saa-489",
    dominio: 2,
    tema: "DynamoDB PITR",
    tipo: "single",
    enunciado: "Un equipo quiere protegerse contra escrituras o borrados accidentales en una tabla DynamoDB pudiendo restaurar a cualquier segundo de los ultimos 35 dias. ¿Que funcionalidad deben habilitar?",
    opciones: ["DynamoDB Streams", "Point-in-Time Recovery (PITR)", "Global Tables", "TTL en la tabla"],
    correctas: [1],
    explicacion: "Point-in-Time Recovery (PITR) permite restaurar una tabla DynamoDB a cualquier punto en el tiempo dentro de los ultimos 35 dias, protegiendo contra cambios accidentales. DynamoDB Streams captura cambios pero no restaura. Global Tables replica entre Regiones. TTL elimina elementos expirados y no aporta recuperacion."
  },
  {
    id: "saa-490",
    dominio: 2,
    tema: "S3 RTC",
    tipo: "single",
    enunciado: "Una empresa replica objetos de S3 a otra Region y requiere garantizar por SLA que el 99.99% de los objetos nuevos se repliquen en 15 minutos, con metricas y eventos de replicacion. ¿Que debe configurar?",
    opciones: ["S3 Cross-Region Replication estandar sin opciones adicionales", "S3 Replication Time Control (RTC)", "S3 Transfer Acceleration", "S3 Batch Replication"],
    correctas: [1],
    explicacion: "S3 Replication Time Control (RTC) ofrece un SLA que replica el 99.99% de los objetos en 15 minutos e incluye metricas y eventos de replicacion. La replicacion estandar no garantiza tiempos. Transfer Acceleration acelera subidas via edge, no la replicacion. Batch Replication replica objetos existentes pero no aporta el SLA de tiempo para objetos nuevos."
  },
  {
    id: "saa-491",
    dominio: 2,
    tema: "S3 Batch Replication",
    tipo: "single",
    enunciado: "Una empresa habilito la replicacion en un bucket S3 que ya contenia millones de objetos cargados antes de activar la regla. Necesitan replicar tambien esos objetos preexistentes a la Region destino. ¿Que deben usar?",
    opciones: ["S3 Batch Replication", "S3 Lifecycle para volver a copiar los objetos", "S3 Replication Time Control", "Volver a subir manualmente cada objeto"],
    correctas: [0],
    explicacion: "S3 Batch Replication replica objetos existentes que se cargaron antes de configurar la regla de replicacion, asi como los que fallaron previamente. Las reglas de Lifecycle gestionan transiciones y expiracion, no replican objetos. RTC solo aplica a objetos nuevos. Resubir manualmente es inviable a esa escala."
  },
  {
    id: "saa-492",
    dominio: 2,
    tema: "AWS Backup Vault Lock",
    tipo: "single",
    enunciado: "Para cumplir con requisitos regulatorios, una empresa necesita que las copias de seguridad gestionadas por AWS Backup no puedan eliminarse ni acortarse en su periodo de retencion, ni siquiera por la cuenta root, durante el periodo obligatorio. ¿Que deben aplicar?",
    opciones: ["Politica de ciclo de vida en el vault", "AWS Backup Vault Lock en modo compliance", "Cifrado del vault con KMS", "MFA Delete en el vault"],
    correctas: [1],
    explicacion: "AWS Backup Vault Lock en modo compliance hace que los backups sean inmutables (modelo WORM): no se pueden eliminar ni se puede acortar la retencion durante el periodo bloqueado, ni siquiera por root. El cifrado protege la confidencialidad pero no la inmutabilidad. MFA Delete es para versiones de S3. Las politicas de ciclo de vida no garantizan inmutabilidad regulatoria."
  },
  {
    id: "saa-493",
    dominio: 2,
    tema: "AWS Backup cross-account",
    tipo: "single",
    enunciado: "Una organizacion con AWS Organizations quiere centralizar las copias de seguridad de todas sus cuentas en una cuenta de seguridad dedicada y en otra Region, para proteger contra el compromiso de una cuenta individual. ¿Que capacidad de AWS Backup usan?",
    opciones: ["Copia cross-account y cross-Region a un vault en la cuenta de seguridad", "Solo snapshots automaticos en cada cuenta", "Replicacion de EBS entre cuentas con DLM", "Compartir manualmente los snapshots con la cuenta de seguridad"],
    correctas: [0],
    explicacion: "AWS Backup admite copia cross-account y cross-Region hacia un vault de respaldo en una cuenta dedicada, integrado con AWS Organizations. Esto aisla los backups del compromiso de una cuenta y de un fallo regional. Los snapshots locales no centralizan ni protegen contra una cuenta comprometida. DLM y el compartir manual no ofrecen la gestion centralizada por organizacion."
  },
  {
    id: "saa-494",
    dominio: 2,
    tema: "AWS Backup restore testing",
    tipo: "single",
    enunciado: "Un equipo de cumplimiento necesita validar periodicamente y de forma automatizada que sus copias de seguridad en AWS Backup pueden restaurarse correctamente, generando evidencia auditable. ¿Que funcionalidad usan?",
    opciones: ["Backup Vault Lock", "AWS Backup restore testing (pruebas de restauracion automatizadas)", "AWS Config con reglas administradas", "Lifecycle a almacenamiento en frio"],
    correctas: [1],
    explicacion: "AWS Backup restore testing automatiza pruebas periodicas de restauracion y valida que los recursos se recuperan correctamente, dejando evidencia para auditoria. Vault Lock garantiza inmutabilidad pero no prueba restauraciones. AWS Config evalua configuraciones, no realiza restauraciones de prueba. El ciclo de vida en frio solo abarata el almacenamiento."
  },
  {
    id: "saa-495",
    dominio: 2,
    tema: "Route 53 ARC",
    tipo: "multiple",
    enunciado: "Una empresa con una aplicacion activo/pasivo en dos Regiones quiere un mecanismo de failover muy fiable que no dependa solo de los health checks de DNS y que permita cambiar el trafico de forma controlada y auditada, incluso bajo presion. ¿Que dos capacidades de Route 53 Application Recovery Controller (ARC) abordan estos requisitos? (Elija dos)",
    opciones: ["Routing controls que actuan como interruptores manuales fiables para conmutar el trafico", "Readiness checks que verifican continuamente que la Region de recuperacion esta preparada", "Latency-based routing para repartir trafico activo/activo entre las Regiones", "Origin failover de CloudFront para conmutar entre Regiones", "Endpoints ponderados de AWS Global Accelerator para el failover regional"],
    correctas: [0, 1],
    explicacion: "ARC proporciona routing controls (interruptores manuales muy fiables para conmutar trafico) y readiness checks (verificacion continua de que la Region objetivo esta lista). Juntos dan un failover robusto y auditado que no depende solo de health checks de DNS. El latency-based routing es para activo/activo, no para esta conmutacion controlada. CloudFront y Global Accelerator no aportan el control auditado de ARC."
  },
  {
    id: "saa-496",
    dominio: 2,
    tema: "Route 53 ARC readiness",
    tipo: "single",
    enunciado: "En Route 53 Application Recovery Controller, el equipo quiere recibir alertas continuas si la Region de recuperacion no tiene la capacidad y configuracion suficientes para asumir el trafico antes de que ocurra un desastre. ¿Que componente de ARC proporciona esto?",
    opciones: ["Routing controls", "Readiness checks", "Safety rules", "Cluster endpoints"],
    correctas: [1],
    explicacion: "Los readiness checks de ARC monitorizan de forma continua que la Region de recuperacion este preparada (capacidad, cuotas, configuracion replicada) para asumir el trafico. Los routing controls son los interruptores de conmutacion. Las safety rules evitan acciones peligrosas. Los cluster endpoints son los puntos de acceso al cluster de ARC, no la verificacion de preparacion."
  },
  {
    id: "saa-497",
    dominio: 2,
    tema: "Auto Scaling warm pools",
    tipo: "single",
    enunciado: "Una aplicacion con un arranque (bootstrap) muy largo necesita responder a picos de trafico en segundos mediante Auto Scaling, evitando el tiempo de inicializacion de instancias completamente nuevas. ¿Que caracteristica de EC2 Auto Scaling deben usar?",
    opciones: ["Warm pools (grupos en caliente)", "Predictive scaling", "Lifecycle hooks de terminacion", "Capacity rebalancing"],
    correctas: [0],
    explicacion: "Los warm pools mantienen un conjunto de instancias preinicializadas (detenidas o hibernadas) listas para entrar en servicio rapidamente, evitando el largo arranque al escalar. Predictive scaling anticipa la demanda pero no elimina el tiempo de bootstrap. Los lifecycle hooks de terminacion gestionan la baja. Capacity rebalancing aborda interrupciones de Spot."
  },
  {
    id: "saa-498",
    dominio: 2,
    tema: "Auto Scaling instance refresh",
    tipo: "single",
    enunciado: "Un equipo necesita desplegar una nueva AMI en todas las instancias de un Auto Scaling Group de forma gradual y controlada, reemplazandolas en lotes y manteniendo un porcentaje minimo saludable durante el proceso. ¿Que mecanismo deben usar?",
    opciones: ["Instance refresh con un MinHealthyPercentage configurado", "Terminar manualmente las instancias una por una", "Suspender el proceso de Launch del ASG", "Cambiar el tipo de instancia en la launch template"],
    correctas: [0],
    explicacion: "Instance refresh reemplaza progresivamente las instancias del ASG con la nueva configuracion o AMI, respetando el porcentaje minimo saludable y un tiempo de calentamiento entre lotes. Terminar instancias a mano es propenso a errores y no controla la salud. Suspender Launch detiene el escalado. Cambiar la plantilla solo afecta a instancias futuras, no a las existentes."
  },
  {
    id: "saa-499",
    dominio: 2,
    tema: "Auto Scaling predictive",
    tipo: "single",
    enunciado: "Una tienda online tiene patrones de trafico ciclicos y predecibles cada dia y semana. Quiere que la capacidad este aprovisionada justo antes de los picos recurrentes en lugar de reaccionar tarde a ellos. ¿Que politica de Auto Scaling es la mas adecuada?",
    opciones: ["Predictive scaling", "Simple scaling con un cooldown largo", "Manual scaling con valores fijos", "Scheduled scaling con un solo horario diario"],
    correctas: [0],
    explicacion: "Predictive scaling usa machine learning sobre el historial para anticipar picos recurrentes y aprovisionar capacidad por adelantado, ideal para patrones ciclicos. El simple scaling reacciona despues del pico. El manual fijo desperdicia o queda corto. El scheduled scaling con un unico horario no captura todos los patrones diarios y semanales variables."
  },
  {
    id: "saa-500",
    dominio: 2,
    tema: "Auto Scaling health check grace",
    tipo: "single",
    enunciado: "Las instancias de un ASG con health checks de ELB se marcan como no saludables y se reemplazan antes de terminar de arrancar la aplicacion, generando un ciclo de reemplazos. ¿Que ajuste resuelve el problema?",
    opciones: ["Aumentar el health check grace period del ASG", "Reducir el cooldown a cero", "Cambiar a health checks de tipo EC2 unicamente", "Desactivar el balanceador de carga"],
    correctas: [0],
    explicacion: "El health check grace period define cuanto espera el ASG tras lanzar una instancia antes de evaluar su salud, dando tiempo a que la aplicacion arranque. Aumentarlo evita reemplazos prematuros. Reducir el cooldown no ayuda. Usar solo health checks EC2 ignoraria fallos de la aplicacion. Desactivar el balanceador rompe el enrutamiento de trafico."
  },
  {
    id: "saa-501",
    dominio: 2,
    tema: "Auto Scaling lifecycle hooks",
    tipo: "single",
    enunciado: "Antes de que el ASG termine una instancia, el equipo necesita vaciar conexiones y subir los logs a S3. Quieren pausar la terminacion hasta completar estas tareas. ¿Que mecanismo usan?",
    opciones: ["Lifecycle hook en el estado Terminating con accion personalizada", "Connection draining solo en el balanceador", "Health check grace period mas largo", "Termination policy OldestInstance"],
    correctas: [0],
    explicacion: "Un lifecycle hook en el estado Terminating:Wait pausa la instancia, permitiendo ejecutar acciones (vaciar conexiones, subir logs) antes de completar la terminacion. El connection draining del balanceador solo vacia conexiones en transito, no sube logs. El grace period es para el arranque. La termination policy solo decide cual instancia se termina, no ejecuta tareas previas."
  },
  {
    id: "saa-502",
    dominio: 2,
    tema: "Spot capacity rebalancing",
    tipo: "single",
    enunciado: "Un ASG usa instancias Spot para una flota de procesamiento web tras un ALB. El equipo quiere que Auto Scaling lance reemplazos de forma proactiva cuando una instancia Spot esta en riesgo elevado de interrupcion, antes de recibir el aviso de dos minutos. ¿Que deben habilitar?",
    opciones: ["Capacity Rebalancing", "Spot Instance request de tipo persistent", "Predictive scaling", "Warm pools"],
    correctas: [0],
    explicacion: "Capacity Rebalancing hace que EC2 Auto Scaling lance proactivamente una instancia de reemplazo cuando una Spot recibe una recomendacion de rebalanceo (riesgo elevado de interrupcion), antes incluso del aviso de dos minutos. Las solicitudes persistent solo reintentan tras la interrupcion. Predictive scaling y warm pools no abordan especificamente las interrupciones de Spot."
  },
  {
    id: "saa-503",
    dominio: 2,
    tema: "SQS DLQ",
    tipo: "multiple",
    enunciado: "Mensajes de una cola SQS estandar que no pueden procesarse correctamente bloquean el flujo al reaparecer indefinidamente. El equipo quiere apartar esos mensajes tras varios intentos fallidos para analizarlos despues y poder reintroducirlos cuando se corrija el error. ¿Que dos acciones cumplen estos objetivos? (Elija dos)",
    opciones: ["Configurar una redrive policy con una dead-letter queue y un maxReceiveCount", "Usar el redrive (DLQ redrive) para devolver los mensajes corregidos de la DLQ a la cola origen", "Aumentar el visibility timeout al maximo para que dejen de reaparecer", "Convertir la cola a FIFO para descartar automaticamente los mensajes venenosos", "Habilitar long polling para mover los mensajes fallidos fuera de la cola"],
    correctas: [0, 1],
    explicacion: "La redrive policy con una DLQ y maxReceiveCount aparta los mensajes que superan ese numero de recepciones fallidas, y la funcion de DLQ redrive permite devolverlos a la cola origen una vez corregido el problema. Aumentar el visibility timeout solo retrasa la reaparicion. FIFO no descarta mensajes venenosos. Long polling reduce llamadas vacias, no aparta mensajes fallidos."
  },
  {
    id: "saa-504",
    dominio: 2,
    tema: "SQS FIFO dedup",
    tipo: "single",
    enunciado: "Un sistema de pagos requiere que los mensajes se procesen exactamente una vez y en orden, evitando duplicados aunque el productor reintente el envio dentro de una ventana de 5 minutos. ¿Que solucion de mensajeria cumple esto?",
    opciones: ["Cola SQS estandar con DLQ", "Cola SQS FIFO con deduplicacion de contenido o message deduplication ID", "Topico SNS estandar con reintentos", "Cola SQS estandar con long polling"],
    correctas: [1],
    explicacion: "Las colas SQS FIFO garantizan orden y procesamiento exactamente una vez, usando un message deduplication ID o la deduplicacion basada en contenido para descartar duplicados dentro de una ventana de 5 minutos. Las colas estandar ofrecen entrega al menos una vez (posibles duplicados) y orden de mejor esfuerzo. SNS estandar no garantiza orden ni deduplicacion."
  },
  {
    id: "saa-505",
    dominio: 2,
    tema: "EventBridge DLQ",
    tipo: "single",
    enunciado: "Una regla de Amazon EventBridge invoca una funcion Lambda como destino, pero cuando la entrega del evento falla repetidamente, los eventos se pierden. El equipo quiere capturar los eventos no entregables para reprocesarlos. ¿Que deben configurar?",
    opciones: ["Una dead-letter queue (SQS) en el target de la regla de EventBridge", "Reintentos infinitos en la regla", "Archivar todos los eventos con Event Archive", "Aumentar el timeout de la funcion Lambda"],
    correctas: [0],
    explicacion: "EventBridge permite asociar una dead-letter queue (una cola SQS) al destino de una regla; los eventos que no se entregan tras los reintentos van a la DLQ para inspeccion y reprocesamiento. Los reintentos no son infinitos y eventualmente se descartan sin DLQ. El Event Archive guarda todos los eventos para replay, no solo los fallidos. Aumentar el timeout no garantiza la captura de fallos de entrega."
  },
  {
    id: "saa-506",
    dominio: 2,
    tema: "Step Functions reintentos",
    tipo: "single",
    enunciado: "Un flujo de trabajo orquestado con AWS Step Functions debe reintentar automaticamente las tareas que fallan por errores transitorios con backoff exponencial y, si agotan los reintentos, ejecutar una rama de compensacion. ¿Que caracteristicas de Step Functions usan?",
    opciones: ["Campos Retry y Catch en los estados Task", "Una cola SQS entre cada estado", "Un Lambda destination de tipo OnFailure", "Un Map state con concurrencia limitada"],
    correctas: [0],
    explicacion: "En Step Functions, el campo Retry de un estado Task define reintentos con backoff exponencial para errores especificos, y el campo Catch redirige a un estado de manejo o compensacion cuando se agotan los reintentos. Las colas SQS o los destinations de Lambda no son el mecanismo nativo de orquestacion de reintentos del flujo. El Map state controla iteracion, no reintentos por error."
  },
  {
    id: "saa-507",
    dominio: 2,
    tema: "Sesion externa",
    tipo: "single",
    enunciado: "Una aplicacion web tras un ALB guarda el estado de sesion en memoria de cada instancia EC2, lo que provoca que los usuarios pierdan la sesion cuando una instancia se reemplaza por Auto Scaling. Se busca la solucion mas escalable y de baja latencia. ¿Que recomendarias?",
    opciones: ["Habilitar sticky sessions en el ALB indefinidamente", "Almacenar el estado de sesion en Amazon ElastiCache o DynamoDB", "Aumentar el tamano de las instancias EC2", "Guardar la sesion en el disco EBS de cada instancia"],
    correctas: [1],
    explicacion: "Externalizar el estado de sesion en un almacen compartido como ElastiCache (Redis) o DynamoDB hace la capa web sin estado, asi cualquier instancia atiende a cualquier usuario y los reemplazos no pierden sesiones. Las sticky sessions atan al usuario a una instancia que igual puede morir. Aumentar el tamano o usar EBS local no resuelve la perdida al reemplazar la instancia."
  },
  {
    id: "saa-508",
    dominio: 2,
    tema: "EFS Multi-AZ",
    tipo: "single",
    enunciado: "Varias instancias EC2 en distintas zonas de disponibilidad necesitan acceso compartido y concurrente a un sistema de archivos que permanezca disponible aunque falle una AZ completa, sin tener que gestionar la replicacion. ¿Que servicio de almacenamiento usan?",
    opciones: ["Volumenes EBS io2 compartidos entre AZ", "Amazon EFS con mount targets en multiples AZ", "Instance store de cada instancia", "Amazon FSx for Windows en una sola AZ"],
    correctas: [1],
    explicacion: "Amazon EFS almacena los datos de forma redundante en multiples AZ por defecto y se accede mediante mount targets en cada AZ, permitiendo acceso concurrente compartido y resistencia ante el fallo de una AZ sin gestionar replicacion. EBS es de una sola AZ (incluso io2 con Multi-Attach es intra-AZ). El instance store es efimero. FSx en una sola AZ no resiste el fallo de esa AZ."
  },
  {
    id: "saa-509",
    dominio: 2,
    tema: "EFS replication",
    tipo: "single",
    enunciado: "Una empresa necesita una copia de su sistema de archivos Amazon EFS en otra Region para recuperacion ante desastres, con un RPO bajo y administrada por AWS sin scripts personalizados de copia. ¿Que funcionalidad usan?",
    opciones: ["EFS Replication a un sistema de archivos en la Region de DR", "DataSync ejecutado manualmente una vez al mes", "Copiar archivos con rsync desde una instancia EC2", "Snapshots de EBS de la instancia que monta EFS"],
    correctas: [0],
    explicacion: "EFS Replication crea y mantiene de forma automatica una replica del sistema de archivos en otra Region (o AZ) con un RPO tipico de minutos, gestionada por AWS. DataSync mensual da un RPO de un mes. rsync manual es fragil y operativo. Los snapshots de EBS no capturan el contenido de EFS, que no se almacena en volumenes EBS."
  },
  {
    id: "saa-510",
    dominio: 2,
    tema: "EC2 Auto Recovery",
    tipo: "single",
    enunciado: "Una instancia EC2 que ejecuta una aplicacion de un solo nodo debe recuperarse automaticamente, conservando su ID de instancia, IP privada y volumenes EBS, si falla el hardware subyacente del host. ¿Que solucion aplica?",
    opciones: ["Simple/Automatic EC2 instance recovery (recuperacion automatica de la instancia)", "Colocar la instancia en un cluster placement group", "Un Auto Scaling Group con minimo y maximo de 1", "Habilitar terminacion protegida"],
    correctas: [0],
    explicacion: "La recuperacion automatica de instancias EC2 (mediante alarmas de CloudWatch o por defecto en instancias compatibles) reinicia la instancia en hardware sano conservando ID, IP privada, IPs elasticas y volumenes EBS ante fallos de hardware del host. Un cluster placement group afecta a la ubicacion, no recupera. Un ASG min/max 1 lanzaria una instancia nueva con distinto ID. La proteccion de terminacion no recupera."
  },
  {
    id: "saa-511",
    dominio: 2,
    tema: "Conectividad hibrida",
    tipo: "multiple",
    enunciado: "Una empresa usa una unica conexion AWS Direct Connect hacia su VPC para una carga critica y busca mayor resiliencia de forma economica. ¿Que dos afirmaciones son correctas al evaluar un respaldo con VPN site-to-site sobre Internet? (Elija dos)",
    opciones: ["Si la Direct Connect falla, el trafico puede conmutar a la VPN manteniendo la conectividad", "La VPN de respaldo es mas economica que aprovisionar una segunda Direct Connect dedicada", "Aumentar el ancho de banda de la unica Direct Connect aporta redundancia ante su fallo", "Una segunda Direct Connect en la misma ubicacion y proveedor elimina todos los puntos unicos de fallo", "Eliminar la Direct Connect y usar solo la VPN mejora la consistencia del rendimiento"],
    correctas: [0, 1],
    explicacion: "Una VPN site-to-site sobre Internet es un respaldo economico: si la DX falla, el trafico conmuta a la VPN manteniendo conectividad (con menor rendimiento), y cuesta menos que una segunda DX dedicada. Aumentar el ancho de banda no da redundancia. Una segunda DX en la misma ubicacion y proveedor comparte puntos de fallo. Solo VPN sobre Internet ofrece menor consistencia de rendimiento."
  },
  {
    id: "saa-512",
    dominio: 2,
    tema: "Direct Connect redundante",
    tipo: "single",
    enunciado: "Una entidad financiera requiere la maxima resiliencia de conectividad hibrida, sin depender de Internet, tolerando el fallo de un dispositivo o de una ubicacion completa de Direct Connect. ¿Que arquitectura cumple este objetivo?",
    opciones: ["Una sola Direct Connect con una VPN de respaldo", "Dos Direct Connect en dos ubicaciones (locations) distintas, idealmente con dispositivos y proveedores separados", "Dos VPN site-to-site sobre dos proveedores de Internet", "Una Direct Connect con dos VIF privadas"],
    correctas: [1],
    explicacion: "El maximo nivel de resiliencia de Direct Connect (modelo de maxima resiliencia de AWS) usa dos conexiones en dos ubicaciones de Direct Connect separadas, tolerando el fallo de un dispositivo o de una location completa sin depender de Internet. Una DX con VPN de respaldo o dos VIF en la misma conexion no toleran el fallo de la ubicacion. Las VPN dependen de Internet, con menor consistencia."
  },
  {
    id: "saa-513",
    dominio: 2,
    tema: "AWS Elastic Disaster Recovery",
    tipo: "single",
    enunciado: "Una empresa quiere implementar DR para servidores fisicos on-premises y maquinas virtuales hacia AWS, con replicacion continua a bajo costo manteniendo solo recursos de staging minimos y un RPO de segundos y RTO de minutos. ¿Que servicio usan?",
    opciones: ["AWS Backup", "AWS Elastic Disaster Recovery (DRS)", "AWS Database Migration Service", "Crear AMIs periodicas de cada servidor"],
    correctas: [1],
    explicacion: "AWS Elastic Disaster Recovery (DRS) replica continuamente servidores fisicos y virtuales a un area de staging de bajo costo en AWS, permitiendo un RPO de segundos y lanzar instancias completas en minutos (RTO bajo) ante un desastre. AWS Backup es para copias programadas, no replicacion continua. DMS migra bases de datos. Las AMIs periodicas dan un RPO alto y no cubren replicacion continua."
  },
  {
    id: "saa-514",
    dominio: 2,
    tema: "Multi-Region activo/activo",
    tipo: "single",
    enunciado: "Una aplicacion global sin estado debe enrutar a cada usuario hacia la Region que le ofrezca menor latencia, manteniendo ambas Regiones activas y sirviendo trafico simultaneamente. ¿Que politica de Route 53 deben usar?",
    opciones: ["Failover routing", "Latency-based routing entre las dos Regiones", "Weighted routing 50/50 fijo", "Geolocation routing por pais de residencia"],
    correctas: [1],
    explicacion: "El latency-based routing de Route 53 dirige a cada usuario a la Region que le da menor latencia de red, manteniendo ambas activas y sirviendo trafico (activo/activo). El failover es activo/pasivo. El weighted 50/50 no optimiza por latencia. El geolocation enruta por ubicacion geografica del usuario, no necesariamente por la menor latencia real medida."
  },
  {
    id: "saa-515",
    dominio: 2,
    tema: "Idempotencia",
    tipo: "single",
    enunciado: "Un servicio recibe reintentos de mensajes desde una cola SQS estandar, lo que puede provocar el doble procesamiento de una misma operacion (por ejemplo, cargar dos veces a una tarjeta). ¿Cual es la mejor practica para garantizar correctitud ante estos reintentos?",
    opciones: ["Disenar el procesamiento de forma idempotente usando un identificador unico de operacion", "Eliminar todos los reintentos de la cola", "Aumentar el visibility timeout a varias horas", "Cambiar a un topico SNS"],
    correctas: [0],
    explicacion: "Como SQS estandar entrega al menos una vez (posibles duplicados), el consumidor debe ser idempotente: usando un identificador unico de operacion para detectar y descartar reprocesos, la misma operacion no se aplica dos veces. Eliminar los reintentos provoca perdida de mensajes ante fallos. Aumentar el visibility timeout no elimina la posibilidad de duplicados. SNS no garantiza por si solo idempotencia."
  },
  {
    id: "saa-516",
    dominio: 2,
    tema: "Aurora clones rapidos",
    tipo: "single",
    enunciado: "Un equipo de QA necesita crear varias copias del cluster de produccion Aurora para pruebas, de forma casi instantanea y sin duplicar el costo de almacenamiento inicial de cada copia. ¿Que caracteristica de Aurora deben usar?",
    opciones: ["Aurora fast database cloning (clones rapidos)", "Restaurar un snapshot completo por cada copia", "Crear read replicas adicionales", "Exportar a S3 y volver a importar"],
    correctas: [0],
    explicacion: "Los clones rapidos de Aurora (fast database cloning) crean copias casi instantaneas usando un mecanismo copy-on-write: inicialmente comparten el almacenamiento con el origen y solo consumen espacio adicional cuando cambian datos, ideal para entornos de prueba. Restaurar snapshots completos es lento y costoso. Las read replicas no son copias independientes escribibles. Exportar e importar es lento y duplica almacenamiento."
  },
  {
    id: "saa-517",
    dominio: 2,
    tema: "Aurora Multi-AZ cluster",
    tipo: "single",
    enunciado: "Una carga transaccional necesita failover muy rapido (tipicamente bajo 35 segundos) y capacidad de descargar lecturas, usando un cluster con una instancia escritora y dos instancias lectoras en tres zonas de disponibilidad. ¿Que arquitectura de base de datos lo proporciona?",
    opciones: ["RDS Multi-AZ con instancia standby en una sola AZ adicional", "Amazon RDS Multi-AZ DB cluster con tres instancias en tres AZ", "RDS Single-AZ con una read replica", "Aurora Serverless v1 en una sola AZ"],
    correctas: [1],
    explicacion: "El despliegue Amazon RDS Multi-AZ DB cluster usa una instancia escritora y dos lectoras en tres AZ, con failover tipicamente menor a 35 segundos y la posibilidad de servir lecturas desde las instancias de reserva. El Multi-AZ clasico con un solo standby no permite leer del standby. Single-AZ con replica no tiene failover automatico rapido. Aurora Serverless v1 en una sola AZ no cumple la topologia descrita."
  },
  {
    id: "saa-518",
    dominio: 2,
    tema: "S3 replicacion bidireccional",
    tipo: "single",
    enunciado: "Una arquitectura activo/activo en dos Regiones necesita que los objetos escritos en cualquiera de los dos buckets S3 se repliquen al otro, manteniendo ambos sincronizados en ambos sentidos. ¿Que deben configurar?",
    opciones: ["Replicacion bidireccional (two-way) configurando reglas de replicacion en ambos buckets", "Una sola regla de replicacion del bucket A al B", "S3 Transfer Acceleration en ambos buckets", "Versionado sin reglas de replicacion"],
    correctas: [0],
    explicacion: "La replicacion bidireccional (two-way) se logra configurando reglas de replicacion en ambos buckets (A hacia B y B hacia A), con versionado habilitado, de modo que las escrituras en cualquiera se propagan al otro. Una sola regla replica en un solo sentido. Transfer Acceleration acelera transferencias pero no replica. El versionado por si solo no replica entre buckets."
  },
  {
    id: "saa-519",
    dominio: 2,
    tema: "SNS reintentos y DLQ",
    tipo: "multiple",
    enunciado: "Un topico SNS entrega notificaciones a un endpoint HTTPS que ocasionalmente esta caido. El equipo quiere que SNS reintente la entrega y, si finalmente falla, no pierda los mensajes sino que los capture para reprocesar. ¿Que dos configuraciones logran este comportamiento resiliente? (Elija dos)",
    opciones: ["Configurar una delivery (retry) policy de SNS con backoff para reintentar la entrega", "Asociar una dead-letter queue (redrive policy) a la suscripcion para capturar entregas fallidas", "Aumentar el numero de suscriptores del topico para evitar la perdida de mensajes", "Cambiar el endpoint de HTTPS a HTTP para acelerar la entrega", "Publicar manualmente el mismo mensaje varias veces hasta que el endpoint responda"],
    correctas: [0, 1],
    explicacion: "Una delivery/retry policy hace que SNS reintente la entrega con backoff, y una dead-letter queue (redrive policy) en la suscripcion captura los mensajes que siguen fallando tras los reintentos, para reprocesarlos. Mas suscriptores no evita la perdida. Cambiar a HTTP reduce la seguridad sin resolver el fallo. Publicar manualmente es operativo y propenso a errores."
  },
  {
    id: "saa-520",
    dominio: 2,
    tema: "EC2 placement resiliente",
    tipo: "single",
    enunciado: "Una aplicacion distribuida quiere reducir el riesgo de que un fallo correlacionado de hardware afecte a varias instancias EC2 a la vez, distribuyendolas en hardware subyacente distinto dentro de una AZ. ¿Que estrategia de placement group usan?",
    opciones: ["Cluster placement group", "Spread placement group", "Partition placement group con una sola particion", "No usar placement group y confiar en el tipo de instancia"],
    correctas: [1],
    explicacion: "Un spread placement group coloca cada instancia en hardware (rack) distinto, minimizando fallos correlacionados de hardware, ideal para pocas instancias criticas que deben aislarse entre si. El cluster placement group agrupa instancias cercanas para baja latencia, aumentando el riesgo correlacionado. Una sola particion no separa el hardware. No usar grupo no garantiza aislamiento de hardware."
  }
]);
