const { app, BrowserWindow } = require('electron');

let appWindow;

function crearVentana() {
    appWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        center: true,
        show: false,
        icon: 'icon.png'
    });

    // cuando la aplicacion se cierra
    appWindow.on('closed',() => {
        appWindow = null;
    });

    // cargar HTML
    appWindow.loadFile('./index.html');

    // cuando la app este lista, mostrar ventana
    appWindow.once('ready-to-show', () => {
        appWindow.show();
    });
}

app.on('ready', crearVentana);
