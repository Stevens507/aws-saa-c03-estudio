window.BANCO = (window.BANCO || []).concat([
  {
    id: "saa-601",
    dominio: 1,
    tema: "KMS",
    tipo: "single",
    enunciado: "Una empresa cifra objetos en S3 con una KMS key administrada por el cliente en la cuenta A. Una aplicación que corre en la cuenta B necesita leer esos objetos. ¿Qué combinación garantiza el acceso de descifrado siguiendo el menor privilegio?",
    opciones: [
      "Agregar a la key policy de la cuenta A un permiso 'kms:Decrypt' para el rol de la cuenta B y otorgar a ese rol una política IAM con 'kms:Decrypt' sobre el ARN de la key.",
      "Compartir la key administrada por el cliente vía AWS RAM con la cuenta B.",
      "Habilitar SSE-S3 en el bucket para que la cuenta B no necesite permisos de KMS.",
      "Copiar la key a la cuenta B exportando el material criptográfico con 'kms:GetKeyMaterial'."
    ],
    correctas: [0],
    explicacion: "El acceso cross-account a una KMS key requiere doble autorización: la key policy de la cuenta propietaria debe permitir al principal externo y la cuenta B debe delegar el permiso en una política IAM. RAM no comparte KMS keys. SSE-S3 no aplica a objetos ya cifrados con una key del cliente. KMS no permite exportar el material de una key administrada de esta forma."
  },
  {
    id: "saa-602",
    dominio: 1,
    tema: "KMS",
    tipo: "single",
    enunciado: "Un arquitecto necesita que una KMS key solo pueda usarse para cifrar/descifrar cuando la solicitud provenga del servicio EBS y no directamente vía API de KMS. ¿Qué mecanismo debe usar en la política?",
    opciones: [
      "Una condición 'kms:ViaService' con valor 'ec2.<region>.amazonaws.com' en la key policy.",
      "Un permission boundary aplicado a la KMS key.",
      "Una SCP que deniegue 'kms:Decrypt' a todos los usuarios.",
      "Habilitar la rotación automática anual de la key."
    ],
    correctas: [0],
    explicacion: "La clave de condición 'kms:ViaService' limita el uso de la key a solicitudes hechas en nombre del usuario por un servicio AWS específico (EBS usa el endpoint de EC2). Los permission boundaries se aplican a identidades IAM, no a keys. Las SCP no diferencian el servicio que invoca. La rotación no controla el origen de la solicitud."
  },
  {
    id: "saa-603",
    dominio: 1,
    tema: "IAM",
    tipo: "multiple",
    enunciado: "Una organización quiere garantizar que ningún desarrollador, incluso con políticas de administrador adjuntas, pueda crear recursos fuera de las regiones eu-west-1 y eu-central-1. ¿Qué dos enfoques cumplen este requisito de forma efectiva a nivel organizativo?",
    opciones: [
      "Aplicar una SCP a la OU que deniegue todas las acciones cuando 'aws:RequestedRegion' no esté en la lista permitida.",
      "Adjuntar a cada usuario una política IAM gestionada por el cliente con la restricción de región.",
      "Usar AWS Organizations con una SCP de denegación que excluya servicios globales necesarios como IAM y CloudFront.",
      "Configurar un permission boundary individual en cada cuenta nueva manualmente.",
      "Activar AWS Config para reportar recursos fuera de la región (sin bloquear la creación)."
    ],
    correctas: [0, 2],
    explicacion: "Una SCP con condición 'aws:RequestedRegion' aplicada a la OU bloquea acciones en regiones no permitidas para todas las identidades, incluso administradores. Debe excluir servicios globales (IAM, CloudFront, Route 53) cuyos endpoints residen en us-east-1. Las políticas IAM por usuario no impiden que un admin las modifique. Los permission boundaries manuales no escalan. Config solo detecta, no previene."
  },
  {
    id: "saa-604",
    dominio: 1,
    tema: "S3",
    tipo: "single",
    enunciado: "Un equipo necesita compartir temporalmente un objeto S3 privado con un socio externo que no tiene credenciales de AWS, sin hacer público el bucket. La descarga debe expirar en 15 minutos. ¿Cuál es la solución adecuada?",
    opciones: [
      "Generar una URL prefirmada (presigned URL) con una expiración de 15 minutos usando credenciales con permiso 's3:GetObject'.",
      "Desactivar el Block Public Access y publicar el objeto con ACL public-read durante 15 minutos.",
      "Crear un S3 Access Point con política pública restringida a la IP del socio.",
      "Enviar al socio las credenciales temporales de un rol asumido vía STS."
    ],
    correctas: [0],
    explicacion: "Una presigned URL permite acceso temporal y limitado a un objeto privado sin exponer el bucket ni distribuir credenciales; hereda los permisos del firmante y caduca según lo configurado. Hacer el bucket público es inseguro. Un access point público sigue exponiendo el dato. Compartir credenciales STS es mala práctica y otorga más acceso del necesario."
  },
  {
    id: "saa-605",
    dominio: 1,
    tema: "TLS/ACM",
    tipo: "single",
    enunciado: "Una aplicación detrás de un Application Load Balancer debe terminar TLS con un certificado público administrado y rotado automáticamente, sin tareas manuales de renovación. ¿Qué servicio y configuración cumplen esto?",
    opciones: [
      "Solicitar un certificado público en AWS Certificate Manager (ACM) en la misma región del ALB y asociarlo al listener HTTPS.",
      "Importar un certificado comprado de un tercero a IAM y asociarlo al ALB.",
      "Generar un certificado autofirmado en cada instancia EC2 detrás del ALB.",
      "Usar un certificado de ACM Private CA y exponerlo públicamente."
    ],
    correctas: [0],
    explicacion: "ACM emite y renueva automáticamente certificados públicos sin costo, y se integran de forma nativa con el listener HTTPS del ALB en la misma región. Los certificados importados (de IAM o terceros) no se renuevan solos. Los autofirmados no son confiables para clientes públicos. ACM Private CA emite certificados privados no confiables públicamente."
  },
  {
    id: "saa-606",
    dominio: 1,
    tema: "GuardDuty",
    tipo: "single",
    enunciado: "Una empresa quiere respuesta automatizada: cuando GuardDuty detecta una instancia EC2 comprometida que realiza minería de criptomonedas, la instancia debe aislarse de inmediato. ¿Qué arquitectura logra esto con mínimo esfuerzo operativo?",
    opciones: [
      "Una regla de EventBridge que filtre los findings de GuardDuty e invoque una función Lambda que reemplace el security group de la instancia por uno de cuarentena.",
      "Habilitar el aislamiento automático en la consola de GuardDuty.",
      "Un trabajo cron en una instancia bastión que consulte la API de GuardDuty cada minuto.",
      "Configurar AWS Config para detener la instancia cuando cambie su estado."
    ],
    correctas: [0],
    explicacion: "GuardDuty publica findings en EventBridge; una regla puede filtrar el tipo de finding y disparar una Lambda que aplique un SG de cuarentena, logrando respuesta casi en tiempo real sin servidores. GuardDuty no tiene aislamiento automático nativo. Un cron en bastión es frágil y no es serverless. Config evalúa cumplimiento, no responde a findings de amenazas."
  },
  {
    id: "saa-607",
    dominio: 1,
    tema: "PrivateLink",
    tipo: "single",
    enunciado: "Una aplicación en una VPC debe consumir un servicio SaaS de un proveedor sin que el tráfico salga a Internet ni atraviese un gateway de Internet. El proveedor expone su servicio mediante un Network Load Balancer. ¿Qué solución cumple el requisito?",
    opciones: [
      "Crear un VPC endpoint de tipo interfaz (PrivateLink) que apunte al servicio de endpoint publicado por el proveedor.",
      "Crear un VPC peering entre la VPC del cliente y la del proveedor.",
      "Configurar un gateway endpoint hacia el NLB del proveedor.",
      "Usar un NAT gateway para alcanzar el endpoint público del SaaS."
    ],
    correctas: [0],
    explicacion: "AWS PrivateLink crea un interface endpoint (ENI con IP privada) hacia el endpoint service del proveedor respaldado por un NLB, manteniendo el tráfico dentro de la red de AWS sin exponerlo a Internet. El peering requiere coordinar rangos CIDR y expone toda la VPC. Los gateway endpoints solo sirven para S3 y DynamoDB. Un NAT gateway implica salida a Internet."
  },
  {
    id: "saa-608",
    dominio: 1,
    tema: "Secrets Manager",
    tipo: "single",
    enunciado: "Una aplicación en ECS Fargate accede a una base de datos RDS con credenciales que deben rotarse cada 30 días sin downtime y sin almacenarse en variables de entorno en texto plano. ¿Cuál es la mejor solución?",
    opciones: [
      "Almacenar las credenciales en AWS Secrets Manager con rotación automática gestionada e inyectarlas en la tarea referenciando el secreto en la definición del contenedor.",
      "Guardar las credenciales en un parámetro SecureString de Parameter Store sin rotación y leerlas al iniciar el contenedor.",
      "Codificar las credenciales en base64 dentro de la imagen del contenedor.",
      "Crear un usuario de IAM con clave de acceso de larga duración para la base de datos."
    ],
    correctas: [0],
    explicacion: "Secrets Manager soporta rotación automática nativa para RDS mediante Lambda y permite inyectar el secreto en la task definition sin exponerlo en texto plano. Parameter Store SecureString no rota automáticamente sin lógica adicional. Codificar en base64 no es cifrado. Las claves de acceso de larga duración son un antipatrón de seguridad."
  },
  {
    id: "saa-609",
    dominio: 1,
    tema: "SSM Session Manager",
    tipo: "single",
    enunciado: "Una empresa quiere eliminar el uso de bastiones SSH y de puertos 22 abiertos para administrar instancias EC2 en subredes privadas, manteniendo registros de auditoría de cada sesión. ¿Qué solución cumple estos objetivos?",
    opciones: [
      "Usar AWS Systems Manager Session Manager con el agente SSM y registrar las sesiones en S3 y CloudWatch Logs.",
      "Abrir el puerto 22 solo desde la IP corporativa mediante un security group.",
      "Desplegar un bastión en una subred pública con MFA en SSH.",
      "Configurar EC2 Instance Connect con acceso público a las instancias."
    ],
    correctas: [0],
    explicacion: "Session Manager permite shells interactivos sin abrir el puerto 22 ni mantener bastiones; las instancias en subredes privadas alcanzan SSM por endpoints VPC y las sesiones se registran en S3 y CloudWatch Logs para auditoría. Abrir el 22 o usar un bastión mantiene superficie de ataque. EC2 Instance Connect público también requiere acceso de red entrante."
  },
  {
    id: "saa-610",
    dominio: 1,
    tema: "WAF",
    tipo: "single",
    enunciado: "Un sitio web detrás de CloudFront sufre ataques de fuerza bruta sobre el endpoint /login desde múltiples direcciones IP. Se desea limitar las solicitudes por IP sin afectar al resto del sitio. ¿Qué configuración de AWS WAF es la más adecuada?",
    opciones: [
      "Una regla rate-based en la Web ACL con scope-down statement que aplique solo al path /login.",
      "Una regla geográfica que bloquee todos los países excepto el local.",
      "Una regla de tamaño de cuerpo que limite el payload del POST.",
      "Habilitar Shield Standard para mitigar el ataque."
    ],
    correctas: [0],
    explicacion: "Una regla rate-based de WAF cuenta solicitudes por IP en una ventana móvil y bloquea las que exceden el umbral; con un scope-down statement se restringe la evaluación solo al path /login, sin afectar el resto. El bloqueo geográfico es demasiado amplio. El límite de tamaño no frena la frecuencia. Shield Standard mitiga DDoS de red, no fuerza bruta a nivel de aplicación."
  },
  {
    id: "saa-611",
    dominio: 1,
    tema: "IAM",
    tipo: "multiple",
    enunciado: "Una plataforma multiinquilino implementa ABAC para que cada equipo solo acceda a recursos etiquetados con su nombre. ¿Qué dos elementos son esenciales para que ABAC funcione correctamente en IAM?",
    opciones: [
      "Una política IAM que use claves de condición como 'aws:PrincipalTag' y 'aws:ResourceTag' comparando etiquetas con 'StringEquals'.",
      "Etiquetar de forma consistente tanto los principales (roles/usuarios) como los recursos con la clave de etiqueta acordada.",
      "Crear una política IAM distinta y estática por cada equipo y recurso.",
      "Deshabilitar todas las etiquetas para evitar conflictos.",
      "Usar exclusivamente grupos de IAM sin etiquetas."
    ],
    correctas: [0, 1],
    explicacion: "ABAC depende de comparar atributos: la política usa condiciones que igualan la etiqueta del principal con la del recurso (por ejemplo 'aws:PrincipalTag/team' = 'aws:ResourceTag/team'), y requiere que principales y recursos estén etiquetados consistentemente. Crear políticas estáticas por equipo es justo lo que ABAC evita. Sin etiquetas, ABAC no puede funcionar."
  },
  {
    id: "saa-612",
    dominio: 1,
    tema: "Macie",
    tipo: "single",
    enunciado: "Una empresa debe identificar automáticamente si hay información personal identificable (PII) almacenada inadvertidamente en sus buckets de S3 y recibir alertas. ¿Qué servicio cumple este propósito?",
    opciones: [
      "Amazon Macie, que usa machine learning para descubrir y clasificar datos sensibles en S3.",
      "Amazon Inspector, escaneando los objetos en busca de vulnerabilidades.",
      "Amazon GuardDuty, analizando los logs de acceso a S3.",
      "AWS Config, evaluando el cifrado de los buckets."
    ],
    correctas: [0],
    explicacion: "Macie está diseñado específicamente para descubrir y clasificar datos sensibles como PII en S3 mediante ML y patrones, generando findings y alertas. Inspector evalúa vulnerabilidades de software y red, no contenido de datos. GuardDuty detecta amenazas mediante logs. Config evalúa configuración de recursos, no el contenido de los objetos."
  },
  {
    id: "saa-613",
    dominio: 1,
    tema: "KMS",
    tipo: "multiple",
    enunciado: "Una organización con requisitos regulatorios estrictos debe controlar y auditar completamente el material criptográfico de sus keys, manteniendo el control de un módulo de hardware certificado FIPS 140-2 Nivel 3 que solo ellos administran. ¿Qué dos opciones les permiten cumplir este control?",
    opciones: [
      "Usar AWS CloudHSM y una KMS key con custom key store respaldada por el clúster CloudHSM.",
      "Importar su propio material de clave (BYOK) a KMS con origen de material externo.",
      "Usar una KMS key administrada por AWS (aws/s3) sin configuración adicional.",
      "Habilitar la rotación automática de una KMS key estándar administrada por AWS.",
      "Usar SSE-S3 para todos los buckets."
    ],
    correctas: [0, 1],
    explicacion: "Un custom key store con CloudHSM mantiene el material en un HSM dedicado FIPS 140-2 Nivel 3 bajo control del cliente. BYOK permite importar material generado externamente, dando control sobre su origen y caducidad. Las keys administradas por AWS no permiten ese control. La rotación automática y SSE-S3 no cumplen el requisito de control del material criptográfico."
  },
  {
    id: "saa-614",
    dominio: 1,
    tema: "Network Firewall",
    tipo: "single",
    enunciado: "Una empresa necesita inspección de tráfico stateful con filtrado por dominio (FQDN) para todo el egreso de varias VPCs hacia Internet, aplicando reglas centralizadas. ¿Qué servicio AWS es el más apropiado?",
    opciones: [
      "AWS Network Firewall desplegado en una VPC de inspección centralizada con Transit Gateway.",
      "Security groups con reglas de salida por FQDN.",
      "Network ACLs con listas de dominios permitidos.",
      "AWS WAF asociado a las VPCs de egreso."
    ],
    correctas: [0],
    explicacion: "AWS Network Firewall ofrece inspección stateful, reglas Suricata y filtrado por dominio/FQDN, y puede centralizarse en una VPC de inspección con Transit Gateway para todas las VPCs. Los security groups y las NACL operan por IP/puerto, no por FQDN. WAF protege aplicaciones HTTP(S), no es un firewall de egreso de red por dominio."
  },
  {
    id: "saa-615",
    dominio: 1,
    tema: "S3",
    tipo: "single",
    enunciado: "Una política de bucket S3 debe permitir el acceso únicamente cuando las solicitudes provengan a través de un VPC endpoint específico, denegando cualquier otro origen. ¿Qué clave de condición se debe usar?",
    opciones: [
      "Denegar el acceso cuando 'aws:sourceVpce' no coincida con el ID del VPC endpoint autorizado.",
      "Permitir el acceso solo cuando 'aws:SourceIp' esté en el rango público de la VPC.",
      "Usar 'aws:PrincipalOrgID' para limitar por organización.",
      "Aplicar 'aws:SecureTransport' igual a true."
    ],
    correctas: [0],
    explicacion: "La condición 'aws:sourceVpce' compara contra el ID del VPC endpoint, permitiendo restringir el acceso al bucket exclusivamente a través de un gateway endpoint determinado. 'aws:SourceIp' aplica a IPs, no a endpoints privados. 'aws:PrincipalOrgID' limita por organización, no por endpoint. 'aws:SecureTransport' solo fuerza HTTPS, no el origen del tráfico."
  },
  {
    id: "saa-616",
    dominio: 1,
    tema: "Identity Center",
    tipo: "single",
    enunciado: "Una empresa con un proveedor de identidad corporativo (IdP) externo quiere dar a sus empleados acceso de inicio de sesión único a múltiples cuentas AWS con permisos según su grupo, sin crear usuarios IAM. ¿Qué solución es la recomendada?",
    opciones: [
      "AWS IAM Identity Center federado con el IdP corporativo vía SAML/SCIM, asignando permission sets a grupos y cuentas.",
      "Crear usuarios IAM en cada cuenta y sincronizarlos manualmente con el IdP.",
      "Compartir un único usuario IAM raíz entre todos los empleados.",
      "Usar Amazon Cognito user pools para el acceso administrativo a la consola."
    ],
    correctas: [0],
    explicacion: "IAM Identity Center federa con un IdP externo mediante SAML y aprovisiona con SCIM, permitiendo asignar permission sets a grupos para múltiples cuentas con SSO, sin usuarios IAM. Crear usuarios IAM por cuenta no escala. Compartir el root es inseguro. Cognito está orientado a identidades de aplicaciones de clientes, no a acceso administrativo federado."
  },
  {
    id: "saa-617",
    dominio: 1,
    tema: "CloudTrail",
    tipo: "single",
    enunciado: "El equipo de seguridad necesita registrar y consultar a largo plazo las operaciones a nivel de objeto (GetObject, PutObject) sobre buckets S3 sensibles, con capacidad de consultas SQL sobre años de eventos. ¿Qué solución cumple esto?",
    opciones: [
      "Habilitar data events de S3 en un event data store de CloudTrail Lake y consultarlos con SQL.",
      "Habilitar solo management events en un trail estándar a S3.",
      "Activar los logs de acceso al servidor de S3 y analizarlos con Macie.",
      "Usar VPC Flow Logs filtrados por el tráfico a S3."
    ],
    correctas: [0],
    explicacion: "Los data events de CloudTrail registran operaciones a nivel de objeto en S3 y, almacenados en un event data store de CloudTrail Lake, permiten consultas SQL sobre periodos largos de retención. Los management events no incluyen operaciones de objeto. Los logs de acceso de S3 no se consultan con SQL en Lake. Los Flow Logs registran tráfico de red, no llamadas a la API de objetos."
  },
  {
    id: "saa-618",
    dominio: 1,
    tema: "IAM",
    tipo: "single",
    enunciado: "Un equipo de plataforma delega a desarrolladores la creación de roles IAM, pero debe garantizar que esos roles nunca tengan más permisos que un conjunto máximo definido. ¿Qué mecanismo de IAM cumple este límite?",
    opciones: [
      "Adjuntar un permission boundary a los roles creados, definiendo el máximo de permisos efectivos.",
      "Usar una session policy al asumir cada rol.",
      "Aplicar una SCP que permita solo lectura.",
      "Definir una política de confianza restrictiva en cada rol."
    ],
    correctas: [0],
    explicacion: "Un permission boundary establece el máximo de permisos que una identidad IAM puede tener; los permisos efectivos son la intersección entre la política de permisos y el boundary, ideal para delegar creación de roles con un techo. Las session policies aplican por sesión, no de forma permanente. Las SCP operan a nivel de cuenta/OU. La política de confianza controla quién asume el rol, no sus permisos."
  },
  {
    id: "saa-619",
    dominio: 1,
    tema: "Inspector",
    tipo: "single",
    enunciado: "Una empresa quiere escanear continuamente sus instancias EC2 e imágenes de contenedor en ECR en busca de vulnerabilidades de software (CVE) sin gestionar la infraestructura de escaneo. ¿Qué servicio es el adecuado?",
    opciones: [
      "Amazon Inspector con escaneo automático de EC2 y ECR.",
      "Amazon Macie clasificando los binarios.",
      "AWS Trusted Advisor en la categoría de seguridad.",
      "Amazon Detective analizando comportamientos."
    ],
    correctas: [0],
    explicacion: "Amazon Inspector evalúa de forma continua y automática vulnerabilidades (CVE) y exposición de red en instancias EC2, imágenes de ECR y funciones Lambda, sin infraestructura propia. Macie clasifica datos sensibles, no escanea CVE. Trusted Advisor da chequeos generales, no escaneo de vulnerabilidades por CVE. Detective investiga la causa raíz de hallazgos de seguridad."
  },
  {
    id: "saa-620",
    dominio: 1,
    tema: "TLS/mTLS",
    tipo: "single",
    enunciado: "Una API expuesta vía Amazon API Gateway debe autenticar a sus clientes mediante certificados de cliente (autenticación mutua TLS) para integraciones B2B. ¿Cómo se habilita esto?",
    opciones: [
      "Configurar mutual TLS en un custom domain name de API Gateway, proporcionando un truststore con las CA de los clientes en S3.",
      "Activar una API key por cliente en el plan de uso.",
      "Habilitar un autorizador Lambda que valide un token JWT.",
      "Usar un certificado de servidor de ACM en el stage de la API."
    ],
    correctas: [0],
    explicacion: "API Gateway soporta mTLS en custom domain names: se carga un truststore (bundle de CA de confianza) en S3 y la API valida el certificado de cliente presentado en el handshake TLS. Las API keys no son autenticación criptográfica fuerte. Un autorizador con JWT no es mTLS. Un certificado de ACM autentica al servidor ante el cliente, no a la inversa."
  },
  {
    id: "saa-621",
    dominio: 1,
    tema: "Config",
    tipo: "single",
    enunciado: "Una empresa exige que cualquier bucket S3 que se cree sin cifrado por defecto sea corregido automáticamente para habilitar el cifrado. ¿Qué combinación logra la remediación automática?",
    opciones: [
      "Una regla de AWS Config que evalúe el cifrado del bucket con una acción de remediación automática mediante un documento de Automation de SSM.",
      "Una SCP que deniegue la creación de buckets sin cifrado.",
      "Una alarma de CloudWatch sobre métricas de S3.",
      "Un escaneo periódico con Trusted Advisor."
    ],
    correctas: [0],
    explicacion: "AWS Config evalúa el cumplimiento (por ejemplo, 's3-bucket-server-side-encryption-enabled') y puede disparar una remediación automática usando un runbook de SSM Automation que aplique el cifrado al recurso no conforme. Una SCP previene pero no remedia lo ya creado. CloudWatch alarma sobre métricas, no corrige configuración. Trusted Advisor no remedia automáticamente."
  },
  {
    id: "saa-622",
    dominio: 1,
    tema: "S3 Object Lambda",
    tipo: "single",
    enunciado: "Una aplicación debe entregar a distintos consumidores versiones redactadas de los mismos objetos S3 (ocultando PII) sin duplicar los datos ni crear copias modificadas. ¿Qué servicio permite transformar la respuesta en el momento del GET?",
    opciones: [
      "S3 Object Lambda, que ejecuta una función para modificar la respuesta de GetObject antes de devolverla.",
      "S3 Select para extraer solo columnas no sensibles.",
      "S3 Batch Operations para crear copias redactadas.",
      "CloudFront Functions sobre el origen S3."
    ],
    correctas: [0],
    explicacion: "S3 Object Lambda intercepta las solicitudes GetObject a través de un access point y ejecuta una función Lambda que transforma (por ejemplo, redacta PII) la respuesta en tiempo real, sin duplicar ni modificar el objeto original. S3 Select solo filtra contenido estructurado. Batch Operations crearía copias. CloudFront Functions tiene límites de cómputo y no es el patrón para esta transformación."
  },
  {
    id: "saa-623",
    dominio: 1,
    tema: "Shield",
    tipo: "multiple",
    enunciado: "Una aplicación crítica expuesta vía CloudFront y Route 53 sufre ataques DDoS volumétricos recurrentes y la empresa quiere protección avanzada con soporte especializado y protección de costos. ¿Qué dos beneficios obtiene al suscribirse a AWS Shield Advanced?",
    opciones: [
      "Acceso al equipo de respuesta DDoS (SRT) y protección frente a cargos por escalado provocado por ataques (cost protection).",
      "Mitigación avanzada de DDoS de capa 3/4 y 7 con métricas y diagnósticos detallados en tiempo real.",
      "Cifrado automático en reposo de todos los recursos protegidos.",
      "Escaneo de vulnerabilidades CVE en las instancias EC2 protegidas.",
      "Clasificación automática de datos sensibles en S3."
    ],
    correctas: [0, 1],
    explicacion: "Shield Advanced añade mitigación DDoS mejorada en capas 3/4 y 7, diagnósticos y métricas detalladas, acceso al Shield Response Team y protección de costos ante picos de escalado por ataque. No realiza cifrado en reposo, ni escaneo de CVE (eso es Inspector), ni clasificación de datos (eso es Macie)."
  },
  {
    id: "saa-624",
    dominio: 1,
    tema: "IAM Roles Anywhere",
    tipo: "single",
    enunciado: "Servidores on-premises de una empresa necesitan obtener credenciales temporales de AWS sin almacenar claves de acceso de larga duración, utilizando los certificados X.509 que ya emite su PKI corporativa. ¿Qué solución es la indicada?",
    opciones: [
      "IAM Roles Anywhere, configurando un trust anchor con la CA corporativa para que los servidores obtengan credenciales temporales vía STS.",
      "Crear un usuario IAM por servidor y distribuir sus claves de acceso.",
      "Instalar el agente de SSM y usar Session Manager para inyectar claves.",
      "Habilitar la federación con SAML para los servidores."
    ],
    correctas: [0],
    explicacion: "IAM Roles Anywhere permite a cargas de trabajo fuera de AWS obtener credenciales temporales presentando certificados X.509 emitidos por una CA registrada como trust anchor, eliminando claves de larga duración. Crear usuarios IAM con claves persistentes es el antipatrón que se busca evitar. Session Manager no entrega credenciales de carga de trabajo. SAML es para identidades humanas/aplicaciones, no para autenticación con certificados de servidores."
  },
  {
    id: "saa-625",
    dominio: 1,
    tema: "Detective",
    tipo: "single",
    enunciado: "Tras recibir múltiples findings de GuardDuty, el equipo de seguridad necesita investigar la causa raíz y visualizar el comportamiento histórico de las entidades involucradas (usuarios IAM, instancias, IPs) sin construir manualmente la correlación. ¿Qué servicio facilita esto?",
    opciones: [
      "Amazon Detective, que correlaciona y visualiza datos de seguridad para análisis de causa raíz.",
      "Amazon Macie, que clasifica los datos accedidos.",
      "AWS Config, que muestra el historial de configuración.",
      "Amazon Inspector, que reporta vulnerabilidades de las entidades."
    ],
    correctas: [0],
    explicacion: "Amazon Detective ingiere datos de VPC Flow Logs, CloudTrail y GuardDuty para construir automáticamente grafos de comportamiento que facilitan la investigación y el análisis de causa raíz. Macie clasifica datos sensibles. Config rastrea cambios de configuración, no comportamiento de amenazas. Inspector reporta vulnerabilidades, no correlación forense."
  },
  {
    id: "saa-626",
    dominio: 1,
    tema: "KMS Grants",
    tipo: "single",
    enunciado: "Un servicio AWS necesita permiso temporal y programático para usar una KMS key en nombre de un rol, con la capacidad de revocarlo posteriormente sin modificar la key policy. ¿Qué mecanismo de KMS es el adecuado?",
    opciones: [
      "Crear un KMS grant que otorgue las operaciones específicas al grantee y que pueda revocarse de forma independiente.",
      "Editar la key policy para añadir el permiso permanente.",
      "Adjuntar una política IAM gestionada por AWS al rol.",
      "Habilitar la rotación automática de la key."
    ],
    correctas: [0],
    explicacion: "Los KMS grants otorgan permisos granulares y temporales a un grantee para operaciones criptográficas concretas, son ideales para integraciones programáticas y pueden revocarse o retirarse sin tocar la key policy. Editar la key policy implica un cambio permanente y menos flexible. Una política IAM no aporta la naturaleza temporal/revocable del grant. La rotación no concede permisos."
  },
  {
    id: "saa-627",
    dominio: 1,
    tema: "Defensa en profundidad",
    tipo: "multiple",
    enunciado: "Un arquitecto diseña defensa en profundidad para una aplicación web de tres capas. ¿Qué tres controles aportan capas de seguridad complementarias y deben combinarse?",
    opciones: [
      "AWS WAF en el CloudFront/ALB para filtrar ataques de capa de aplicación.",
      "Security groups stateful en las instancias permitiendo solo los puertos necesarios entre capas.",
      "Network ACLs stateless en las subredes para bloquear rangos no deseados a nivel de subred.",
      "Un único security group que permita todo el tráfico 0.0.0.0/0 para simplificar.",
      "Deshabilitar el cifrado en tránsito para reducir latencia."
    ],
    correctas: [0, 1, 2],
    explicacion: "La defensa en profundidad combina capas: WAF mitiga amenazas de capa 7, los security groups stateful controlan el tráfico a nivel de instancia y las NACL stateless filtran a nivel de subred. Permitir 0.0.0.0/0 elimina la protección y deshabilitar el cifrado en tránsito es inseguro; ambos contradicen el principio de múltiples capas."
  },
  {
    id: "saa-628",
    dominio: 1,
    tema: "PrivateLink",
    tipo: "single",
    enunciado: "Una empresa usa un interface VPC endpoint para acceder a la API de SSM. Quiere restringir qué acciones se pueden invocar a través de ese endpoint, independientemente de los permisos IAM. ¿Qué debe configurar?",
    opciones: [
      "Una endpoint policy en el VPC endpoint que limite las acciones de SSM permitidas.",
      "Una NACL en la subred del endpoint que filtre por acción de API.",
      "Un security group del endpoint que permita solo ciertas acciones.",
      "Una SCP aplicada al endpoint."
    ],
    correctas: [0],
    explicacion: "Las endpoint policies (políticas de recurso) en un interface o gateway endpoint controlan qué acciones y recursos se pueden invocar a través de ese endpoint, ofreciendo una capa de control independiente de IAM. Las NACL y los security groups operan a nivel de red (IP/puerto), no por acción de API. Las SCP se aplican a cuentas/OU, no a endpoints."
  },
  {
    id: "saa-629",
    dominio: 1,
    tema: "Cifrado en tránsito",
    tipo: "single",
    enunciado: "Una aplicación debe garantizar cifrado en tránsito extremo a extremo: desde el cliente hasta el ALB y desde el ALB hasta las instancias backend. ¿Qué configuración cumple este requisito?",
    opciones: [
      "Listener HTTPS en el ALB con certificado ACM y reencriptado HTTPS hacia el target group en el puerto seguro del backend.",
      "Listener HTTPS en el ALB y HTTP en texto plano hacia las instancias backend.",
      "Listener HTTP en el ALB y dejar que las instancias hagan TLS.",
      "Terminar TLS solo en CloudFront y usar HTTP hacia el ALB."
    ],
    correctas: [0],
    explicacion: "Para cifrado extremo a extremo, el ALB termina TLS con un certificado de ACM en su listener HTTPS y reencripta el tráfico hacia el backend usando HTTPS hacia los targets, manteniendo el dato cifrado en ambos tramos. Cualquier tramo en HTTP (cliente-ALB o ALB-backend) deja datos en texto plano y rompe el cifrado extremo a extremo."
  },
  {
    id: "saa-630",
    dominio: 1,
    tema: "Security Hub",
    tipo: "single",
    enunciado: "Una organización con muchas cuentas quiere una vista centralizada del cumplimiento frente a estándares como CIS y agregar findings de GuardDuty, Inspector y Macie en un solo lugar. ¿Qué servicio cumple esta función?",
    opciones: [
      "AWS Security Hub, agregando findings de múltiples servicios y evaluando estándares de seguridad de forma centralizada.",
      "Amazon Detective, como punto central de findings.",
      "AWS Config agregador, como consola de findings de amenazas.",
      "Amazon CloudWatch, agregando los findings en dashboards."
    ],
    correctas: [0],
    explicacion: "Security Hub centraliza y normaliza findings de GuardDuty, Inspector, Macie y terceros, y ejecuta controles de cumplimiento frente a estándares como CIS y AWS Foundational Security Best Practices en una vista multicuenta. Detective investiga, no agrega cumplimiento. El agregador de Config consolida configuración, no findings de amenazas. CloudWatch es de métricas/logs, no de postura de seguridad."
  },
  {
    id: "saa-631",
    dominio: 1,
    tema: "S3 Object Lock",
    tipo: "single",
    enunciado: "Una empresa debe cumplir un requisito regulatorio WORM: ciertos objetos en S3 no deben poder eliminarse ni modificarse durante 7 años, ni siquiera por la cuenta raíz. ¿Qué configuración cumple esto?",
    opciones: [
      "S3 Object Lock en modo Compliance con un periodo de retención de 7 años.",
      "S3 Object Lock en modo Governance con permisos de bypass para administradores.",
      "Una política de bucket que deniegue DeleteObject a los usuarios.",
      "Versionado de S3 con reglas de ciclo de vida."
    ],
    correctas: [0],
    explicacion: "El modo Compliance de S3 Object Lock impide que cualquier usuario, incluida la cuenta raíz, sobrescriba o elimine la versión del objeto hasta que expire la retención, cumpliendo WORM regulatorio. El modo Governance permite bypass con permisos especiales, por lo que no es inmutable. Una política de bucket puede modificarse. El versionado por sí solo no impide la eliminación de versiones."
  },
  {
    id: "saa-632",
    dominio: 1,
    tema: "RAM",
    tipo: "single",
    enunciado: "Una empresa con varias cuentas quiere compartir de forma segura subredes de una VPC central para que otras cuentas desplieguen recursos en ellas, sin duplicar la infraestructura de red. ¿Qué servicio permite este uso compartido?",
    opciones: [
      "AWS Resource Access Manager (RAM) para compartir las subredes con las cuentas de la organización.",
      "VPC peering entre cada par de cuentas.",
      "Transit Gateway con rutas estáticas por cuenta.",
      "Copiar la plantilla de CloudFormation de la VPC a cada cuenta."
    ],
    correctas: [0],
    explicacion: "AWS RAM permite compartir recursos como subredes (VPC sharing) con otras cuentas de la organización, de modo que despliegan recursos en una red centralizada sin duplicarla. El peering conecta VPCs separadas, no comparte subredes. Transit Gateway interconecta redes pero no comparte subredes para despliegue. Copiar plantillas crea redes independientes, no compartidas."
  },
  {
    id: "saa-633",
    dominio: 1,
    tema: "IAM",
    tipo: "single",
    enunciado: "Una aplicación en EC2 necesita acceder a S3 y DynamoDB. El equipo de seguridad detecta claves de acceso embebidas en el código. ¿Cuál es la forma correcta de otorgar permisos eliminando las credenciales estáticas?",
    opciones: [
      "Asignar un instance profile con un rol IAM que otorgue los permisos a S3 y DynamoDB, y eliminar las claves del código.",
      "Mover las claves de acceso a variables de entorno del sistema operativo.",
      "Almacenar las claves en un archivo cifrado dentro de la instancia.",
      "Crear un usuario IAM por instancia con claves rotadas semanalmente."
    ],
    correctas: [0],
    explicacion: "Un instance profile con un rol IAM provee credenciales temporales rotadas automáticamente a la aplicación vía el servicio de metadatos, eliminando por completo las claves estáticas. Mover las claves a variables de entorno o a un archivo, aunque cifrado, sigue dependiendo de credenciales de larga duración. Crear usuarios por instancia mantiene claves persistentes a gestionar."
  },
  {
    id: "saa-634",
    dominio: 1,
    tema: "WAF Bot Control",
    tipo: "single",
    enunciado: "Un comercio electrónico detrás de CloudFront experimenta scraping de precios y creación masiva de cuentas falsas por bots automatizados. Quiere distinguir y gestionar el tráfico de bots conocidos y maliciosos con mínima configuración. ¿Qué solución de AWS aplica?",
    opciones: [
      "Habilitar el managed rule group AWS WAF Bot Control en la Web ACL asociada a CloudFront.",
      "Bloquear todo el tráfico desde rangos de IP de proveedores de nube en una NACL.",
      "Activar Shield Advanced para clasificar los bots.",
      "Usar GuardDuty para detener el scraping."
    ],
    correctas: [0],
    explicacion: "El grupo de reglas administrado AWS WAF Bot Control identifica y categoriza tráfico de bots (verificados, comunes, maliciosos) y permite permitir, bloquear o desafiar dichas solicitudes con poca configuración. Bloquear rangos de IP en una NACL es impreciso y se desactualiza. Shield Advanced se enfoca en DDoS. GuardDuty detecta amenazas pero no filtra tráfico de aplicación en línea."
  },
  {
    id: "saa-635",
    dominio: 1,
    tema: "Parameter Store",
    tipo: "single",
    enunciado: "Una aplicación necesita almacenar valores de configuración no sensibles y algunos secretos cifrados, priorizando el menor costo y sin requerir rotación automática integrada. ¿Qué servicio es la mejor opción?",
    opciones: [
      "AWS Systems Manager Parameter Store, usando parámetros String y SecureString cifrados con KMS.",
      "AWS Secrets Manager para todos los valores, sensibles y no sensibles.",
      "Variables de entorno cifradas a mano en cada despliegue.",
      "Una tabla DynamoDB con cifrado del lado del cliente."
    ],
    correctas: [0],
    explicacion: "Parameter Store almacena configuración (String) y secretos (SecureString cifrados con KMS) sin costo en el nivel estándar y sin necesidad de rotación gestionada, ideal cuando el costo importa y no se requiere rotación automática nativa. Secrets Manager tiene costo por secreto y rotación, innecesario aquí. Cifrar a mano o usar DynamoDB añade complejidad sin beneficio."
  },
  {
    id: "saa-636",
    dominio: 1,
    tema: "KMS cross-account",
    tipo: "single",
    enunciado: "Una cuenta de producción debe descifrar mensajes de una cola SQS encriptados con una KMS key de otra cuenta. Los consumidores siguen recibiendo errores de acceso denegado a KMS pese a tener permisos IAM. ¿Cuál es la causa más probable y la solución?",
    opciones: [
      "Falta el permiso en la key policy de la cuenta propietaria de la key; hay que autorizar al rol consumidor en dicha key policy.",
      "La cola SQS no tiene habilitado el versionado, hay que activarlo.",
      "Falta una regla de NACL que permita el tráfico a KMS.",
      "El rol consumidor necesita una clave de acceso de larga duración para KMS."
    ],
    correctas: [0],
    explicacion: "En accesos cross-account a KMS, además de la política IAM en la cuenta consumidora, la key policy de la cuenta propietaria debe autorizar explícitamente al principal externo; sin ello se produce acceso denegado aunque IAM lo permita. SQS no usa versionado. KMS se alcanza por API, no depende de NACL para autorización. Las claves de larga duración no resuelven un fallo de autorización de la key policy."
  },
  {
    id: "saa-637",
    dominio: 1,
    tema: "Migración híbrida",
    tipo: "multiple",
    enunciado: "Una empresa migra una aplicación on-premises a AWS y exige que los datos en tránsito entre el datacenter y la VPC viajen cifrados y por enlaces privados, evitando Internet. ¿Qué dos enfoques cumplen estos requisitos de seguridad?",
    opciones: [
      "Establecer una VPN site-to-site IPsec sobre la conexión, cifrando el tráfico entre el datacenter y la VPC.",
      "Usar AWS Direct Connect combinado con una VPN IPsec para enlace privado con cifrado, o con MACsec donde esté soportado.",
      "Exponer la base de datos con una IP pública protegida por security group.",
      "Habilitar un NAT gateway para enrutar el tráfico de migración por Internet.",
      "Replicar los datos copiándolos a un bucket S3 público temporalmente."
    ],
    correctas: [0, 1],
    explicacion: "Una VPN site-to-site IPsec cifra el tráfico entre el datacenter y AWS; Direct Connect ofrece un enlace privado dedicado que puede combinarse con una VPN IPsec para cifrado (o MACsec en puertos soportados). Exponer la base con IP pública, usar NAT hacia Internet o un bucket público viola el requisito de enlace privado y cifrado."
  },
  {
    id: "saa-638",
    dominio: 1,
    tema: "EBS/RDS cifrado",
    tipo: "single",
    enunciado: "Una base de datos RDS existente no fue creada con cifrado en reposo y ahora la política exige que todos los datos estén cifrados con una KMS key. ¿Cuál es el enfoque correcto para cumplir el requisito?",
    opciones: [
      "Crear un snapshot de la instancia, copiar el snapshot habilitando el cifrado con la KMS key y restaurar una nueva instancia cifrada desde esa copia.",
      "Activar el cifrado en reposo directamente sobre la instancia RDS existente desde la consola.",
      "Cambiar el grupo de parámetros de la instancia para habilitar el cifrado.",
      "Adjuntar una política de bucket que cifre los datos de RDS."
    ],
    correctas: [0],
    explicacion: "No se puede cifrar una instancia RDS existente en el sitio; el procedimiento es crear un snapshot, copiarlo habilitando el cifrado con la KMS key deseada y restaurar una nueva instancia cifrada a partir de esa copia. No existe un interruptor en la consola para cifrar la instancia ya creada, ni se logra con un parameter group ni con políticas de bucket de S3."
  },
  {
    id: "saa-639",
    dominio: 1,
    tema: "S3 Block Public Access",
    tipo: "single",
    enunciado: "El equipo de seguridad quiere garantizar a nivel de toda la cuenta que ningún bucket ni objeto de S3 pueda hacerse público, sin revisar bucket por bucket. ¿Qué control aplica esta garantía de forma centralizada?",
    opciones: [
      "Habilitar S3 Block Public Access a nivel de cuenta para bloquear ACLs y políticas públicas en todos los buckets.",
      "Adjuntar una política de bucket pública con efecto Deny en cada bucket.",
      "Activar el versionado en todos los buckets.",
      "Configurar una regla de ciclo de vida que elimine objetos públicos."
    ],
    correctas: [0],
    explicacion: "S3 Block Public Access a nivel de cuenta anula y previene cualquier ACL o política de bucket que conceda acceso público, aplicándose a todos los buckets actuales y futuros sin revisar uno por uno. Una política Deny por bucket no escala. El versionado y las reglas de ciclo de vida no controlan la exposición pública del contenido."
  },
  {
    id: "saa-640",
    dominio: 1,
    tema: "GuardDuty",
    tipo: "multiple",
    enunciado: "Una empresa habilita Amazon GuardDuty en su organización. ¿Cuáles son dos fuentes de datos que GuardDuty analiza de forma nativa para detectar actividad maliciosa?",
    opciones: [
      "Los logs de eventos de gestión y, opcionalmente, eventos de datos de S3 de CloudTrail.",
      "Los registros de consultas DNS resueltas por el resolver de AWS dentro de la VPC.",
      "El contenido de los objetos almacenados en los buckets de S3.",
      "Las firmas de antivirus instaladas en cada instancia EC2.",
      "Los diagramas de arquitectura cargados en la consola."
    ],
    correctas: [0, 1],
    explicacion: "GuardDuty analiza de forma nativa los logs de CloudTrail (management y data events de S3), los VPC Flow Logs y los logs de DNS del resolver de AWS para detectar comportamientos anómalos. No inspecciona el contenido de los objetos de S3 (eso lo hace Macie), no depende de firmas de antivirus locales ni de diagramas de arquitectura."
  }
]);
