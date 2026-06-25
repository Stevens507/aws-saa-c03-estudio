window.BANCO = (window.BANCO || []).concat([
  {
    id: "saa-241",
    dominio: 4,
    tema: "EC2 modelos de precios",
    tipo: "single",
    enunciado: "Una empresa ejecuta una flota de servidores de aplicaciones en EC2 que debe estar siempre disponible las 24 horas con una carga base muy estable durante los proximos 3 anios. El equipo de finanzas quiere el MAYOR descuento posible pero necesita flexibilidad para cambiar de familia de instancia y de region segun evolucione la aplicacion. Que opcion de compra recomienda?",
    opciones: [
      "Compute Savings Plan a 3 anios con pago total por adelantado",
      "EC2 Instance Savings Plan a 3 anios sin pago por adelantado",
      "Reserved Instances Standard a 3 anios atadas a una zona de disponibilidad",
      "Spot Instances para toda la flota de produccion"
    ],
    correctas: [0],
    explicacion: "El Compute Savings Plan ofrece el maximo descuento a 3 anios con pago total por adelantado y permite cambiar de familia, tamanio, region, sistema operativo e incluso pasar a Fargate o Lambda, dando la flexibilidad pedida. El EC2 Instance Savings Plan da descuentos similares pero limita a una familia y region. Las RI Standard zonales no permiten cambiar de region. Spot no sirve para una carga base siempre disponible porque puede interrumpirse."
  },
  {
    id: "saa-242",
    dominio: 4,
    tema: "Spot Instances",
    tipo: "single",
    enunciado: "Un equipo de ciencia de datos ejecuta trabajos de procesamiento por lotes tolerantes a fallos que pueden reanudarse desde checkpoints si se interrumpen. Los trabajos no tienen plazo critico y se desea minimizar el costo de computo al maximo. Que estrategia de compra de EC2 es la mas economica para esta carga?",
    opciones: [
      "Instancias On-Demand en un Auto Scaling Group",
      "Spot Instances gestionadas con un Spot Fleet o un Auto Scaling Group mixto",
      "Reserved Instances Convertibles a 1 anio",
      "Dedicated Hosts con licencias propias"
    ],
    correctas: [1],
    explicacion: "Las cargas por lotes tolerantes a fallos y sin plazo critico son el caso de uso ideal de Spot Instances, que ofrecen hasta 90 por ciento de descuento sobre On-Demand. Como los trabajos reanudan desde checkpoints, la interrupcion de Spot es aceptable. On-Demand y las RI son mas caras y los Dedicated Hosts son el modelo mas costoso, justificado solo por requisitos de licenciamiento o cumplimiento."
  },
  {
    id: "saa-243",
    dominio: 4,
    tema: "S3 clases de almacenamiento",
    tipo: "single",
    enunciado: "Una empresa almacena imagenes que se acceden con frecuencia durante los primeros 30 dias y luego rara vez, pero cuando se necesitan deben recuperarse en milisegundos. Los patrones de acceso son impredecibles a largo plazo y el equipo no quiere administrar reglas manualmente. Que clase de almacenamiento S3 minimiza el costo sin sacrificar el acceso inmediato?",
    opciones: [
      "S3 Standard para todos los objetos de forma permanente",
      "S3 Intelligent-Tiering",
      "S3 Glacier Flexible Retrieval",
      "S3 One Zone-IA"
    ],
    correctas: [1],
    explicacion: "S3 Intelligent-Tiering mueve automaticamente los objetos entre niveles de acceso frecuente e infrecuente segun el patron real, sin cargos de recuperacion y manteniendo acceso en milisegundos, ideal cuando los patrones son impredecibles. Glacier Flexible Retrieval no ofrece recuperacion en milisegundos. One Zone-IA reduce durabilidad y requiere conocer el patron. Standard permanente no optimiza el costo de los objetos poco accedidos."
  },
  {
    id: "saa-244",
    dominio: 4,
    tema: "S3 Lifecycle y Glacier",
    tipo: "single",
    enunciado: "Una compania de servicios financieros debe conservar registros de auditoria durante 10 anios por regulacion. Los registros casi nunca se leen, pero si una auditoria los solicita, un plazo de recuperacion de hasta 12 horas es aceptable. Se busca el MENOR costo de almacenamiento posible. Que clase de almacenamiento S3 se debe usar?",
    opciones: [
      "S3 Standard-IA",
      "S3 Glacier Instant Retrieval",
      "S3 Glacier Deep Archive",
      "S3 Intelligent-Tiering nivel de acceso frecuente"
    ],
    correctas: [2],
    explicacion: "S3 Glacier Deep Archive es la clase de menor costo de S3, pensada para retencion a largo plazo (7 a 10 anios o mas) con recuperaciones muy raras donde un tiempo de hasta 12 horas es aceptable. Standard-IA y Glacier Instant Retrieval cuestan mas porque ofrecen acceso rapido. Intelligent-Tiering frecuente no es el nivel mas barato para datos de archivo profundo."
  },
  {
    id: "saa-245",
    dominio: 4,
    tema: "VPC Endpoints vs NAT Gateway",
    tipo: "single",
    enunciado: "Instancias EC2 en subredes privadas descargan grandes volumenes de datos desde S3 cada hora, generando un costo elevado de procesamiento y transferencia a traves de un NAT Gateway. Que cambio reduce ese costo manteniendo el acceso privado a S3?",
    opciones: [
      "Crear un Gateway VPC Endpoint para S3",
      "Aumentar el ancho de banda del NAT Gateway",
      "Mover las instancias a subredes publicas con IP elasticas",
      "Reemplazar el NAT Gateway por una NAT Instance mas grande"
    ],
    correctas: [0],
    explicacion: "Un Gateway VPC Endpoint para S3 permite que el trafico hacia S3 viaje por la red privada de AWS sin pasar por el NAT Gateway, eliminando los cargos por procesamiento y transferencia del NAT y sin costo por el endpoint de gateway. Aumentar el NAT no reduce su costo por GB. Mover a subredes publicas expone las instancias. Una NAT Instance sigue cobrando el trafico de salida."
  },
  {
    id: "saa-246",
    dominio: 4,
    tema: "CloudFront para reducir egress",
    tipo: "single",
    enunciado: "Un sitio web sirve grandes cantidades de imagenes y video estatico directamente desde un bucket S3 a usuarios globales, y la factura de transferencia de datos de salida es muy alta. Que solucion reduce el costo de egress y a la vez mejora la latencia?",
    opciones: [
      "Habilitar Transfer Acceleration en el bucket S3",
      "Distribuir el contenido mediante Amazon CloudFront frente al bucket S3",
      "Replicar el bucket a varias regiones con Cross-Region Replication",
      "Cambiar la clase del bucket a S3 Standard-IA"
    ],
    correctas: [1],
    explicacion: "CloudFront cachea el contenido en ubicaciones de borde, por lo que la mayoria de las solicitudes se sirven desde la cache reduciendo el trafico de salida desde S3, y las tarifas de transferencia de CloudFront suelen ser menores ademas de mejorar la latencia global. Transfer Acceleration acelera cargas pero no reduce egress. La replicacion multiplica el almacenamiento. Cambiar la clase no reduce el costo de transferencia."
  },
  {
    id: "saa-247",
    dominio: 4,
    tema: "EBS gp3 vs gp2",
    tipo: "single",
    enunciado: "Una empresa tiene cientos de volumenes EBS de proposito general gp2 que estan sobreaprovisionados en IOPS porque para obtener mas rendimiento tuvieron que aumentar el tamanio. Quieren reducir el costo de almacenamiento y poder ajustar IOPS y rendimiento de forma independiente. Que accion recomienda?",
    opciones: [
      "Migrar los volumenes de gp2 a gp3",
      "Migrar los volumenes a io2 Block Express",
      "Convertir los volumenes a magneticos estandar",
      "Aumentar aun mas el tamanio de los volumenes gp2"
    ],
    correctas: [0],
    explicacion: "Los volumenes gp3 cuestan aproximadamente 20 por ciento menos por GB que gp2 y permiten configurar IOPS y throughput de forma independiente del tamanio, eliminando la necesidad de sobreaprovisionar capacidad solo para ganar rendimiento. io2 Block Express es mas caro y orientado a cargas criticas. Los magneticos son lentos. Aumentar el tamanio gp2 incrementa el costo."
  },
  {
    id: "saa-248",
    dominio: 4,
    tema: "Instance Scheduler dev/test",
    tipo: "single",
    enunciado: "Un equipo de desarrollo usa decenas de instancias EC2 y bases de datos RDS para ambientes de dev y test que solo se utilizan en horario laboral, de lunes a viernes de 8 a 18 horas. Actualmente corren todo el tiempo. Cual es la forma mas eficiente en costos de reducir el gasto?",
    opciones: [
      "Comprar Reserved Instances a 3 anios para esos ambientes",
      "Implementar el AWS Instance Scheduler para apagar los recursos fuera del horario laboral",
      "Migrar todos los ambientes a Spot Instances",
      "Reducir el tamanio de las instancias a la mitad"
    ],
    correctas: [1],
    explicacion: "El AWS Instance Scheduler automatiza el encendido y apagado de instancias EC2 y RDS segun un calendario, de modo que solo se paga por computo durante el horario laboral, ahorrando alrededor del 65 al 70 por ciento del tiempo. Las RI a 3 anios no convienen para recursos que pueden apagarse. Spot puede interrumpir el trabajo de desarrollo. Reducir el tamanio ahorra menos que apagarlos."
  },
  {
    id: "saa-249",
    dominio: 4,
    tema: "AWS Budgets",
    tipo: "single",
    enunciado: "El director financiero quiere recibir una alerta por correo cuando el gasto mensual de AWS supere los 10.000 dolares y tambien una prediccion que avise si se proyecta exceder ese monto antes de fin de mes. Que servicio cumple este requisito con el menor esfuerzo?",
    opciones: [
      "AWS Cost Explorer con informes diarios",
      "AWS Budgets con alertas por umbral real y previsto",
      "Amazon CloudWatch con una metrica personalizada de facturacion",
      "AWS Trusted Advisor en el plan basico"
    ],
    correctas: [1],
    explicacion: "AWS Budgets permite definir presupuestos de costo y enviar alertas tanto cuando el gasto real supera un umbral como cuando el gasto previsto (forecast) proyecta superarlo, notificando por correo o SNS. Cost Explorer analiza y visualiza costos pero no envia alertas de presupuesto. CloudWatch de facturacion solo alerta sobre el monto actual, no el previsto. Trusted Advisor basico no ofrece presupuestos."
  },
  {
    id: "saa-250",
    dominio: 4,
    tema: "Cost allocation tags",
    tipo: "single",
    enunciado: "Una organizacion ejecuta cargas de varios departamentos en una misma cuenta y necesita generar informes de costos desglosados por departamento y por proyecto. Que enfoque permite atribuir los costos de forma precisa?",
    opciones: [
      "Activar etiquetas de asignacion de costos (cost allocation tags) y filtrar en Cost Explorer",
      "Crear una cuenta separada por cada solicitud de informe",
      "Revisar manualmente cada recurso en la consola de facturacion",
      "Habilitar el cifrado de los datos de facturacion"
    ],
    correctas: [0],
    explicacion: "Las etiquetas de asignacion de costos permiten marcar los recursos con claves como Departamento o Proyecto; una vez activadas en la consola de facturacion, Cost Explorer y los informes de costo y uso pueden agrupar y filtrar el gasto por esas etiquetas. Crear cuentas por informe es excesivo. La revision manual no escala. El cifrado no tiene relacion con la atribucion de costos."
  },
  {
    id: "saa-251",
    dominio: 4,
    tema: "Consolidated billing Organizations",
    tipo: "multiple",
    enunciado: "Una empresa con muchas cuentas AWS quiere reducir costos centralizando la facturacion en AWS Organizations con facturacion consolidada. Cuales son DOS beneficios de costo reales de la facturacion consolidada? (Elija dos.)",
    opciones: [
      "Los descuentos por volumen por niveles se calculan sobre el uso combinado de todas las cuentas",
      "Las Reserved Instances y Savings Plans no usados en una cuenta pueden compartir su beneficio con otras cuentas de la organizacion",
      "Cada cuenta recibe automaticamente un 20 por ciento de descuento fijo",
      "Elimina por completo los cargos de transferencia de datos entre regiones",
      "Convierte todas las instancias On-Demand en Spot automaticamente"
    ],
    correctas: [0, 1],
    explicacion: "La facturacion consolidada agrega el uso de todas las cuentas para alcanzar antes los niveles de descuento por volumen, y permite que los beneficios de RI y Savings Plans no utilizados en una cuenta se apliquen a otras cuentas de la organizacion. No existe un descuento fijo automatico del 20 por ciento, no elimina la transferencia entre regiones ni convierte instancias a Spot."
  },
  {
    id: "saa-252",
    dominio: 4,
    tema: "Aurora Serverless",
    tipo: "single",
    enunciado: "Una aplicacion interna tiene un uso de base de datos muy variable e intermitente, con picos ocasionales y largos periodos de inactividad. Pagar por una instancia RDS aprovisionada las 24 horas resulta caro. Que opcion paga por uso y escala automaticamente con la demanda?",
    opciones: [
      "Amazon Aurora Serverless v2",
      "Amazon RDS Multi-AZ con una instancia grande",
      "Amazon Redshift con concurrency scaling",
      "Una instancia EC2 con MySQL autoadministrado"
    ],
    correctas: [0],
    explicacion: "Aurora Serverless v2 escala la capacidad de computo automaticamente hacia arriba y hacia abajo segun la carga y puede reducirse a una capacidad minima durante la inactividad, de modo que se paga en funcion del uso real, ideal para cargas variables e intermitentes. RDS aprovisionado cobra de forma fija. Redshift es para analitica. EC2 autoadministrado tampoco escala a cero ni reduce el costo de inactividad."
  },
  {
    id: "saa-253",
    dominio: 4,
    tema: "DynamoDB On-Demand",
    tipo: "single",
    enunciado: "Una startup lanza una aplicacion nueva cuyo trafico de base de datos es totalmente impredecible y puede pasar de cero a miles de solicitudes por segundo sin aviso. Quieren evitar aprovisionar capacidad y pagar solo por las solicitudes reales. Que modo de capacidad de DynamoDB conviene?",
    opciones: [
      "Modo de capacidad aprovisionada con autoescalado",
      "Modo de capacidad On-Demand",
      "Capacidad aprovisionada con Reserved Capacity",
      "Una tabla con capacidad fija de 10.000 unidades de lectura"
    ],
    correctas: [1],
    explicacion: "El modo On-Demand de DynamoDB cobra por solicitud y escala instantaneamente sin necesidad de planificar capacidad, ideal cuando el trafico es impredecible o nuevo. La capacidad aprovisionada, aunque tenga autoescalado, requiere estimaciones y reacciona mas lento. La Reserved Capacity conviene solo con uso constante y predecible. Una capacidad fija alta desperdicia dinero en periodos de baja carga."
  },
  {
    id: "saa-254",
    dominio: 4,
    tema: "AWS Compute Optimizer",
    tipo: "single",
    enunciado: "Un equipo sospecha que muchas de sus instancias EC2 estan sobredimensionadas, con baja utilizacion de CPU y memoria. Quieren recomendaciones automaticas y basadas en datos sobre el tamanio de instancia mas economico que cumpla la carga. Que servicio deben usar?",
    opciones: [
      "AWS Compute Optimizer",
      "AWS Config",
      "Amazon Inspector",
      "AWS Systems Manager Patch Manager"
    ],
    correctas: [0],
    explicacion: "AWS Compute Optimizer analiza las metricas de utilizacion historicas con aprendizaje automatico y recomienda el tipo y tamanio de instancia EC2 (y tambien Auto Scaling Groups, EBS, Lambda) que reduce el costo manteniendo el rendimiento, permitiendo el right-sizing. AWS Config audita configuraciones, Inspector evalua vulnerabilidades y Patch Manager gestiona parches, ninguno recomienda dimensionamiento por costo."
  },
  {
    id: "saa-255",
    dominio: 4,
    tema: "Transferencia cross-AZ",
    tipo: "single",
    enunciado: "Una aplicacion de tres capas envia grandes volumenes de trafico entre instancias EC2 de la capa web y de la capa de aplicacion. El arquitecto nota cargos elevados de transferencia de datos entre zonas de disponibilidad. Que cambio reduce ese costo manteniendo alta disponibilidad razonable?",
    opciones: [
      "Colocar las instancias que se comunican intensamente en la misma zona de disponibilidad usando grupos de ubicacion y mantener replicas en otra AZ",
      "Mover todas las instancias a regiones distintas",
      "Habilitar trafico cifrado entre zonas",
      "Aumentar el numero de zonas de disponibilidad de 2 a 4"
    ],
    correctas: [0],
    explicacion: "El trafico entre instancias en la MISMA zona de disponibilidad usando direcciones privadas no genera cargos de transferencia, mientras que el trafico cross-AZ si cuesta por GB en ambos sentidos. Agrupar las comunicaciones intensas en una misma AZ (sin renunciar a replicas en otra para HA) reduce el gasto. Cruzar regiones es aun mas caro, el cifrado no afecta el costo y mas AZs no lo reduce."
  },
  {
    id: "saa-256",
    dominio: 4,
    tema: "Recursos huerfanos EIP",
    tipo: "single",
    enunciado: "Tras una auditoria, el equipo descubre cargos inesperados por direcciones IP elasticas. Que situacion genera costos por una Elastic IP y como se elimina ese cargo?",
    opciones: [
      "Una Elastic IP asociada a una instancia en ejecucion; se elimina deteniendo la instancia",
      "Una Elastic IP asignada pero no asociada a ningun recurso en ejecucion; se elimina liberando la EIP no utilizada",
      "Una Elastic IP siempre es gratuita en cualquier circunstancia",
      "Una Elastic IP solo cobra si se usa con CloudFront; se elimina deshabilitando CloudFront"
    ],
    correctas: [1],
    explicacion: "AWS cobra por las Elastic IP que estan asignadas pero no asociadas a un recurso en ejecucion (o asociadas a recursos detenidos), para incentivar liberarlas. La forma de eliminar el cargo es liberar (release) las EIP huerfanas que no se usan. Una EIP en uso productivo ya no es gratuita bajo el nuevo esquema, pero el caso clasico de costo evitable es la EIP no asociada."
  },
  {
    id: "saa-257",
    dominio: 4,
    tema: "Lambda pago por uso",
    tipo: "single",
    enunciado: "Un endpoint de API recibe trafico muy esporadico, con solo unas pocas invocaciones por hora durante el dia. Actualmente corre en una instancia EC2 que esta encendida todo el tiempo. Que arquitectura reduce el costo cobrando solo cuando se procesa una solicitud?",
    opciones: [
      "Migrar la logica a AWS Lambda detras de Amazon API Gateway",
      "Cambiar la instancia EC2 a un tipo mas grande",
      "Comprar una Reserved Instance para la instancia EC2",
      "Agregar un Application Load Balancer a la instancia EC2"
    ],
    correctas: [0],
    explicacion: "AWS Lambda cobra solo por el numero de invocaciones y el tiempo de computo consumido, sin costo cuando no hay solicitudes, lo que es ideal para cargas esporadicas; combinado con API Gateway expone el endpoint sin servidores siempre encendidos. Aumentar la EC2 o comprar una RI mantiene el costo de tener el servidor encendido sin trafico. El ALB agrega costo sin resolver el problema."
  },
  {
    id: "saa-258",
    dominio: 4,
    tema: "Fargate serverless contenedores",
    tipo: "single",
    enunciado: "Una empresa ejecuta contenedores con cargas que aparecen y desaparecen durante el dia. No quieren administrar ni pagar por instancias EC2 subyacentes que queden ociosas entre tareas. Que opcion de computo para contenedores se ajusta mejor al objetivo de costo?",
    opciones: [
      "Amazon ECS o EKS sobre instancias EC2 reservadas",
      "AWS Fargate",
      "Contenedores en una sola instancia EC2 grande siempre encendida",
      "Amazon EC2 con Auto Scaling y On-Demand puro"
    ],
    correctas: [1],
    explicacion: "AWS Fargate ejecuta contenedores sin gestionar servidores y cobra por la vCPU y memoria que cada tarea consume mientras corre, evitando pagar por capacidad EC2 ociosa entre tareas. Las opciones basadas en EC2 implican pagar por la capacidad aprovisionada aunque no haya tareas en ejecucion, lo que desperdicia dinero con cargas intermitentes."
  },
  {
    id: "saa-259",
    dominio: 4,
    tema: "RDS Reserved Instances",
    tipo: "single",
    enunciado: "Una base de datos de produccion en Amazon RDS tiene una carga estable y predecible que correra durante al menos los proximos 2 anios sin cambios de tamanio. El equipo quiere reducir el costo respecto a On-Demand sin cambiar de motor ni de clase de instancia. Que opcion conviene?",
    opciones: [
      "RDS Reserved Instances a 1 o 3 anios para esa clase de instancia",
      "Migrar a Aurora Serverless v2",
      "Mantener On-Demand y apagar la base por las noches",
      "Migrar la base a una instancia EC2 con licencia propia"
    ],
    correctas: [0],
    explicacion: "Las Reserved Instances de RDS ofrecen hasta alrededor del 60 por ciento de descuento sobre On-Demand a cambio de comprometer una clase de instancia por 1 o 3 anios, ideal para cargas de produccion estables y predecibles. Aurora Serverless conviene para cargas variables, no estables. Apagar una base de produccion no es viable y migrar a EC2 agrega administracion y costo de licencia."
  },
  {
    id: "saa-260",
    dominio: 4,
    tema: "Savings Plans vs RI",
    tipo: "single",
    enunciado: "Una empresa quiere comprometer un gasto de computo por hora durante 1 anio para obtener descuento, pero necesita poder cambiar libremente entre EC2, AWS Fargate y AWS Lambda sin perder el descuento. Que modelo de compra cumple este requisito?",
    opciones: [
      "Compute Savings Plan",
      "EC2 Instance Savings Plan",
      "Reserved Instances Standard",
      "Reserved Instances Convertibles atadas a una sola familia"
    ],
    correctas: [0],
    explicacion: "El Compute Savings Plan aplica el descuento a un compromiso de gasto por hora que cubre EC2, Fargate y Lambda en cualquier region, familia o tamanio, dando la maxima flexibilidad pedida. El EC2 Instance Savings Plan se limita a una familia y region en EC2. Las RI Standard y Convertibles solo cubren EC2 (y servicios equivalentes), no Fargate ni Lambda."
  },
  {
    id: "saa-261",
    dominio: 4,
    tema: "S3 One Zone-IA",
    tipo: "single",
    enunciado: "Un equipo almacena copias secundarias de datos que pueden regenerarse facilmente a partir de la fuente original y se acceden con poca frecuencia. Quieren minimizar el costo de almacenamiento y no necesitan la durabilidad de multiples zonas porque los datos son reproducibles. Que clase de S3 es la mas adecuada?",
    opciones: [
      "S3 Standard",
      "S3 Standard-IA",
      "S3 One Zone-IA",
      "S3 Glacier Deep Archive"
    ],
    correctas: [2],
    explicacion: "S3 One Zone-IA almacena los datos en una sola zona de disponibilidad y cuesta cerca de 20 por ciento menos que Standard-IA, siendo ideal para datos de acceso infrecuente que son reproducibles o secundarios, donde la perdida ante un fallo de AZ es tolerable. Standard y Standard-IA pagan por durabilidad multi-AZ innecesaria aqui, y Glacier Deep Archive penaliza el acceso con tiempos de horas."
  },
  {
    id: "saa-262",
    dominio: 4,
    tema: "AWS Trusted Advisor costos",
    tipo: "multiple",
    enunciado: "Un arquitecto con plan de soporte Business quiere usar los chequeos de optimizacion de costos de AWS Trusted Advisor para encontrar ahorros. Cuales DOS hallazgos puede reportar la categoria de optimizacion de costos de Trusted Advisor? (Elija dos.)",
    opciones: [
      "Instancias EC2 con baja utilizacion que podrian reducirse o apagarse",
      "Direcciones IP elasticas asignadas pero no asociadas a recursos en ejecucion",
      "Vulnerabilidades de seguridad de software dentro del sistema operativo de las instancias",
      "El codigo fuente de las funciones Lambda que conviene refactorizar",
      "Las consultas SQL mas lentas de una base de datos RDS"
    ],
    correctas: [0, 1],
    explicacion: "La categoria de optimizacion de costos de AWS Trusted Advisor (planes Business o Enterprise) detecta instancias EC2 infrautilizadas, balanceadores ociosos, EIP asignadas pero no asociadas, volumenes sin uso y oportunidades de RI, entregando recomendaciones de ahorro. No analiza vulnerabilidades del sistema operativo (eso es Amazon Inspector), ni revisa el codigo de Lambda, ni perfila consultas SQL lentas (eso corresponde a Performance Insights)."
  },
  {
    id: "saa-263",
    dominio: 4,
    tema: "Cost Explorer",
    tipo: "single",
    enunciado: "El equipo de finanzas necesita visualizar tendencias de gasto de los ultimos 12 meses, identificar que servicios crecen mas y obtener recomendaciones de compra de Savings Plans basadas en el uso historico. Que herramienta cubre estas necesidades?",
    opciones: [
      "AWS Cost Explorer",
      "AWS Budgets",
      "AWS Pricing Calculator",
      "Amazon QuickSight sin datos de facturacion"
    ],
    correctas: [0],
    explicacion: "AWS Cost Explorer permite visualizar y analizar tendencias de costo y uso historico, desglosar por servicio y generar recomendaciones de Reserved Instances y Savings Plans a partir del consumo pasado. AWS Budgets sirve para fijar limites y alertas, no para analisis historico profundo. Pricing Calculator estima costos futuros antes de desplegar y QuickSight requiere conectar los datos manualmente."
  },
  {
    id: "saa-264",
    dominio: 4,
    tema: "S3 Storage Lens",
    tipo: "single",
    enunciado: "Una organizacion tiene cientos de buckets S3 en varias cuentas y quiere una vision unificada del uso de almacenamiento, identificar buckets con datos antiguos sin reglas de ciclo de vida y descubrir oportunidades de ahorro a nivel de toda la organizacion. Que herramienta entrega estas metricas y recomendaciones?",
    opciones: [
      "S3 Storage Lens",
      "S3 Inventory de un solo bucket",
      "AWS Config Rules",
      "S3 Access Points"
    ],
    correctas: [0],
    explicacion: "S3 Storage Lens ofrece visibilidad de uso y actividad de almacenamiento en todas las cuentas y buckets de una organizacion, con metricas y recomendaciones de optimizacion de costos como detectar buckets sin politicas de ciclo de vida o con datos no accedidos. S3 Inventory lista objetos de un bucket pero no da analitica global, Config audita configuraciones y Access Points gestionan acceso."
  },
  {
    id: "saa-265",
    dominio: 4,
    tema: "Logs de bajo costo",
    tipo: "multiple",
    enunciado: "Una aplicacion genera grandes volumenes de logs que rara vez se consultan, pero ocasionalmente el equipo necesita correr consultas SQL ad hoc sobre ellos sin mantener infraestructura encendida permanentemente. Cuales DOS decisiones minimizan el costo de almacenamiento y de consulta? (Elija dos.)",
    opciones: [
      "Almacenar los logs en Amazon S3 con una clase economica y reglas de ciclo de vida",
      "Consultar los logs directamente sobre S3 con Amazon Athena, pagando solo por datos escaneados",
      "Retener todos los logs indefinidamente en CloudWatch Logs sin expiracion",
      "Cargar todos los logs en un cluster de Amazon Redshift encendido las 24 horas",
      "Indexar todos los logs en un dominio de Amazon OpenSearch sobredimensionado"
    ],
    correctas: [0, 1],
    explicacion: "Guardar los logs en S3 con clases economicas y lifecycle reduce el costo de almacenamiento, y consultarlos con Amazon Athena cobra solo por los datos escaneados por consulta sin infraestructura encendida, lo que minimiza el costo para datos consultados rara vez. Retener todo en CloudWatch Logs es caro, y mantener Redshift u OpenSearch encendidos permanentemente para datos poco consultados desperdicia dinero."
  },
  {
    id: "saa-266",
    dominio: 4,
    tema: "Dedicated Hosts licenciamiento",
    tipo: "single",
    enunciado: "Una empresa tiene licencias de software comercial vinculadas a sockets y nucleos fisicos que quiere reutilizar en AWS para evitar comprar nuevas licencias, lo que representa un ahorro importante. Que opcion de EC2 le permite usar esas licencias Bring Your Own License con visibilidad del hardware fisico?",
    opciones: [
      "EC2 Dedicated Hosts",
      "EC2 Spot Instances",
      "Instancias On-Demand compartidas",
      "AWS Fargate"
    ],
    correctas: [0],
    explicacion: "Los EC2 Dedicated Hosts proporcionan un servidor fisico dedicado con visibilidad de sockets y nucleos, lo que permite usar licencias por socket o por nucleo bajo modelos Bring Your Own License y asi evitar el costo de licencias nuevas. Spot y On-Demand compartidas no exponen el hardware fisico para ese tipo de licenciamiento, y Fargate abstrae por completo los servidores."
  },
  {
    id: "saa-267",
    dominio: 4,
    tema: "Snapshots EBS huerfanos",
    tipo: "single",
    enunciado: "Una cuenta acumula miles de snapshots de EBS de volumenes que ya fueron eliminados hace tiempo, generando costos de almacenamiento crecientes. Se quiere reducir el gasto de forma automatica y continua sin eliminar manualmente cada snapshot. Que enfoque es el mas adecuado?",
    opciones: [
      "Usar Amazon Data Lifecycle Manager para crear politicas que retengan y eliminen snapshots automaticamente segun antiguedad",
      "Aumentar el tamanio de los volumenes EBS actuales",
      "Convertir los snapshots a volumenes io2",
      "Habilitar el cifrado en todos los snapshots existentes"
    ],
    correctas: [0],
    explicacion: "Amazon Data Lifecycle Manager (DLM) permite definir politicas que crean, retienen y eliminan automaticamente snapshots de EBS segun reglas de antiguedad o cantidad, controlando el crecimiento del costo sin intervencion manual. Aumentar volumenes o convertir a io2 incrementa el gasto, y cifrar snapshots no reduce su costo de almacenamiento."
  },
  {
    id: "saa-268",
    dominio: 4,
    tema: "Reserved Instances Convertibles",
    tipo: "single",
    enunciado: "Una empresa quiere comprometerse a 3 anios para obtener descuento sobre EC2, pero anticipa que durante ese periodo cambiara la familia de instancia y el sistema operativo a medida que modernice sus aplicaciones. Necesita descuento alto con capacidad de modificar los atributos de la reserva. Que opcion conviene?",
    opciones: [
      "Reserved Instances Convertibles a 3 anios",
      "Reserved Instances Standard a 3 anios",
      "Spot Instances",
      "On-Demand sin compromiso"
    ],
    correctas: [0],
    explicacion: "Las Reserved Instances Convertibles permiten intercambiar la reserva por otra de distinta familia, sistema operativo, tipo de tenencia o tamanio durante el plazo, a cambio de un descuento algo menor que las Standard pero con la flexibilidad necesaria cuando se anticipan cambios. Las RI Standard ofrecen mayor descuento pero no permiten cambiar la familia. Spot y On-Demand no entregan el compromiso de descuento a 3 anios."
  },
  {
    id: "saa-269",
    dominio: 4,
    tema: "S3 Glacier Instant Retrieval",
    tipo: "single",
    enunciado: "Un sistema de imagenes medicas archiva estudios que se acceden muy raramente (menos de una vez por trimestre), pero cuando un medico los solicita deben recuperarse en milisegundos. Se busca el menor costo de almacenamiento posible con acceso inmediato. Que clase de S3 conviene?",
    opciones: [
      "S3 Standard-IA",
      "S3 Glacier Instant Retrieval",
      "S3 Glacier Flexible Retrieval",
      "S3 Glacier Deep Archive"
    ],
    correctas: [1],
    explicacion: "S3 Glacier Instant Retrieval ofrece el costo de almacenamiento mas bajo entre las clases con acceso en milisegundos, pensado para datos archivados que se acceden rara vez (aproximadamente una vez por trimestre) pero requieren recuperacion inmediata. Standard-IA cuesta mas para acceso poco frecuente, y las clases Flexible y Deep Archive imponen tiempos de recuperacion de minutos a horas."
  },
  {
    id: "saa-270",
    dominio: 4,
    tema: "NAT Gateway optimizacion",
    tipo: "multiple",
    enunciado: "Una arquitectura con multiples zonas de disponibilidad enruta todo el trafico saliente de subredes privadas hacia internet y hacia servicios de AWS a traves de un unico NAT Gateway, generando costos altos por procesamiento de datos. Cuales DOS acciones reducen el costo del NAT manteniendo la funcionalidad? (Elija dos.)",
    opciones: [
      "Crear Gateway VPC Endpoints para S3 y DynamoDB para que ese trafico no pase por el NAT Gateway",
      "Crear Interface VPC Endpoints (PrivateLink) para los servicios de AWS soportados que generan mucho trafico por el NAT",
      "Eliminar todas las subredes privadas y mover las cargas a subredes publicas con EIP",
      "Reemplazar el NAT Gateway por mas NAT Gateways en todas las AZ sin otros cambios",
      "Deshabilitar por completo el acceso a internet de toda la VPC"
    ],
    correctas: [0, 1],
    explicacion: "Los Gateway VPC Endpoints para S3 y DynamoDB hacen que ese trafico evite el NAT Gateway sin costo de endpoint, y los Interface Endpoints (PrivateLink) permiten alcanzar de forma privada otros servicios de AWS sin pasar por el NAT, reduciendo los cargos por procesamiento del NAT. Mover todo a subredes publicas expone los recursos, agregar mas NAT Gateways sin endpoints no reduce el costo de datos y deshabilitar internet rompe la funcionalidad."
  },
  {
    id: "saa-271",
    dominio: 4,
    tema: "S3 Lifecycle transiciones",
    tipo: "single",
    enunciado: "Una empresa genera archivos de datos que se acceden mucho durante 30 dias, ocasionalmente durante los siguientes 60 dias, y casi nunca despues de 90 dias, debiendo conservarse 7 anios. Quieren automatizar el movimiento entre clases para minimizar el costo a lo largo del ciclo de vida. Que solucion implementa esto?",
    opciones: [
      "Una politica de ciclo de vida de S3 que transicione de Standard a Standard-IA y luego a Glacier Deep Archive segun la antiguedad",
      "Subir todo a S3 Glacier Deep Archive desde el inicio",
      "Mantener todos los objetos en S3 Standard durante 7 anios",
      "Copiar manualmente los archivos entre buckets cada mes"
    ],
    correctas: [0],
    explicacion: "Una politica de ciclo de vida de S3 puede transicionar automaticamente los objetos de Standard a Standard-IA tras 30 dias y luego a Glacier Deep Archive cuando dejan de accederse, optimizando el costo a lo largo del tiempo sin intervencion manual. Subir todo a Deep Archive impide el acceso inmediato inicial, dejar todo en Standard es caro y la copia manual no escala ni es confiable."
  },
  {
    id: "saa-272",
    dominio: 4,
    tema: "EC2 Instance Savings Plan",
    tipo: "single",
    enunciado: "Una empresa tiene una carga de produccion estable que correra de forma constante en la familia de instancias C5 dentro de una unica region durante 1 anio y no planea cambiar de familia ni de region. Quiere el mayor descuento posible para ese uso especifico, conservando flexibilidad de tamanio dentro de la familia. Que opcion conviene?",
    opciones: [
      "EC2 Instance Savings Plan para la familia C5 en esa region",
      "Compute Savings Plan",
      "On-Demand con Auto Scaling",
      "Spot Instances"
    ],
    correctas: [0],
    explicacion: "El EC2 Instance Savings Plan ofrece el mayor descuento (similar al de las RI Standard) a cambio de comprometerse a una familia de instancias en una region especifica, permitiendo aun cambiar de tamanio y sistema operativo dentro de esa familia, lo que encaja con una carga estable que no cambiara de familia ni region. El Compute Savings Plan da menor descuento por su flexibilidad. On-Demand y Spot no entregan ese compromiso de ahorro."
  },
  {
    id: "saa-273",
    dominio: 4,
    tema: "Lambda right-sizing memoria",
    tipo: "single",
    enunciado: "Una funcion Lambda fue configurada con mucha memoria por las dudas y ahora el equipo nota que el costo es mayor de lo esperado. Quieren encontrar la configuracion de memoria que ofrezca el mejor balance entre costo y rendimiento de forma automatica. Que herramienta ayuda con este ajuste?",
    opciones: [
      "AWS Lambda Power Tuning (o las recomendaciones de Compute Optimizer para Lambda)",
      "Aumentar siempre la memoria al maximo de 10240 MB",
      "Reducir el tiempo de espera (timeout) a 1 segundo",
      "Migrar la funcion a una instancia EC2 t2.micro"
    ],
    correctas: [0],
    explicacion: "AWS Lambda Power Tuning y las recomendaciones de AWS Compute Optimizer para Lambda analizan distintas configuraciones de memoria y muestran el punto optimo de costo y rendimiento, ya que en Lambda la CPU escala con la memoria asignada y un ajuste fino reduce el costo por invocacion. Maximizar la memoria suele encarecer, reducir el timeout puede provocar fallos y migrar a EC2 cambia el modelo de costo."
  },
  {
    id: "saa-274",
    dominio: 4,
    tema: "Volumenes EBS sin usar",
    tipo: "single",
    enunciado: "Tras terminar muchas instancias EC2, una cuenta acumulo numerosos volumenes EBS en estado disponible (no adjuntos a ninguna instancia) que siguen generando costo. Que accion elimina ese gasto recurrente de la forma mas directa?",
    opciones: [
      "Identificar y eliminar los volumenes EBS no adjuntos que ya no se necesitan, tras respaldarlos si corresponde",
      "Adjuntar todos los volumenes a una nueva instancia grande",
      "Convertir los volumenes a la clase io2",
      "Aumentar el periodo de retencion de snapshots"
    ],
    correctas: [0],
    explicacion: "Los volumenes EBS en estado disponible (no adjuntos) se cobran por GB aprovisionado aunque no esten en uso; eliminarlos cuando ya no se necesitan, creando un snapshot previo si pudiera requerirse el dato, elimina el costo recurrente. Adjuntarlos a una instancia o convertirlos a io2 aumenta el gasto, y modificar la retencion de snapshots no aborda el costo de los volumenes ociosos."
  },
  {
    id: "saa-275",
    dominio: 4,
    tema: "Cross-Region transfer costo",
    tipo: "single",
    enunciado: "Una aplicacion replica continuamente grandes volumenes de datos entre dos regiones de AWS para tener una copia secundaria, generando altos cargos de transferencia entre regiones. El requisito real es solo proteccion ante desastres con un objetivo de recuperacion flexible. Que cambio reduce el costo de transferencia cumpliendo el requisito?",
    opciones: [
      "Reemplazar la replicacion continua por copias periodicas comprimidas o usar replicacion solo de los datos que cambian segun el RPO permitido",
      "Aumentar el ancho de banda dedicado entre regiones",
      "Habilitar replicacion sincronica en tiempo real entre las dos regiones",
      "Mover ambas copias a la misma region y zona"
    ],
    correctas: [0],
    explicacion: "Cuando el requisito es DR con un objetivo de recuperacion flexible, reemplazar la replicacion continua por copias periodicas, comprimidas y solo de cambios reduce el volumen de datos transferidos entre regiones y por ende el costo, sin violar el RPO. Aumentar ancho de banda o usar replicacion sincronica encarece, y poner ambas copias en la misma region elimina la proteccion ante desastre regional."
  },
  {
    id: "saa-276",
    dominio: 4,
    tema: "Multiple - serverless pago por uso",
    tipo: "multiple",
    enunciado: "Una empresa quiere rediseniar una aplicacion con trafico intermitente para pagar estrictamente por uso y evitar capacidad ociosa. Cuales DOS combinaciones de servicios cumplen mejor el objetivo de pagar por uso? (Elija dos.)",
    opciones: [
      "AWS Lambda para el computo de las solicitudes",
      "Amazon DynamoDB en modo On-Demand para la base de datos",
      "Una instancia EC2 reservada a 3 anios encendida siempre",
      "Un cluster RDS aprovisionado de gran tamanio permanente",
      "Un Auto Scaling Group con capacidad minima fija alta de instancias On-Demand"
    ],
    correctas: [0, 1],
    explicacion: "AWS Lambda cobra solo por invocacion y tiempo de computo, y DynamoDB On-Demand cobra por solicitud sin capacidad aprovisionada, de modo que juntos pagan estrictamente por uso y no por capacidad ociosa, ideal para trafico intermitente. Una RI a 3 anios siempre encendida, un RDS aprovisionado permanente o un ASG con minimo alto implican pagar por capacidad reservada aunque no haya trafico."
  },
  {
    id: "saa-277",
    dominio: 4,
    tema: "S3 Intelligent-Tiering archivo",
    tipo: "single",
    enunciado: "Un data lake almacena objetos con patrones de acceso totalmente impredecibles: algunos vuelven a usarse despues de meses sin acceso. El equipo quiere optimizar costos automaticamente incluyendo niveles de archivo, sin riesgo de cargos de recuperacion inesperados ni administracion manual. Que configuracion conviene?",
    opciones: [
      "S3 Intelligent-Tiering con los niveles de archivo asincronico habilitados",
      "S3 Standard fijo para todos los objetos",
      "Una politica de ciclo de vida que envie todo a Glacier Deep Archive a los 30 dias",
      "S3 One Zone-IA para todos los objetos del data lake"
    ],
    correctas: [0],
    explicacion: "S3 Intelligent-Tiering mueve los objetos entre niveles de acceso frecuente, infrecuente y, si se habilitan, de archivo y archivo profundo asincronicos, optimizando el costo automaticamente sin cargos de recuperacion del propio mecanismo de tiering ni administracion manual, ideal para patrones impredecibles. Standard fijo no optimiza, una regla a Deep Archive a los 30 dias rompe el acceso de objetos que vuelven a usarse y One Zone-IA reduce la durabilidad de un data lake."
  },
  {
    id: "saa-278",
    dominio: 4,
    tema: "Multiple - alertas y control de costos",
    tipo: "multiple",
    enunciado: "Una empresa quiere implementar gobernanza de costos para evitar sorpresas en la factura y atribuir el gasto a equipos. Cuales DOS practicas la ayudan a lograr este control de costos? (Elija dos.)",
    opciones: [
      "Configurar AWS Budgets con alertas de costo real y previsto",
      "Activar etiquetas de asignacion de costos para reportar el gasto por equipo en Cost Explorer",
      "Eliminar AWS Organizations y usar una sola cuenta sin separacion",
      "Deshabilitar todas las alarmas de facturacion para evitar ruido",
      "Comprar el maximo de Reserved Instances posible sin analisis previo"
    ],
    correctas: [0, 1],
    explicacion: "AWS Budgets con alertas de costo real y previsto avisa antes de exceder los limites de gasto, y las etiquetas de asignacion de costos permiten atribuir y reportar el gasto por equipo en Cost Explorer, logrando gobernanza. Eliminar Organizations reduce la separacion administrativa, deshabilitar alarmas elimina la deteccion temprana y comprar RI sin analisis puede generar compromisos desperdiciados."
  },
  {
    id: "saa-279",
    dominio: 4,
    tema: "Aurora Serverless vs aprovisionado",
    tipo: "single",
    enunciado: "Un entorno de pruebas usa una base de datos compatible con MySQL que solo se utiliza unas pocas horas al dia de forma irregular y permanece inactiva el resto del tiempo. El equipo quiere pagar lo minimo posible durante la inactividad sin administrar servidores. Que opcion es la mas economica?",
    opciones: [
      "Amazon Aurora Serverless v2 que reduce su capacidad durante la inactividad",
      "Amazon RDS aprovisionado db.r5.large Multi-AZ siempre encendido",
      "Un cluster Aurora aprovisionado de tres replicas",
      "Una instancia EC2 con MySQL encendida las 24 horas"
    ],
    correctas: [0],
    explicacion: "Aurora Serverless v2 ajusta la capacidad de computo de forma automatica y la reduce a un minimo durante los largos periodos de inactividad de un entorno de pruebas de uso irregular, pagando mucho menos que una instancia aprovisionada siempre encendida y sin administrar servidores. RDS Multi-AZ aprovisionado, un cluster Aurora con replicas o EC2 24 horas cobran capacidad fija aunque la base este ociosa."
  },
  {
    id: "saa-280",
    dominio: 4,
    tema: "Pricing Calculator estimacion",
    tipo: "single",
    enunciado: "Antes de desplegar una nueva arquitectura, un equipo quiere estimar el costo mensual de la solucion propuesta (EC2, S3, RDS y transferencia de datos) para comparar varias alternativas de diseno y presentar el presupuesto a la gerencia. Que herramienta de AWS es la adecuada para esta estimacion previa al despliegue?",
    opciones: [
      "AWS Pricing Calculator",
      "AWS Cost Explorer sobre el gasto historico",
      "AWS Budgets",
      "AWS Trusted Advisor"
    ],
    correctas: [0],
    explicacion: "AWS Pricing Calculator permite modelar y estimar el costo mensual de servicios como EC2, S3, RDS y transferencia de datos antes de desplegar, comparando distintas alternativas de arquitectura para presentar un presupuesto. Cost Explorer analiza gasto ya incurrido, AWS Budgets fija limites y alertas sobre uso real y Trusted Advisor recomienda optimizaciones sobre recursos ya existentes, no estimaciones previas."
  }
]);
