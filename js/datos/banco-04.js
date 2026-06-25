window.BANCO = (window.BANCO || []).concat([
  {
    id: "saa-121",
    dominio: 1,
    tema: "IAM",
    tipo: "single",
    enunciado: "Una aplicacion que corre en una instancia Amazon EC2 necesita leer objetos de un bucket de Amazon S3. El equipo de desarrollo actualmente almacena las credenciales de un usuario IAM en un archivo de configuracion dentro de la instancia. El equipo de seguridad exige eliminar las credenciales de larga duracion. Que solucion cumple este requisito con el menor esfuerzo operativo?",
    opciones: [
      "Asignar un IAM Role a la instancia EC2 mediante un instance profile y eliminar las credenciales del archivo",
      "Rotar manualmente las credenciales del usuario IAM cada 30 dias usando un script programado",
      "Cifrar el archivo de configuracion con AWS KMS y dejar las credenciales del usuario IAM",
      "Mover las credenciales del usuario IAM a AWS Secrets Manager y leerlas al iniciar la aplicacion"
    ],
    correctas: [0],
    explicacion: "Un IAM Role asignado via instance profile entrega credenciales temporales que se rotan automaticamente, eliminando las credenciales de larga duracion sin esfuerzo operativo. Rotar o cifrar credenciales sigue dependiendo de claves estaticas. Secrets Manager guarda credenciales pero igual son de larga duracion del usuario IAM."
  },
  {
    id: "saa-122",
    dominio: 1,
    tema: "KMS",
    tipo: "single",
    enunciado: "Una empresa financiera debe cifrar grandes volumenes de datos en reposo en Amazon S3 usando claves administradas por el cliente. Por requisito regulatorio, la rotacion de la clave criptografica debe ocurrir automaticamente cada ano sin que cambie el ARN de la clave ni se requiera re-cifrar los datos existentes. Que opcion cumple este requisito?",
    opciones: [
      "Usar SSE-S3 con claves administradas por Amazon",
      "Usar una AWS KMS customer managed key con rotacion automatica de material criptografico habilitada",
      "Usar SSE-C y rotar manualmente la clave provista por el cliente cada ano",
      "Importar material de clave externo a KMS y reemplazarlo manualmente cada ano"
    ],
    correctas: [1],
    explicacion: "La rotacion automatica anual de una KMS customer managed key genera nuevo material criptografico conservando el mismo key ID y ARN, y KMS desencripta datos antiguos con el material previo, sin re-cifrar. SSE-S3 no es administrada por el cliente. SSE-C y el material importado no soportan rotacion automatica."
  },
  {
    id: "saa-123",
    dominio: 1,
    tema: "S3",
    tipo: "single",
    enunciado: "Una empresa de medios debe permitir que usuarios anonimos descarguen un archivo privado de Amazon S3 solo durante 15 minutos, sin hacer el objeto publico ni distribuir credenciales de AWS. Que mecanismo es el mas adecuado?",
    opciones: [
      "Habilitar el acceso publico de lectura en el bucket temporalmente",
      "Generar una presigned URL de S3 con un tiempo de expiracion de 15 minutos",
      "Crear un usuario IAM con permisos de solo lectura y compartir sus claves de acceso",
      "Configurar una bucket policy que permita s3:GetObject a Principal '*'"
    ],
    correctas: [1],
    explicacion: "Una presigned URL otorga acceso temporal y limitado a un objeto privado usando las credenciales del firmante, expirando en el tiempo configurado, sin exponer el objeto publicamente ni compartir credenciales. Las otras opciones exponen el bucket o credenciales de larga duracion."
  },
  {
    id: "saa-124",
    dominio: 1,
    tema: "Secrets Manager",
    tipo: "single",
    enunciado: "Una aplicacion necesita conectarse a una base de datos Amazon RDS. El equipo de seguridad requiere que la contrasena de la base de datos se rote automaticamente cada 30 dias sin downtime y sin cambios en el codigo de la aplicacion. Que servicio cumple mejor estos requisitos?",
    opciones: [
      "AWS Systems Manager Parameter Store con parametros SecureString",
      "AWS Secrets Manager con rotacion automatica habilitada e integracion con RDS",
      "Almacenar la contrasena cifrada en un objeto de Amazon S3 con SSE-KMS",
      "AWS KMS guardando la contrasena como material de clave"
    ],
    correctas: [1],
    explicacion: "AWS Secrets Manager soporta rotacion automatica nativa integrada con RDS mediante funciones Lambda gestionadas, sin cambios en el codigo si la app recupera el secreto dinamicamente. Parameter Store no incluye rotacion automatica nativa. S3 y KMS no rotan contrasenas de base de datos."
  },
  {
    id: "saa-125",
    dominio: 1,
    tema: "VPC Security",
    tipo: "single",
    enunciado: "Una empresa tiene instancias EC2 en una subred privada que necesitan acceder a Amazon S3 sin pasar por Internet, por razones de seguridad y costos. No quieren usar un NAT Gateway. Que solucion es la mas adecuada?",
    opciones: [
      "Crear un VPC gateway endpoint para Amazon S3 y actualizar la tabla de rutas de la subred privada",
      "Asignar IPs publicas a las instancias y restringir con Security Groups",
      "Configurar un bastion host que reenvie el trafico hacia S3",
      "Crear un Internet Gateway y rutas restringidas por NACL"
    ],
    correctas: [0],
    explicacion: "Un VPC gateway endpoint para S3 permite acceso privado desde la subred a S3 a traves de la red de AWS, sin Internet Gateway ni NAT Gateway y sin costo por hora del endpoint. Las demas opciones exponen las instancias a Internet o agregan saltos innecesarios."
  },
  {
    id: "saa-126",
    dominio: 1,
    tema: "Security Groups vs NACL",
    tipo: "single",
    enunciado: "Un arquitecto debe bloquear de forma explicita un rango de direcciones IP malicioso a nivel de subred, denegando ese trafico antes de que llegue a cualquier instancia. Que componente de red permite reglas de denegacion explicitas?",
    opciones: [
      "Un Security Group con una regla de denegacion entrante",
      "Una Network ACL con una regla de deny para el rango de IPs ofensivo",
      "Una bucket policy con condicion de IP",
      "Una IAM policy con condicion aws:SourceIp"
    ],
    correctas: [1],
    explicacion: "Las Network ACL operan a nivel de subred y soportan reglas de allow y deny explicitas, por lo que pueden bloquear rangos de IP. Los Security Groups solo permiten reglas de allow (lo no permitido se deniega implicitamente, pero no hay deny explicito). Las demas no aplican a trafico de red de subred."
  },
  {
    id: "saa-127",
    dominio: 1,
    tema: "GuardDuty",
    tipo: "single",
    enunciado: "Una empresa quiere detectar de forma continua actividad maliciosa y comportamiento anomalo en sus cuentas de AWS, analizando logs de VPC Flow Logs, CloudTrail y DNS, sin desplegar agentes en las instancias. Que servicio cumple este objetivo?",
    opciones: [
      "AWS Config",
      "Amazon Inspector",
      "Amazon GuardDuty",
      "AWS WAF"
    ],
    correctas: [2],
    explicacion: "Amazon GuardDuty es un servicio de deteccion de amenazas que analiza continuamente CloudTrail, VPC Flow Logs y logs de DNS para identificar actividad maliciosa, sin agentes. Config evalua cumplimiento de configuracion, Inspector evalua vulnerabilidades y WAF protege aplicaciones web."
  },
  {
    id: "saa-128",
    dominio: 1,
    tema: "Macie",
    tipo: "single",
    enunciado: "Una organizacion almacena grandes cantidades de datos en Amazon S3 y necesita descubrir automaticamente si hay informacion sensible como numeros de tarjetas de credito o datos personales (PII) almacenados sin proteccion. Que servicio es el indicado?",
    opciones: [
      "Amazon Macie",
      "Amazon GuardDuty",
      "AWS CloudTrail",
      "Amazon Inspector"
    ],
    correctas: [0],
    explicacion: "Amazon Macie usa machine learning para descubrir, clasificar y proteger datos sensibles como PII en Amazon S3. GuardDuty detecta amenazas, CloudTrail audita llamadas a la API e Inspector evalua vulnerabilidades de cargas de trabajo."
  },
  {
    id: "saa-129",
    dominio: 1,
    tema: "Organizations SCP",
    tipo: "single",
    enunciado: "Una empresa con AWS Organizations quiere impedir que cualquier cuenta miembro pueda crear recursos fuera de la region eu-west-1, independientemente de los permisos IAM que tengan los usuarios dentro de esas cuentas. Que mecanismo aplica este control de forma centralizada?",
    opciones: [
      "Una IAM policy adjunta a cada usuario en cada cuenta",
      "Una Service Control Policy (SCP) aplicada a la OU o cuentas que deniegue acciones fuera de eu-west-1",
      "Un permission boundary en el rol de administrador de cada cuenta",
      "Una NACL que bloquee el trafico a otras regiones"
    ],
    correctas: [1],
    explicacion: "Las SCPs definen el limite maximo de permisos para las cuentas en una Organization y pueden denegar acciones segun la condicion aws:RequestedRegion de forma centralizada, sin importar las politicas IAM individuales. Las IAM policies y permission boundaries deben gestionarse por cuenta y no son tan centralizadas."
  },
  {
    id: "saa-130",
    dominio: 1,
    tema: "ACM",
    tipo: "single",
    enunciado: "Una empresa necesita aprovisionar y renovar automaticamente certificados TLS publicos para un Application Load Balancer, sin pagar por los certificados ni gestionar renovaciones manuales. Que servicio cumple este requisito?",
    opciones: [
      "AWS Secrets Manager almacenando el certificado",
      "AWS Certificate Manager (ACM) emitiendo un certificado publico para el ALB",
      "AWS KMS generando el certificado TLS",
      "Comprar el certificado a una CA externa e importarlo a IAM"
    ],
    correctas: [1],
    explicacion: "AWS Certificate Manager provee certificados TLS publicos gratuitos y los renueva automaticamente cuando se usan con servicios integrados como ALB y CloudFront. KMS no emite certificados TLS, Secrets Manager solo los guarda y los certificados externos requieren gestion manual de renovacion."
  },
  {
    id: "saa-131",
    dominio: 1,
    tema: "WAF",
    tipo: "single",
    enunciado: "Una aplicacion web detras de un Application Load Balancer esta recibiendo ataques de inyeccion SQL y cross-site scripting. La empresa quiere filtrar estas solicitudes maliciosas a nivel de capa 7 antes de que lleguen a la aplicacion. Que servicio debe utilizar?",
    opciones: [
      "AWS Shield Standard",
      "AWS WAF con reglas administradas contra SQLi y XSS asociado al ALB",
      "Amazon GuardDuty",
      "Network ACL en la subred del ALB"
    ],
    correctas: [1],
    explicacion: "AWS WAF inspecciona solicitudes HTTP/HTTPS de capa 7 y permite reglas, incluidas managed rule groups, para bloquear inyeccion SQL y XSS, asociandose a ALB, CloudFront o API Gateway. Shield protege contra DDoS, GuardDuty detecta amenazas y NACL opera a capa 3/4."
  },
  {
    id: "saa-132",
    dominio: 1,
    tema: "Shield Advanced",
    tipo: "multiple",
    enunciado: "Una empresa de comercio electronico de alto perfil contrata AWS Shield Advanced para proteger su aplicacion. Cuales DOS beneficios obtiene Shield Advanced que NO ofrece Shield Standard? (Elegir DOS)",
    opciones: [
      "Acceso al Shield Response Team (SRT) durante incidentes DDoS activos",
      "Proteccion de costos (cost protection) ante cargos por escalado provocados por un ataque DDoS",
      "Cifrado en reposo automatico de los objetos de Amazon S3",
      "Inspeccion de vulnerabilidades CVE en instancias EC2",
      "Clasificacion automatica de datos sensibles (PII) en buckets de S3"
    ],
    correctas: [0, 1],
    explicacion: "Shield Advanced agrega acceso al Shield Response Team (SRT) y proteccion de costos ante escalado por ataques DDoS, ademas de proteccion mejorada de capa 3/4/7, beneficios que Shield Standard no incluye. El cifrado de S3, el escaneo de CVE (Inspector) y la clasificacion de PII (Macie) no son funciones de Shield."
  },
  {
    id: "saa-133",
    dominio: 1,
    tema: "IAM Cross-Account",
    tipo: "single",
    enunciado: "Una empresa tiene una cuenta de produccion y una cuenta de auditoria separadas. Los auditores en la cuenta de auditoria necesitan acceso de solo lectura temporal a recursos de la cuenta de produccion sin crear usuarios IAM en produccion. Que enfoque es el recomendado?",
    opciones: [
      "Crear usuarios IAM en produccion y compartir las claves con los auditores",
      "Crear un IAM Role en produccion con relacion de confianza hacia la cuenta de auditoria y usar STS AssumeRole",
      "Habilitar acceso publico de solo lectura a los recursos de produccion",
      "Replicar todos los recursos de produccion a la cuenta de auditoria"
    ],
    correctas: [1],
    explicacion: "El patron cross-account recomendado es crear un IAM Role en la cuenta de produccion que confie en la cuenta de auditoria; los auditores asumen el rol con STS AssumeRole obteniendo credenciales temporales de solo lectura. Crear usuarios o exponer recursos publicamente viola el minimo privilegio."
  },
  {
    id: "saa-134",
    dominio: 1,
    tema: "S3 Block Public Access",
    tipo: "single",
    enunciado: "Tras una auditoria, una empresa descubre que algunos buckets de Amazon S3 fueron expuestos accidentalmente por ACLs y bucket policies. Quieren garantizar a nivel de cuenta que ningun bucket pueda volverse publico, sin importar las politicas individuales. Que solucion aplica este control de forma global?",
    opciones: [
      "Habilitar S3 Block Public Access a nivel de cuenta",
      "Revisar manualmente cada bucket cada semana",
      "Aplicar cifrado SSE-KMS a todos los objetos",
      "Habilitar el versionado en todos los buckets"
    ],
    correctas: [0],
    explicacion: "S3 Block Public Access a nivel de cuenta anula cualquier ACL o bucket policy que intente otorgar acceso publico, garantizando que ningun bucket sea publico. El cifrado y el versionado protegen datos pero no impiden el acceso publico, y la revision manual es propensa a errores."
  },
  {
    id: "saa-135",
    dominio: 1,
    tema: "Cognito",
    tipo: "single",
    enunciado: "Una aplicacion movil necesita autenticar a sus usuarios finales mediante registro/inicio de sesion y soporte para proveedores sociales como Google y Facebook, gestionando un directorio de usuarios escalable. Que servicio de Amazon Cognito provee esta funcionalidad de autenticacion?",
    opciones: [
      "Cognito Identity Pools (federated identities)",
      "Cognito User Pools",
      "AWS Directory Service",
      "AWS IAM Identity Center"
    ],
    correctas: [1],
    explicacion: "Los Cognito User Pools son directorios de usuarios que gestionan registro, inicio de sesion y federacion con proveedores sociales y empresariales para autenticacion. Los Identity Pools sirven para otorgar credenciales temporales de AWS (autorizacion a recursos), no para el directorio de autenticacion."
  },
  {
    id: "saa-136",
    dominio: 1,
    tema: "S3 Encryption in Transit",
    tipo: "single",
    enunciado: "Una empresa debe garantizar que todas las solicitudes a un bucket de Amazon S3 se realicen exclusivamente sobre conexiones cifradas (HTTPS). Como puede hacer cumplir esto a nivel del bucket?",
    opciones: [
      "Habilitar SSE-S3 en el bucket",
      "Agregar una bucket policy con una condicion Deny cuando aws:SecureTransport es false",
      "Activar S3 Block Public Access",
      "Habilitar el versionado del bucket"
    ],
    correctas: [1],
    explicacion: "Una bucket policy que deniega solicitudes cuando la condicion aws:SecureTransport es false fuerza el uso de HTTPS (cifrado en transito). SSE-S3 cifra en reposo, no en transito; Block Public Access y el versionado no controlan el protocolo de transporte."
  },
  {
    id: "saa-137",
    dominio: 1,
    tema: "CloudTrail",
    tipo: "single",
    enunciado: "Un equipo de seguridad necesita un registro inmutable y auditable de todas las llamadas a la API de AWS realizadas en todas las regiones y cuentas de una Organization, para investigaciones forenses. Que servicio y configuracion cumplen este requisito?",
    opciones: [
      "Amazon CloudWatch Logs con retencion indefinida",
      "Un organization trail de AWS CloudTrail multi-region con validacion de integridad de logs",
      "AWS Config con reglas administradas",
      "VPC Flow Logs en todas las VPC"
    ],
    correctas: [1],
    explicacion: "AWS CloudTrail registra las llamadas a la API; un organization trail multi-region captura eventos de todas las cuentas y regiones, y la log file integrity validation garantiza que los logs no fueron alterados. Config evalua configuracion, CloudWatch Logs y VPC Flow Logs no registran todas las llamadas a la API de forma centralizada."
  },
  {
    id: "saa-138",
    dominio: 1,
    tema: "KMS Multi-Region",
    tipo: "single",
    enunciado: "Una aplicacion replica datos cifrados de Amazon DynamoDB entre us-east-1 y eu-west-1 usando Global Tables. La empresa quiere descifrar los datos en ambas regiones usando una clave KMS con el mismo material criptografico, sin llamadas entre regiones. Que tipo de clave debe usar?",
    opciones: [
      "Una customer managed key independiente en cada region",
      "Una AWS KMS multi-Region key con replicas en us-east-1 y eu-west-1",
      "Una AWS managed key compartida entre regiones",
      "Una clave SSE-C provista por el cliente"
    ],
    correctas: [1],
    explicacion: "Las KMS multi-Region keys permiten replicar una clave con el mismo material criptografico (mismo key ID base) en varias regiones, de modo que los datos cifrados en una region se descifran en otra sin llamadas cross-region. Claves independientes no comparten material y las AWS managed keys no se replican entre regiones."
  },
  {
    id: "saa-139",
    dominio: 1,
    tema: "Bastion Host",
    tipo: "single",
    enunciado: "Los administradores necesitan acceso SSH/RDP a instancias EC2 en subredes privadas. La empresa quiere evitar gestionar un bastion host con puertos abiertos a Internet y eliminar las llaves SSH de larga duracion. Que solucion AWS cumple mejor estos objetivos?",
    opciones: [
      "Abrir el puerto 22 al rango de IPs corporativo en el Security Group de cada instancia",
      "Usar AWS Systems Manager Session Manager para conectarse sin bastion ni puertos entrantes abiertos",
      "Asignar IPs publicas a las instancias privadas",
      "Crear un NAT Gateway que permita conexiones entrantes"
    ],
    correctas: [1],
    explicacion: "AWS Systems Manager Session Manager permite shell seguro a instancias sin abrir puertos entrantes, sin bastion host y sin gestionar llaves SSH, registrando ademas la sesion. Las otras opciones requieren puertos abiertos o exponen las instancias; un NAT Gateway no admite conexiones entrantes."
  },
  {
    id: "saa-140",
    dominio: 1,
    tema: "Inspector",
    tipo: "single",
    enunciado: "Una empresa quiere escanear automaticamente sus instancias EC2 y sus imagenes de contenedor en Amazon ECR en busca de vulnerabilidades de software conocidas (CVE) y exposicion de red no intencionada, de forma continua. Que servicio debe utilizar?",
    opciones: [
      "Amazon Inspector",
      "Amazon Macie",
      "AWS Config",
      "AWS Trusted Advisor"
    ],
    correctas: [0],
    explicacion: "Amazon Inspector evalua continuamente cargas de trabajo EC2, contenedores en ECR y funciones Lambda en busca de vulnerabilidades de software (CVE) y exposicion de red. Macie clasifica datos sensibles, Config evalua cumplimiento de configuracion y Trusted Advisor da recomendaciones generales."
  },
  {
    id: "saa-141",
    dominio: 1,
    tema: "IAM Permission Boundary",
    tipo: "single",
    enunciado: "Una empresa permite que los desarrolladores creen sus propios IAM Roles para sus aplicaciones, pero el equipo de seguridad necesita garantizar que ningun rol creado pueda tener mas permisos que un conjunto maximo definido. Que mecanismo de IAM aplica este limite?",
    opciones: [
      "Una Service Control Policy unicamente",
      "Un IAM permission boundary que limite los permisos maximos de los roles creados",
      "Una bucket policy de S3",
      "Un Security Group restrictivo"
    ],
    correctas: [1],
    explicacion: "Un IAM permission boundary define el maximo de permisos que una identidad puede tener; los permisos efectivos son la interseccion de la policy de permisos y el boundary. Esto permite delegar la creacion de roles limitando su alcance. Las SCP aplican a cuentas enteras y no a roles individuales delegados de esta forma."
  },
  {
    id: "saa-142",
    dominio: 1,
    tema: "S3 Object Lock",
    tipo: "single",
    enunciado: "Una entidad regulada debe almacenar registros financieros en Amazon S3 de modo que no puedan ser borrados ni modificados durante 7 anos, ni siquiera por el usuario root, cumpliendo un esquema WORM. Que caracteristica de S3 cumple este requisito?",
    opciones: [
      "Versionado de S3 unicamente",
      "S3 Object Lock en modo Compliance con un periodo de retencion de 7 anos",
      "Una bucket policy con Deny a s3:DeleteObject",
      "S3 Lifecycle policy que archive a Glacier"
    ],
    correctas: [1],
    explicacion: "S3 Object Lock en modo Compliance impone WORM: ningun usuario, incluido el root de la cuenta, puede borrar o sobrescribir el objeto antes de que expire el periodo de retencion. El versionado por si solo no impide borrados, las bucket policies pueden modificarse y Lifecycle no garantiza inmutabilidad."
  },
  {
    id: "saa-143",
    dominio: 1,
    tema: "Root Account",
    tipo: "single",
    enunciado: "Durante una revision de seguridad, se determina que la cuenta root de AWS se usa para tareas diarias. Que conjunto de practicas recomendadas se debe aplicar a la cuenta root?",
    opciones: [
      "Compartir las credenciales root con todo el equipo de operaciones",
      "Habilitar MFA en la cuenta root, dejar de usarla para tareas diarias y crear usuarios/roles IAM con privilegios adecuados",
      "Crear access keys para la cuenta root y usarlas en scripts de automatizacion",
      "Deshabilitar CloudTrail para reducir costos de auditoria"
    ],
    correctas: [1],
    explicacion: "Las mejores practicas para la cuenta root son habilitar MFA, no usarla para tareas diarias, no crear access keys para ella y delegar el trabajo a usuarios/roles IAM con minimo privilegio. Compartir credenciales o crear access keys de root incrementa el riesgo, y deshabilitar CloudTrail elimina la auditoria."
  },
  {
    id: "saa-144",
    dominio: 1,
    tema: "IAM Identity Center",
    tipo: "single",
    enunciado: "Una empresa con multiples cuentas en AWS Organizations quiere que sus empleados inicien sesion una sola vez con sus credenciales corporativas y accedan a todas las cuentas con permisos centralizados, sin gestionar usuarios IAM en cada cuenta. Que servicio cumple este objetivo?",
    opciones: [
      "Crear usuarios IAM identicos en cada cuenta",
      "AWS IAM Identity Center (anteriormente AWS SSO) con permission sets",
      "Amazon Cognito Identity Pools",
      "AWS Directory Service Simple AD por cuenta"
    ],
    correctas: [1],
    explicacion: "AWS IAM Identity Center proporciona acceso de inicio de sesion unico (SSO) centralizado a multiples cuentas de la Organization mediante permission sets, integrandose con el directorio corporativo, sin replicar usuarios IAM por cuenta. Cognito es para usuarios de aplicaciones, no para acceso administrativo a cuentas."
  },
  {
    id: "saa-145",
    dominio: 1,
    tema: "PrivateLink",
    tipo: "single",
    enunciado: "Un proveedor SaaS quiere exponer su servicio alojado en su VPC a clientes en otras VPCs de AWS de forma privada, sin exponerlo a Internet, sin VPC peering y sin solapamiento de rangos CIDR. Que solucion AWS debe usar?",
    opciones: [
      "AWS PrivateLink con un endpoint service respaldado por un Network Load Balancer",
      "VPC peering entre el proveedor y cada cliente",
      "Un Internet Gateway con Security Groups restrictivos",
      "Un Transit Gateway publico"
    ],
    correctas: [0],
    explicacion: "AWS PrivateLink permite exponer un servicio mediante un VPC endpoint service detras de un Network Load Balancer; los clientes consumen el servicio con interface endpoints de forma privada, sin Internet, sin peering y sin importar el solapamiento de CIDR. El peering requiere CIDRs no solapados y mas gestion."
  },
  {
    id: "saa-146",
    dominio: 1,
    tema: "Config",
    tipo: "single",
    enunciado: "Una empresa quiere evaluar continuamente si sus recursos de AWS cumplen con politicas internas (por ejemplo, que todos los volumenes EBS esten cifrados) y registrar un historial de cambios de configuracion para auditoria. Que servicio cumple este objetivo?",
    opciones: [
      "AWS CloudTrail",
      "AWS Config con managed rules de cumplimiento",
      "Amazon GuardDuty",
      "AWS WAF"
    ],
    correctas: [1],
    explicacion: "AWS Config registra y evalua continuamente la configuracion de los recursos contra reglas (por ejemplo encrypted-volumes), mantiene un historial de configuracion y reporta cumplimiento. CloudTrail registra llamadas a la API, GuardDuty detecta amenazas y WAF protege aplicaciones web."
  },
  {
    id: "saa-147",
    dominio: 1,
    tema: "Firewall Manager",
    tipo: "single",
    enunciado: "Una organizacion con docenas de cuentas en AWS Organizations necesita aplicar y mantener de forma centralizada un conjunto comun de reglas de AWS WAF en todos los Application Load Balancers de todas las cuentas, garantizando que las nuevas cuentas las hereden automaticamente. Que servicio facilita esta gestion centralizada?",
    opciones: [
      "Configurar manualmente AWS WAF en cada cuenta",
      "AWS Firewall Manager con politicas de seguridad centralizadas",
      "AWS Shield Standard",
      "Una SCP que cree reglas de WAF"
    ],
    correctas: [1],
    explicacion: "AWS Firewall Manager permite definir politicas de seguridad centralizadas (WAF, Shield Advanced, Security Groups, Network Firewall) y aplicarlas automaticamente a recursos en todas las cuentas de la Organization, incluyendo nuevas cuentas. La configuracion manual no escala y las SCP no crean reglas de WAF."
  },
  {
    id: "saa-148",
    dominio: 1,
    tema: "KMS Envelope Encryption",
    tipo: "single",
    enunciado: "Un equipo necesita cifrar archivos grandes localmente de forma eficiente. Para no enviar todo el archivo a AWS KMS, generan una data key, cifran los datos localmente con ella y almacenan junto al archivo la version cifrada de esa data key. Como se denomina este patron?",
    opciones: [
      "Cifrado del lado del servidor SSE-S3",
      "Envelope encryption usando GenerateDataKey de KMS",
      "Cifrado en transito con TLS",
      "Cifrado SSE-C provisto por el cliente"
    ],
    correctas: [1],
    explicacion: "El envelope encryption consiste en cifrar los datos con una data key generada por KMS (GenerateDataKey) y luego cifrar esa data key con la CMK; solo la data key cifrada se almacena junto a los datos, evitando enviar grandes volumenes a KMS. SSE-S3 y SSE-C son modalidades distintas y TLS es cifrado en transito."
  },
  {
    id: "saa-149",
    dominio: 1,
    tema: "Directory Service",
    tipo: "single",
    enunciado: "Una empresa quiere que sus instancias EC2 Windows se unan a un dominio Active Directory totalmente administrado por AWS, con relacion de confianza opcional hacia su AD on-premises. Que opcion de AWS Directory Service es la adecuada?",
    opciones: [
      "AWS Managed Microsoft AD",
      "Amazon Cognito User Pools",
      "AD Connector solo como proxy",
      "Simple AD compatible con todas las funciones de Microsoft AD"
    ],
    correctas: [0],
    explicacion: "AWS Managed Microsoft AD es un Active Directory real administrado por AWS, permite unir instancias Windows al dominio y establecer trusts con AD on-premises. AD Connector solo redirige a un AD existente, Simple AD es compatible limitado y Cognito no es Active Directory."
  },
  {
    id: "saa-150",
    dominio: 1,
    tema: "Network Firewall",
    tipo: "single",
    enunciado: "Una empresa necesita inspeccion de trafico de red con estado a nivel de VPC, incluyendo filtrado por dominios (FQDN), prevencion de intrusiones (IPS) y reglas de Suricata, para todo el trafico saliente de varias subredes. Que servicio AWS provee estas capacidades?",
    opciones: [
      "Security Groups con reglas de salida",
      "AWS Network Firewall",
      "Network ACL",
      "AWS WAF"
    ],
    correctas: [1],
    explicacion: "AWS Network Firewall ofrece inspeccion de trafico con estado a nivel de VPC, filtrado por dominios/FQDN, IPS y soporte de reglas compatibles con Suricata. Los Security Groups y NACL no realizan inspeccion profunda ni filtrado por dominio, y WAF opera a capa 7 para aplicaciones web HTTP."
  },
  {
    id: "saa-151",
    dominio: 1,
    tema: "S3 SSE-KMS",
    tipo: "multiple",
    enunciado: "Una empresa configura SSE-KMS con una customer managed key para cifrar objetos en un bucket de Amazon S3. Cuales DOS beneficios obtiene frente a usar SSE-S3? (Elegir DOS)",
    opciones: [
      "Registro de auditoria en AWS CloudTrail de cada operacion criptografica realizada con la clave",
      "Capacidad de controlar y revocar el acceso a la clave mediante la key policy de KMS",
      "Eliminacion de la necesidad de usar HTTPS para subir objetos",
      "Bloqueo automatico del acceso publico al bucket",
      "Replicacion automatica del bucket a otra region sin configuracion"
    ],
    correctas: [0, 1],
    explicacion: "SSE-KMS con una customer managed key registra cada operacion criptografica en CloudTrail para auditoria y permite controlar/revocar el acceso mediante la key policy, cosa que SSE-S3 no ofrece. El cifrado en reposo no reemplaza HTTPS (cifrado en transito) ni activa Block Public Access ni la replicacion cross-region."
  },
  {
    id: "saa-152",
    dominio: 1,
    tema: "SAML Federation",
    tipo: "single",
    enunciado: "Una empresa con un proveedor de identidad SAML 2.0 corporativo quiere que sus empleados accedan a la consola de AWS usando sus credenciales existentes sin crear usuarios IAM individuales. Que configuracion lo permite?",
    opciones: [
      "Crear un IAM Identity Provider SAML y roles IAM que los usuarios federados asumen mediante STS",
      "Crear un usuario IAM por empleado y sincronizar contrasenas",
      "Compartir las credenciales de un unico usuario IAM",
      "Configurar una bucket policy con condicion SAML"
    ],
    correctas: [0],
    explicacion: "Configurando un IAM SAML Identity Provider y roles IAM con relacion de confianza, los empleados se federan desde el IdP corporativo y obtienen credenciales temporales via STS para acceder a AWS, sin usuarios IAM individuales. Crear o compartir usuarios IAM no escala ni respeta el minimo privilegio."
  },
  {
    id: "saa-153",
    dominio: 1,
    tema: "Parameter Store",
    tipo: "single",
    enunciado: "Una aplicacion necesita almacenar parametros de configuracion y algunos valores sensibles (como API keys) cifrados, con jerarquia de rutas y sin costo adicional para parametros estandar. No se requiere rotacion automatica nativa. Que servicio es el mas costo-efectivo?",
    opciones: [
      "AWS Secrets Manager para todos los valores",
      "AWS Systems Manager Parameter Store usando parametros SecureString cifrados con KMS",
      "Almacenar los valores en variables de entorno en texto plano",
      "Amazon DynamoDB con cifrado a nivel de tabla"
    ],
    correctas: [1],
    explicacion: "Parameter Store almacena configuracion con jerarquia de rutas y soporta parametros SecureString cifrados con KMS, sin costo para parametros estandar, ideal cuando no se necesita rotacion automatica nativa. Secrets Manager es mas costoso y se justifica cuando se requiere rotacion gestionada; las variables en texto plano no son seguras."
  },
  {
    id: "saa-154",
    dominio: 1,
    tema: "VPC Endpoint Policy",
    tipo: "single",
    enunciado: "Una empresa usa un VPC gateway endpoint para Amazon S3 y quiere restringir el acceso a traves de ese endpoint para que solo se permita interactuar con un bucket especifico de la empresa, bloqueando cualquier otro bucket. Que mecanismo aplica esta restriccion en el endpoint?",
    opciones: [
      "Una VPC endpoint policy que limite las acciones a los ARNs del bucket permitido",
      "Una NACL en la subred del endpoint",
      "Un Security Group adjunto al gateway endpoint",
      "Una IAM policy aplicada al Internet Gateway"
    ],
    correctas: [0],
    explicacion: "Las VPC endpoint policies controlan que recursos pueden accederse a traves del endpoint; limitando los ARNs a un bucket especifico se bloquea el acceso a otros buckets desde ese endpoint. Los gateway endpoints no usan Security Groups, y las NACL no filtran por bucket de S3."
  },
  {
    id: "saa-155",
    dominio: 1,
    tema: "IAM Policy Conditions",
    tipo: "single",
    enunciado: "El equipo de seguridad exige que ciertas acciones sensibles de IAM solo puedan ejecutarse cuando el usuario se haya autenticado con MFA. Como se aplica esta restriccion en una IAM policy?",
    opciones: [
      "Agregar una condicion que requiera aws:MultiFactorAuthPresent igual a true para esas acciones",
      "Habilitar MFA solo en la cuenta root",
      "Aplicar un Security Group que exija MFA",
      "Cifrar las credenciales del usuario con KMS"
    ],
    correctas: [0],
    explicacion: "Una IAM policy puede incluir la condicion aws:MultiFactorAuthPresent true para permitir acciones sensibles solo cuando la sesion fue autenticada con MFA. Los Security Groups operan a nivel de red y el cifrado de credenciales no impone MFA en las llamadas a la API."
  },
  {
    id: "saa-156",
    dominio: 1,
    tema: "Cognito Identity Pools",
    tipo: "single",
    enunciado: "Una aplicacion movil ya autentica a sus usuarios con un User Pool y ahora necesita que esos usuarios autenticados obtengan credenciales temporales de AWS para subir archivos directamente a un bucket de Amazon S3 con permisos limitados. Que componente de Cognito provee esas credenciales de AWS?",
    opciones: [
      "Cognito User Pools",
      "Cognito Identity Pools (federated identities) que entregan credenciales temporales via STS",
      "AWS Directory Service",
      "AWS Certificate Manager"
    ],
    correctas: [1],
    explicacion: "Los Cognito Identity Pools intercambian un token de identidad (del User Pool u otro IdP) por credenciales temporales de AWS via STS, asociadas a un IAM Role con permisos limitados sobre S3. Los User Pools manejan la autenticacion, no la entrega de credenciales de AWS."
  },
  {
    id: "saa-157",
    dominio: 1,
    tema: "KMS Key Policy",
    tipo: "multiple",
    enunciado: "Una empresa quiere controlar de forma robusta quien puede usar y administrar una AWS KMS customer managed key. Cuales DOS afirmaciones sobre el control de acceso a claves KMS son correctas? (Elegir DOS)",
    opciones: [
      "La key policy es el control principal de acceso a la clave y siempre debe permitir el acceso para que las IAM policies surtan efecto",
      "Las IAM policies por si solas pueden otorgar acceso a una KMS key incluso si la key policy no lo permite",
      "Se pueden usar grants de KMS para delegar permisos temporales y granulares sobre la clave",
      "Una NACL puede restringir el uso de la KMS key por direccion IP",
      "El cifrado SSE-S3 utiliza key policies de KMS administradas por el cliente"
    ],
    correctas: [0, 2],
    explicacion: "La key policy es la base del control de acceso de una KMS key; las IAM policies solo funcionan si la key policy delega en IAM. Los grants permiten delegacion temporal y granular. Las IAM policies solas no bastan sin la key policy, las NACL no aplican a KMS y SSE-S3 no usa claves del cliente."
  },
  {
    id: "saa-158",
    dominio: 1,
    tema: "Defense in Depth",
    tipo: "multiple",
    enunciado: "Una empresa despliega una aplicacion web de tres capas y quiere aplicar defensa en profundidad a nivel de red. Cuales DOS combinaciones de controles de seguridad de red son apropiadas? (Elegir DOS)",
    opciones: [
      "Usar Security Groups con estado en las instancias para permitir solo el trafico necesario entre capas",
      "Usar Network ACLs sin estado a nivel de subred como capa adicional para denegar rangos de IP especificos",
      "Exponer la capa de base de datos con una IP publica protegida solo por IAM",
      "Permitir todo el trafico entrante en los Security Groups y filtrar solo en la aplicacion",
      "Eliminar las subredes privadas para simplificar el enrutamiento"
    ],
    correctas: [0, 1],
    explicacion: "La defensa en profundidad combina Security Groups con estado a nivel de instancia (permitiendo solo lo necesario) y NACLs sin estado a nivel de subred (que pueden denegar rangos de IP). Exponer la base de datos con IP publica, permitir todo el trafico o eliminar subredes privadas debilita la seguridad."
  },
  {
    id: "saa-159",
    dominio: 1,
    tema: "Encryption at Rest",
    tipo: "multiple",
    enunciado: "Una empresa debe garantizar cifrado en reposo en varios servicios de AWS para cumplir una norma. Cuales DOS afirmaciones sobre cifrado en reposo integrado con AWS KMS son correctas? (Elegir DOS)",
    opciones: [
      "Los volumenes Amazon EBS pueden cifrarse en reposo usando AWS KMS y, una vez creados cifrados, sus snapshots tambien quedan cifrados",
      "Amazon RDS soporta cifrado en reposo con KMS que debe habilitarse al crear la instancia",
      "El cifrado en reposo de Amazon S3 no es posible si el bucket tiene versionado activado",
      "Una vez que un volumen EBS se crea sin cifrado, AWS lo cifra automaticamente sin intervencion",
      "AWS KMS no puede usarse para cifrar datos en Amazon DynamoDB"
    ],
    correctas: [0, 1],
    explicacion: "Los volumenes EBS pueden cifrarse con KMS y sus snapshots heredan el cifrado; RDS soporta cifrado con KMS que debe habilitarse al crear la instancia. El versionado de S3 no impide el cifrado, un volumen EBS no cifrado no se cifra solo (requiere recrearlo via snapshot) y DynamoDB si soporta cifrado con KMS."
  },
  {
    id: "saa-160",
    dominio: 1,
    tema: "Least Privilege",
    tipo: "multiple",
    enunciado: "Un arquitecto debe aplicar el principio de minimo privilegio en una organizacion de AWS. Cuales DOS practicas estan alineadas con este principio? (Elegir DOS)",
    opciones: [
      "Otorgar permisos especificos y acotados, revisandolos periodicamente con herramientas como IAM Access Analyzer",
      "Usar IAM Roles con credenciales temporales en lugar de claves de acceso de larga duracion incrustadas en el codigo",
      "Asignar la politica AdministratorAccess a todos los roles para evitar problemas de permisos",
      "Compartir un unico usuario IAM con privilegios amplios entre todo el equipo",
      "Almacenar claves de acceso de larga duracion en repositorios de codigo para facilitar el despliegue"
    ],
    correctas: [0, 1],
    explicacion: "El minimo privilegio implica otorgar solo los permisos necesarios y revisarlos (IAM Access Analyzer ayuda a identificar accesos excesivos) y preferir IAM Roles con credenciales temporales sobre claves de larga duracion. Otorgar AdministratorAccess a todos, compartir usuarios o guardar claves en el codigo viola este principio."
  }
]);
