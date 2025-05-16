# Mi Comida Favorita

Una aplicación móvil desarrollada con React Native que permite a los usuarios gestionar su perfil y guardar su comida favorita.

## 📱 Características

- Autenticación de usuarios con Firebase
- Perfil de usuario personalizable
- Almacenamiento de datos en Firestore
- Interfaz de usuario moderna y responsiva

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd MiComidaFavorita
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura Firebase:
   - Crea un proyecto en Firebase Console
   - Habilita Authentication y Firestore
   - Descarga el archivo de configuración `google-services.json` (Android) o `GoogleService-Info.plist` (iOS)
   - Coloca el archivo en la ubicación correcta según tu plataforma

4. Inicia la aplicación:
```bash
# Para Android
npm run android

# Para iOS
npm run ios
```

## 🛠️ Tecnologías Utilizadas

- React Native
- Firebase (Authentication y Firestore)
- React Native Elements
- React Navigation

## 📸 Screenshots

[Agregar screenshots de la aplicación aquí]

## 🔧 Configuración del Entorno de Desarrollo

### Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Android Studio (para desarrollo en Android)
- Xcode (para desarrollo en iOS, solo macOS)
- Cuenta de Firebase

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_auth_domain
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_STORAGE_BUCKET=tu_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
FIREBASE_APP_ID=tu_app_id
```

## 🤝 Contribución

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 📧 Contacto

[Tu Nombre] - [Tu Email]

Link del Proyecto: [https://github.com/tu-usuario/MiComidaFavorita](https://github.com/tu-usuario/MiComidaFavorita) 