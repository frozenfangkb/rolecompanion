# RoleCompanion App

RoleCompanion es una app pensada para dar más realismo a los roles que se realizan en GTA V.

La forma de conseguirlo, es tener la posibilidad de reproducir sonidos dentro del juego usando esta app
y la aplicación VoiceMeeter para poder usar su dispositivo virtual de audio.

Puedes descargar VoiceMeeter en [https://www.vb-audio.com/Voicemeeter/](https://www.vb-audio.com/Voicemeeter/)

## Instalación y Configuración

Tras haber instalado VoiceMeeter, lo abrimos y procedemos a configurarlo como se indica en la siguiente imagen:

![VoiceMeeter settings](https://github.com/frozenfangkb/rolecompanion/blob/master/image/voicetuto.png "VoiceMeeter settings")

1. Seleccionamos aquí nuestro micrófono, el que usamos normalmente en el juego.
2. Desmarcamos que use el canal A, para no escucharnos a nosotros mismos.
3. Seleccionamos aquí nuestros auriculares, los mismos por los que escuchemos el juego. MUY IMPORTANTE: selecciona la opción precedida por "MME", de lo contrario no escucharás el juego.

Ahora instalamos RoleCompanion descargando la última versión desde [aquí](https://github.com/frozenfangkb/rolecompanion/releases)

Primero, configuramos los dispositivos de audio. En la sección de auriculares de salida, seleccionamos nuestros auriculares.
En la sección de salida de voicemeeter, seleccionamos el dispositivo que aparezca calificado como speakers o altavoces.

![RoleCompanion tutorial 1](https://github.com/frozenfangkb/rolecompanion/blob/master/image/RCtuto1.PNG "RoleCompanion tutorial 1")

Después, vamos a la sección de sonidos y añadimos un nuevo sonido haciendo click en el botón. Para añadir el sonido:

1. Selecciona uno de la lista desplegable
2. Pulsa en grabar atajo, verás que el borde de la cajita de texto se pone rojo indicando que está grabando. Pulsa el atajo de teclado que quieras y vuelve a hacer click en el botón.
3. Haz click en guardar y espera unos segundos hasta que la app se actualice.

![RoleCompanion tutorial 2](https://github.com/frozenfangkb/rolecompanion/blob/master/image/RCtuto2.png "RoleCompanion tutorial 2")

![RoleCompanion tutorial 3](https://github.com/frozenfangkb/rolecompanion/blob/master/image/RCtuto3.png "RoleCompanion tutorial 3")

Una vez hecho esto, veremos esta pantalla si todo ha ido bien.

![RoleCompanion tutorial 4](https://github.com/frozenfangkb/rolecompanion/blob/master/image/RCtuto4.png "RoleCompanion tutorial 4")

Solamente tendremos que hacer click en iniciar Rolecompanion, entrar en el juego y configurar en la sección de charla de voz el dispositivo de salida de audio de voicemeeter
en lugar de nuestro micrófono. ¡Hecho! Ya puedes disfrutar de RoleCompanion :)

P.D: Recuerda que si en el juego usas push to talk, debes mantener pulsado el atajo de hablar en el juego mientras se reproduce el sonido. Sino, sólo tú lo escucharás.

P.D2: Recuerda también NO cerrar ni VoiceMeeter ni RoleCompanion para que todo funcione correctamente.

## FAQ

### ¿Puedo añadir sonidos propios?

Sí, claro. Sólo tienes que navegar hasta la carpeta de RoleCompanion (C:\\Users\\tu usuario\\AppData\\Local\\rolecompanion\\app-0.3.0\\resources\\app\\sounds) y pegar ahí tus sonidos personalizados.
Si quieres asegurarte de que funcionen correctamente, te aconsejo modificarlos con Audacity (para reducir el volumen y que no sean demasiado estridentes) y exportarlos con esa aplicación
a formato WAV de 16 bits. De lo contrario, pueden sonar como ruido blanco bastante molesto, no sonar o provocar un cierre inesperado de la aplicación.

### ¡Oye! Esto se me cierra al intentar reproducir un sonido

Algunos dispositivos de audio pueden no ser compatibles con la aplicación, se ha intentado estandarizar lo más posible el código para que esto no suceda, pero no puedo hacer nada si esto ocurre. Prueba con otro dispositivo de audio. También asegúrate de que has seleccionado el dispositivo de VoiceMeeter correctamente. También asegúrate de que ninguna aplicación está usando el dispositivo virtual de
VoiceMeeter que se puede seleccionar como altavoces, ya que la aplicación tomará control exclusivo del dispositivo virtal que nosotros intentamos usar para reproducir el sonido.

### No escucho los sonidos de la app, pero el resto de la gente si :(

Puede que hayas seleccionado en VoiceMeeter tus auriculares con una opción que no está precedida por "MME".

### Houston, tenemos un problema

Si tienes algún problema que no aparezca contemplado en el FAQ, puedes reportarlo en discord [https://discord.gg/6peQgyw](https://discord.gg/6peQgyw) y vemos si podemos arreglarlo. Deja tu comentario en el canal rolecompanion ^^

## Errores conocidos

..* A veces la aplicación puede cerrarse de forma inesperada si el dispositivo de audio no es compatible por razones de canales de audio o SampleRate.
..* Algunos sonidos a veces no se reproducen por completo.
..* Si creas un atajo de teclado por ejemplo con Ctrl+Shift+F y otro con Ctrl+F, RoleCompanion usará el de Ctrl+F. Siempre.

## Consejos de uso

..* Intenta usar teclas que no tengan uso en GTA para los atajos de teclado
..* NO uses WASD para ningún atajo de teclado.
..* Los sonidos incluidos por defecto están normalizados en lo que a volumen se refiere para no resultar molestos. Aun así, si resultan molestos, puedes bajar el volumen del dispositivo virtual de VoiceMeeter.
